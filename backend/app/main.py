import os
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from .routers import user, emotion, chat
from .database import create_tables

load_dotenv('.env.app')
VERSION = os.getenv('VERSION')
ORIGINS = os.getenv('ORIGINS')
ALLOW_METHODS = os.getenv('ALLOW_METHODS')
ALLOW_HEADERS = os.getenv('ALLOW_HEADERS')
tags_metadata = [
    {
        "name": "user",
        "description": "",
    },
    {
        "name": "emotion",
        "description": "",
    },
    {
        "name": "hello",
        "description": "",
    }
]
app = FastAPI(
    title="Wave Emotion Cards",
    version=VERSION,
    openapi_tags=tags_metadata,
    redoc_url=None
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS.split(','),
    allow_credentials=True,
    allow_methods=ALLOW_METHODS.split(','),
    allow_headers=ALLOW_HEADERS.split(','),
)

@app.on_event("startup")
async def startup_event():
    create_tables()

app.include_router(user.router)
app.include_router(emotion.router)
app.include_router(chat.router)

@app.get("/", tags=['hello'])
def read_root():
    return {"Hello": "World"}