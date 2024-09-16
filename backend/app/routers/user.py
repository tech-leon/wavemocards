from .. import models, schemas, database, auth, crud
from fastapi import APIRouter, Depends, HTTPException, Request, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.auth import verify_token
from sqlalchemy.orm import Session
from datetime import datetime

router = APIRouter()
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        # Verify Firebase token
        decoded_token = verify_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

@router.post("/v1/user/register", response_model=schemas.UserAuthResponse, tags=["user"])
async def register_user(
    user: schemas.UserCreate, 
    db: Session = Depends(database.get_db)
    ):
    # 檢查用戶是否已存在
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # 在 Firebase 中創建用戶，包括 display name，並獲取 custom token
    firebase_user, custom_token = auth.create_firebase_user(email=user.email, password=user.password, display_name=user.name)
    
    # 創建本地數據庫用戶
    new_user = models.User(
        id=firebase_user.uid,
        email=user.email,
        name=user.name,
        birthday=user.birthday,
        occupation=user.occupation,
        timezone=user.timezone,
        sign_up_day=datetime.now()
    )
    
    db_user = crud.create_user(db, new_user)
    
    # 構建響應
    user_info = schemas.User.from_orm(db_user)
    return schemas.UserAuthResponse(user=user_info, access_token=custom_token)

@router.patch("/v1/user/{user_id}", response_model=schemas.UserRead, tags=["user"])
async def update_user(
    user_id: str, 
    user_update: schemas.UserUpdate, 
    request: Request,
    db: Session = Depends(database.get_db), 
    current_user: str = Depends(get_current_user)
    ):
    # Get the original request data
    raw_data = await request.json()
    
    # Create a UserUpdate instance with only the provided fields
    user_update = schemas.UserUpdate(**{k: v for k, v in raw_data.items() if k in schemas.UserUpdate.__fields__})
    
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Only allow users to update their own data
    if user_id != current_user["user_id"]:
        raise HTTPException(status_code=403, detail={"message": "You don't have permission to update this user",
                                                     "user_id": user_id,
                                                     "current_user": current_user})
    else:
        print("passed verification")
    
    # Update local db
    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    
    # If the name is updated, also update Firebase.
    if 'name' in update_data:
        auth.update_firebase_user_display_name(user_id, user_update.name)
    
    return schemas.UserRead.from_orm(db_user)

@router.get("/v1/users/{user_id}", response_model=schemas.UserRead, tags=["user"])
def read_user(
    user_id: str, 
    db: Session = Depends(database.get_db),
    current_user: str = Depends(get_current_user)):
    db_user = crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user = schemas.UserRead.from_orm(db_user)
    return user.to_local_time()

# @router.post("/users/")
# def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
#     db_user = models.User(id=user.id, email=user.email, name=user.name)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user