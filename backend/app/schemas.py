from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, Any, List
from datetime import datetime
import pytz

def utc_now():
    return datetime.now(pytz.UTC)

class User(BaseModel):
    id: str
    email: EmailStr
    name: str
    birthday: Optional[datetime] = None
    occupation: Optional[str] = None
    timezone: str
    sign_up_day: datetime
    
    class Config:
        from_attributes = True

class UserAuthResponse(BaseModel):
    user: User
    access_token: str
    token_type: str = "bearer"

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    name: str = Field(..., min_length=1, max_length=100)
    birthday: Optional[datetime] = None
    occupation: Optional[str] = Field(None, max_length=100)
    timezone: str = 'UTC'

    @field_validator('timezone')
    def validate_timezone(cls, v):
        if v not in pytz.all_timezones:
            raise ValueError('Invalid timezone')
        return v

    class Config:
        from_attributes = True

class UserRead(BaseModel):
    id: str
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=100)
    birthday: Optional[datetime] = None
    occupation: Optional[str] = Field(None, max_length=100)
    timezone: Optional[str]
    sign_up_day: datetime

    class Config:
        from_attributes = True

    def to_local_time(self):
        local_tz = pytz.timezone(self.timezone)
        return UserRead(
            **{**self.dict(),
                'birthday': self.birthday.astimezone(local_tz) if self.birthday else None,
                'sign_up_day': self.sign_up_day.astimezone(local_tz)
            }
        )
        
class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    birthday: Optional[datetime] = None
    occupation: Optional[str] = Field(None, max_length=100)
    timezone: Optional[str] = None

    @validator('timezone')
    def validate_timezone(cls, v):
        if v is not None and v not in pytz.all_timezones:
            raise ValueError('Invalid timezone')
        return v

    @validator('*', pre=True)
    def empty_str_to_none(cls, v: Any) -> Any:
        if v == "":
            return None
        return v

    class Config:
        from_attributes = True
        extra = 'forbid'
        

class EmotionCreate(BaseModel):
    id: str
    card1: int = Field(..., ge=1, le=5, description="Card 1")
    card2: int = Field(..., ge=1, le=5, description="Card 2")
    card3: int = Field(..., ge=1, le=5, description="Card 3")
    before_card1_level: int = Field(..., ge=1, le=5, description="Before card 1 level, range 1-5")
    before_card2_level: int = Field(..., ge=1, le=5, description="Before card 2 level, range 1-5")
    before_card3_level: int = Field(..., ge=1, le=5, description="Before card 3 level, range 1-5")
    story: Optional[str] = Field(None, max_length=1000, description="User's story")
    thoughts_action: Optional[str] = Field(None, max_length=500, description="User's thoughts and actions")
    consequences: Optional[str] = Field(None, max_length=500, description="Consequences of the situation")
    feeling_of_consequences: Optional[str] = Field(None, max_length=500, description="Feelings about the consequences")
    result_of_expect: Optional[str] = Field(None, description="Result of expectation: 'yes', 'no', or 'unclear'")
    take_out: Optional[str] = Field(None, max_length=500, description="What the user takes out from this experience")
    after_card1_level: int = Field(..., ge=1, le=5, description="After card 1 level, range 1-5")
    after_card2_level: int = Field(..., ge=1, le=5, description="After card 2 level, range 1-5")
    after_card3_level: int = Field(..., ge=1, le=5, description="After card 3 level, range 1-5")

    class Config:
        schema_extra = {
            "example": {
                "id": "12345",
                "before_card1_level": 5,
                "before_card2_level": 3,
                "before_card3_level": 4,
                "story": "Today, I had a challenging situation at work...",
                "thoughts_action": "I felt overwhelmed and decided to...",
                "consequences": "As a result, the project deadline was...",
                "feeling_of_consequences": "I felt relieved but also concerned about...",
                "result_of_expect": "yes",
                "take_out": "I learned that communication is key in...",
                "after_card1_level": 4,
                "after_card2_level": 5,
                "after_card3_level": 3
            }
        }

class EmotionResponse(BaseModel):
    id: int
    owner_id: str
    card1: int
    card2: int
    card3: int
    before_card1_level: int
    before_card2_level: int
    before_card3_level: int
    story: Optional[str]
    thoughts_action: Optional[str]
    consequences: Optional[str]
    feeling_of_consequences: Optional[str]
    result_of_expect: Optional[str]
    take_out: Optional[str]
    after_card1_level: int
    after_card2_level: int
    after_card3_level: int
    create: datetime

    class Config:
        orm_mode = True
        
class EmotionBase(BaseModel):
    id: int
    card1: int
    card2: int
    card3: int
    before_card1_level: int
    before_card2_level: int
    before_card3_level: int
    story: Optional[str]
    thoughts_action: Optional[str]
    consequences: Optional[str]
    feeling_of_consequences: Optional[str]
    result_of_expect: Optional[str]
    take_out: Optional[str]
    after_card1_level: int
    after_card2_level: int
    after_card3_level: int
    create: datetime

    class Config:
        from_attributes = True
        
class EmotionsReadResponse(BaseModel):
    emotions: List[EmotionBase]
    more_emotions: bool