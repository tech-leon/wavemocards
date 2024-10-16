from typing import List
from .. import models, schemas, database, auth, crud
from fastapi import APIRouter, Depends, HTTPException, Request, Security, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.auth import verify_token
from sqlalchemy.orm import Session
from datetime import datetime
from . import user
import logging

router = APIRouter()
TAGS = "emotion"

@router.post("/v1/user/emotion/new", response_model=schemas.EmotionResponse, tags=[TAGS])
async def new_emotion(
    emotion: schemas.EmotionCreate, 
    db: Session = Depends(database.get_db),
    current_user: str = Depends(user.get_current_user)
    ):
    logging.info(f"Received emotion data: {emotion}")
    
    result_of_expect_answer = ["yes","no","unclear"]
    # 檢查用戶是否已存在
    db_user = crud.get_user(db, emotion.id)
    if not db_user:
        raise HTTPException(status_code=400, detail="User id invalid")
    if emotion.result_of_expect and emotion.result_of_expect not in result_of_expect_answer:
        raise HTTPException(status_code=400, detail="result of expect = yes, no or unclear")
    
    # 確保 card1, card2, card3 字段存在且為整數
    if not all(isinstance(getattr(emotion, f'card{i}'), int) for i in range(1, 4)):
        raise HTTPException(status_code=400, detail="card1, card2, and card3 must be integers")
    
    created_emotion = crud.create_emotion(db=db, emotion=emotion)
    logging.info(f"Created emotion: {created_emotion}")
    return created_emotion

@router.get("/v1/user/emotions", response_model=schemas.EmotionsReadResponse, tags=[TAGS])
def get_emotions(
    user_id: str,
    from_: int = Query(1, alias="from"),
    to: int = Query(10, alias="to"),
    db: Session = Depends(database.get_db),
    current_user: str = Depends(user.get_current_user)
    ):
    db_user = crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    if from_ < 1:
        from_ = 1
    if to < from_:
        to = from_
    
    limit = to - from_ + 1
    skip = from_ - 1

    emotions = crud.get_user_emotions(db, user_id, skip, limit)
    
    more_emotions = len(emotions) > limit
    if more_emotions:
        emotions = emotions[:-1]  # Remove the extra emotion we fetched

    return schemas.EmotionsReadResponse(
        emotions=emotions,
        more_emotions=more_emotions
    )

@router.get("/v1/user/emotions/lists", response_model=List[schemas.EmotionListsResponse], tags=[TAGS])
def get_emotions_lists(
    user_id: str,
    db: Session = Depends(database.get_db),
    current_user: str = Depends(user.get_current_user)
):
    db_user = crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    emotions = crud.get_emotions_lists(db, user_id)
    return emotions


# @router.patch("/v1/user/{user_id}", response_model=schemas.UserRead, tags=["emotion informations"])
# async def update_user(
#     user_id: str, 
#     user_update: schemas.UserUpdate, 
#     request: Request,
#     db: Session = Depends(database.get_db), 
#     current_user: str = Depends(user.get_current_user)
#     ):
#     # Get the original request data
#     raw_data = await request.json()
    
#     # Create a UserUpdate instance with only the provided fields
#     user_update = schemas.UserUpdate(**{k: v for k, v in raw_data.items() if k in schemas.UserUpdate.__fields__})
    
#     db_user = crud.get_user(db, user_id=user_id)
#     if db_user is None:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     # Only allow users to update their own data
#     if user_id != current_user["user_id"]:
#         raise HTTPException(status_code=403, detail={"message": "You don't have permission to update this user",
#                                                      "user_id": user_id,
#                                                      "current_user": current_user})
#     else:
#         print("passed verification")
    
#     # Update local db
#     update_data = user_update.dict(exclude_unset=True)
#     for key, value in update_data.items():
#         setattr(db_user, key, value)
    
#     db.commit()
#     db.refresh(db_user)
    
#     # If the name is updated, also update Firebase.
#     if 'name' in update_data:
#         auth.update_firebase_user_display_name(user_id, user_update.name)
    
#     return schemas.UserRead.from_orm(db_user)

