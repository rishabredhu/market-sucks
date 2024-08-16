import sqlite3

class Database:
    def __init__(self, db_path='job_links.db'):
        self.db_path = db_path
        self._create_table()

    def _create_table(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS jobs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    url TEXT UNIQUE,
                    title TEXT,
                    company TEXT,
                    description TEXT,
                    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            print("Table created successfully")

    def insert_job(self, job_details):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT OR REPLACE INTO jobs (url, title, company, description)
                VALUES (?, ?, ?, ?)
            ''', (job_details['url'], job_details['title'], job_details['company'], job_details['description']))
            print("Job details saved successfully")


    def get_all_jobs(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM jobs ORDER BY date_added DESC')
            print("All jobs fetched successfully")
            return [dict(row) for row in cursor.fetchall()]
            