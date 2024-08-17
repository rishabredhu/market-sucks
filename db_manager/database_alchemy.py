# db_manager/database_alchemy.py
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Create the database file in the current directory
db_path = os.path.join(current_dir, 'job_links.db')
engine = create_engine(f'sqlite:///{db_path}')

Base = declarative_base()

class Job(Base):
    __tablename__ = 'jobs'

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    location = Column(String(100))
    full_description = Column(Text)
    scraped_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Job {self.title}>'

Base.metadata.create_all(engine)

SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()