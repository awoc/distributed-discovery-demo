from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.router.api import api_router

app = FastAPI()

# Directory path for assets
app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(api_router)
