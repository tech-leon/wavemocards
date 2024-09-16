from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from . import models, schemas
from typing import List, Optional
from datetime import datetime

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: models.User):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def create_emotion(db: Session, emotion: schemas.EmotionCreate):
    db_emotion = models.Emotion(
        owner_id=emotion.id,
        before_card1_level=emotion.before_card1_level,
        before_card2_level=emotion.before_card2_level,
        before_card3_level=emotion.before_card3_level,
        story=emotion.story,
        thoughts_action=emotion.thoughts_action,
        consequences=emotion.consequences,
        feeling_of_consequences=emotion.feeling_of_consequences,
        result_of_expect=emotion.result_of_expect,
        take_out=emotion.take_out,
        after_card1_level=emotion.after_card1_level,
        after_card2_level=emotion.after_card2_level,
        after_card3_level=emotion.after_card3_level,
        create=datetime.utcnow()
    )
    
    db.add(db_emotion)
    db.commit()
    db.refresh(db_emotion)
    return db_emotion

def get_user_emotions(db: Session, user_id: str, skip: int = 0, limit: int = 10) -> List[models.Emotion]:
    return db.query(models.Emotion)\
            .filter(models.Emotion.owner_id == user_id)\
            .order_by(models.Emotion.create.desc())\
            .offset(skip)\
            .limit(limit + 1)\
            .all()

def count_user_emotions(db: Session, user_id: str) -> int:
    return db.query(models.Emotion)\
            .filter(models.Emotion.owner_id == user_id)\
            .count()