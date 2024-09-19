import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException

load_dotenv('.env.app')

cred_path = os.getenv('CREDENTIALS_PATH')

if not cred_path:
    raise ValueError("CREDENTIALS_PATH not set in .env.app file")

cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

def create_custom_token(uid: str):
    try:
        custom_token = auth.create_custom_token(uid)
        return custom_token
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def verify_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
def create_firebase_user(email: str, password: str, display_name: str):
    try:
        user = auth.create_user(
            email=email,
            password=password,
            display_name=display_name
        )
        custom_token = auth.create_custom_token(user.uid)
        return user, custom_token
    except auth.EmailAlreadyExistsError:
        raise HTTPException(status_code=400, detail="Email already exists")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def update_firebase_user_display_name(uid: str, display_name: str):
    try:
        auth.update_user(
            uid,
            display_name=display_name
        )
    except auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))