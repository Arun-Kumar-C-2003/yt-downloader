# YouTube Video & Audio Downloader

A simple YouTube downloader application that lets users download videos in **MP4** and audio in **MP3** format with the best available quality.

### **Tech Stack**
- **Frontend**: React, Vite, Tailwind CSS, Chakra UI(very minimal), Lucide-React
- **Backend**: Python, Flask, yt-dlp, FFmpeg

---

## **Features**
- Download YouTube videos in the **best MP4 quality**.
- Download YouTube audio in the **best MP3 quality**.
- Minimalist user interface using **React js**.
- User-friendly, no unnecessary options — just the **best quality**.
- Future updates may include more features and support for other formats.

---

## **How It Works**
1. **Frontend** (React + Vite): A simple UI built with **Vite** and **React**.
   - Allows the user to input the URL of a YouTube video.
   - Displays download options (MP4 or MP3).
   - Starts the download process with a clean and responsive interface.

2. **Backend** (Flask + yt-dlp + FFmpeg): The backend handles the actual download process.
   - **yt-dlp** is used to fetch the video and audio metadata.
   - **FFmpeg** is used for audio conversion (MP3) and video processing (MP4).
   - Only the best quality formats are offered (highest bitrate for audio, highest resolution for video).

---

## **Installation**

### **Frontend (React + Vite)**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/yt-downloader.git
   cd yt-downloader/frontend
Install dependencies:

bash
Copy code
pnpm install
Start the development server:

bash
Copy code
pnpm dev
Your frontend should now be running at http://localhost:5173.

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

Usage
Open the frontend in your browser (http://localhost:5173).

Paste a YouTube video URL into the input field.

Choose between downloading the video as MP4 or the audio as MP3.

The download will start immediately after selection.

Future Updates
Support for additional formats (e.g., WEBM, OGG).

Option to select video quality (for advanced users).

Audio bitrate customization for MP3 downloads.

Enhanced UI features and themes.

Tech Stack
Frontend
React: For building the user interface.

Vite: A fast build tool for modern web projects.

Tailwind CSS: Made CSS super simple.

Chakra UI: A component library for a clean, accessible UI.

Lucide-React: A set of modern and simple icons for the frontend.

Backend
Flask: A lightweight web framework for Python.

yt-dlp: A YouTube video downloader to extract metadata and download content.

FFmpeg: A tool to handle media files, such as converting audio and video formats.