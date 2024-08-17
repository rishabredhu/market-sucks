# Automate Tech Job Application

## Description
market-scuks is a browser extension that allows users to easily extract and save job posting details from various websites - currently greenhouse.job.io . It provides a simple extension to extract, review, edit, and store job information in a personal database. 

## Current Work
1. Get the Job Details
2. Align with resume from your resume bank the job aligns the most (home ATS system)
3. Select that resume
4. Work with simplify/ Create your own job filler for major websites - workday, greenhouse, job-levers. 


## Installation

### Prerequisites
- Python 3.7+
- Flask
- Chrome or Chromium-based browser

### Setting up the Backend
1. Clone the repository:
   ```
   git clone https://github.com/rishabredhu/market-sucks.git
   cd market-sucks
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```
   python app.py
   ```

### Installing the Browser Extension
1. Open your Chrome-based browser and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `browser_extension` directory from the cloned repository
4. The Job Details Extractor extension should now appear in your browser

## Usage
1. Navigate to a job posting webpage
2. Click on the Job Details Extractor extension icon
3. Click "Extract Job Details" in the popup
4. Review and edit the extracted information if necessary
5. Click "Confirm and Save" to store the job details

## Project Structure
```
market-sucks/
│
├── api_server/
│   ├── app.py
│   └── requirements.txt
│
├── browser_extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── content.js
│   └── worker.js
│
├── db_manager/
│   └── database.py
│
├── job_processor/
│   └── processor.py
│
└── README.md
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to all contributors who have helped shape this project
- Inspired by the need for an efficient job application process
