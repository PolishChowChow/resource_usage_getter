from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    UPDATE_INTERVAL: int = 10  # in seconds
    DISK_PATH: str = "/"
    METRICS_SCALE: float = 1024 * 1024 * 1024  # Scale for converting bytes to GiB

settings = Settings()