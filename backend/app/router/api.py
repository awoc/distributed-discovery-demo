from fastapi import APIRouter

from app.router.endpoints import dot, test

api_router = APIRouter()
api_router.include_router(test.router, prefix="/test")
api_router.include_router(dot.router, prefix="/dot", tags=["dot"])
