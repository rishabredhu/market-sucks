import sqlite3
from datetime import datetime

DATABASE_NAME = 'job_links.db'

def get_db_connection():
    return sqlite3.connect(DATABASE_NAME)

def init_db():
    
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS jobs
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
         link TEXT UNIQUE,
         date_added DATE)
    ''')
    print("Database initialized")
    conn.commit()
    conn.close()

def save_job_to_db(url):
    conn = get_db_connection()
    c = conn.cursor()
    try:
        
        c.execute('''
            INSERT INTO jobs (link, date_added)
            VALUES (?, ?)
        ''', (url, datetime.now().strftime('%Y-%m-%d')))
        conn.commit()
        print(f'Job link saved: {url}')
    
    except sqlite3.IntegrityError:
        print(f"URL already exists: {url}")
    finally:
        conn.close()

def get_all_jobs():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('SELECT * FROM jobs')
    jobs = c.fetchall()
    print(f"Retrieved {len(jobs)} jobs")
    conn.close()
    return jobs


