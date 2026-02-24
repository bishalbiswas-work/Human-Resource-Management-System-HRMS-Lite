from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "HRMS Lite"
    DATABASE_URL: str

    class Config:
        env_file = ".env"
        extra = "allow" # allowing extra fields just in case

settings = Settings()