# main.py

import os
import sys
from api_server.app import app
from db_manager.database_alchemy import Base, engine

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def init_db():
    Base.metadata.create_all(bind=engine)

def main():
    # Initialize the database
    init_db()
    
    # Run the Flask app
    app.run(debug=True)

if __name__ == "__main__":
    main()