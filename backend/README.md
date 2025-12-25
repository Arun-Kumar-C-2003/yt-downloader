### **Backend (Flask + yt-dlp + FFmpeg)**

Navigate to the backend directory:

bash
Copy code
cd yt-downloader/backend
Create a virtual environment:

bash
Copy code
python -m venv venv
Activate the virtual environment:

Windows:

bash
Copy code
venv\Scripts\activate

Linux/macOS:

bash
Copy code
source venv/bin/activate
Install the required dependencies:

bash
Copy code
pip install -r requirements.txt
Run the Flask application with Gunicorn:

bash
Copy code
python app.py
Your backend should now be running at http://localhost:5000.