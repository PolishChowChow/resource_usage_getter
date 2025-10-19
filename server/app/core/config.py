from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    UPDATE_INTERVAL: int = 10  # in seconds
    DISK_PATH: str = "/"

settings = Settings()