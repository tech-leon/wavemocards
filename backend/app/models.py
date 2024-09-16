from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text, CheckConstraint
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    birthday = Column(DateTime, nullable=True)
    occupation = Column(String, nullable=True)
    timezone = Column(String, default='UTC')
    sign_up_day = Column(DateTime)
    
    shared_emotions_association = relationship("EmotionSharedWith", back_populates="user")
    shared_emotions = relationship("Emotion", secondary="emotion_shared_with", back_populates="shared_with", viewonly=True)
    emotion = relationship("Emotion", back_populates="owner", foreign_keys="[Emotion.owner_id]")
    sent_chat = relationship("Chat", foreign_keys='Chat.sender_id', back_populates="sender")
    received_chat = relationship("Chat", foreign_keys='Chat.receiver_id', back_populates="receiver")
    
    def __repr__(self):
        return f"<User(id='{self.id}', name='{self.name}', email='{self.email}')>"

class EmotionSharedWith(Base):
    __tablename__ = "emotion_shared_with"

    emotion_id = Column(Integer, ForeignKey('emotion.id'), primary_key=True)
    user_id = Column(String, ForeignKey('user.id'), primary_key=True)
    shared_at = Column(DateTime, default=datetime.utcnow)  # 新增：記錄共享時間

    emotion = relationship("Emotion", back_populates="shared_with_association")
    user = relationship("User", back_populates="shared_emotions_association")

    def __repr__(self):
        return f"<EmotionSharedWith(emotion_id={self.emotion_id}, user_id='{self.user_id}', shared_at='{self.shared_at}')>"

class Emotion(Base):
    __tablename__ = "emotion"
    
    RESULT_YES = 'yes'
    RESULT_NO = 'no'
    RESULT_UNCLEAR = 'unclear'

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(String, ForeignKey("user.id"))
    card1 = Column(Integer)
    card2 = Column(Integer)
    card3 = Column(Integer)
    before_card1_level = Column(Integer)
    before_card2_level = Column(Integer)
    before_card3_level = Column(Integer)
    story = Column(Text, nullable=True)
    thoughts_action = Column(Text, nullable=True)
    consequences = Column(Text, nullable=True)
    feeling_of_consequences = Column(Text, nullable=True)
    result_of_expect = Column(String, nullable=True)
    take_out = Column(Text, nullable=True)
    after_card1_level = Column(Integer)
    after_card2_level = Column(Integer)
    after_card3_level = Column(Integer)
    create = Column(DateTime)
    
    __table_args__ = (
        CheckConstraint(
            result_of_expect.in_([RESULT_YES, RESULT_NO, RESULT_UNCLEAR]),
            name='check_valid_result_of_expect'
        ),
    )
        
    owner = relationship("User", back_populates="emotion", foreign_keys=[owner_id])
    shared_with_association = relationship("EmotionSharedWith", back_populates="emotion")
    shared_with = relationship("User", secondary="emotion_shared_with", back_populates="shared_emotions", viewonly=True)
    chat = relationship("Chat", back_populates="emotion")
    
    def __repr__(self):
        return f"<Emotion(id={self.id}, owner_id='{self.owner_id}', create='{self.create}')>"

class Chat(Base):
    __tablename__ = "chat"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    created_at = Column(DateTime)
    
    emotion_id = Column(Integer, ForeignKey("emotion.id"))
    sender_id = Column(String, ForeignKey("user.id"))
    receiver_id = Column(String, ForeignKey("user.id"))

    emotion = relationship("Emotion", back_populates="chat")
    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_chat")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_chat")
    
    def __repr__(self):
        return f"<Chat(id={self.id}, sender_id='{self.sender_id}', receiver_id='{self.receiver_id}', created_at='{self.created_at}')>"