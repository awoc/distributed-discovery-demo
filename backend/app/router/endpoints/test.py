from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def root():
    """
    Test endpoint.

    Returns
    -------
    message
        Hello World.
    """
    return {"message": "Hello World"}
