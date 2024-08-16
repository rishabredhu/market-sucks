from flask import Flask, request, jsonify
from db_manager.database import Database
from job_processor.processor import JobProcessor

app = Flask(__name__)
db = Database()
processor = JobProcessor()

@app.route('/api/store_job', methods=['POST'])
def receive_job():
    data = request.json
    if not data or 'url' not in data:
        return jsonify({"error": "Invalid data"}), 400
    
    job_url = data['url']
    job_details = processor.extract_job_details(job_url)
    
    if job_details:
        db.insert_job(job_details)
        return jsonify({"message": "Job details saved successfully"}), 201
    else:
        return jsonify({"error": "Failed to extract job details"}), 422

@app.route('/api/diplay_jobs', methods=['GET'])
def get_jobs():
    jobs = db.get_all_jobs()
    return jsonify(jobs)

if __name__ == '__main__':
    app.run(debug=True)




# import sys
# import os

# # Add the parent directory to the system path
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# from db_manager.database import save_job_to_db, get_all_jobs
# from flask import Flask, request, jsonify
# from flask_cors import CORS




# app = Flask(__name__)
# CORS(app)  # This allows the extension to make requests to your local server

# @app.route('/')
# def index():
#     return "Server is running", 200

# @app.route('/save-job', methods=['POST'])
# def save_job():
#     data = request.json
#     url = data.get('url')
#     if url:
#         save_job_to_db(url)
#         return jsonify({"message": "Job link saved successfully"}), 200
#     else:
#         return jsonify({"error": "No URL provided"}), 400

# @app.route('/get-job', methods=['GET'])
# def get_job():
#     try: 
#         print(type(get_all_jobs()))
#     except:
#         return jsonify({"error": "No jobs found"}), 400

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)
