# api_server/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db_manager.database_alchemy import get_db, Job

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/job', methods=['POST'])
def add_job():
    data = request.json
    db = next(get_db())
    
    new_job = Job(
        title=data['title'],
        location=data['location'],
        fulDescription=data['description'],
        url = data['url']
    )
    
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    
    return jsonify({"message": "Job added successfully", "id": new_job.id}), 201

if __name__ == '__main__':
    app.run(debug=True)