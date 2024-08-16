from api_server.app import app
from db_manager.database import init_db, save_job_to_db, get_all_jobs
from flask import request, jsonify


if __name__ == '__main__':
    #intialize the database
    init_db()
    app.run(port=5000, debug=True)
    get_all_jobs()
