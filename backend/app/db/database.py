from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# aiven cloud postgres url with ssl
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# creating the engine
# for postgres we don't need check_same_thread
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# basic dependency to get a db session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
