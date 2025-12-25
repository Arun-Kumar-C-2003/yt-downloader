from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pathlib import Path
from dotenv import load_dotenv
import threading
import uuid
import os
from cli.downloader import extract_metadata, download_audio, download_video, temp_cleanup

app = Flask(__name__)
load_dotenv()
CORS_BASE_URL = os.getenv("CORS_BASE_URL")
CORS(app, resources={r"/*": {"origins": f"{CORS_BASE_URL}"}})

@app.route("/api/metadata", methods=["POST"])
def metadata():
    url = request.json["url"]
    data = extract_metadata(url)
    return jsonify(data)

@app.route("/api/download/video", methods=["POST"])
def download_video_route():
    url = request.json["url"]

    temp_dir = Path("temp_downloads")
    temp_dir.mkdir(exist_ok=True)

    file_id = str(uuid.uuid4())
    output_path = temp_dir / file_id

    download_video(url, output_path)

    # yt-dlp creates the final filename, find it
    file_path = next(output_path.glob("*"))
    response = send_file(
        file_path,
        as_attachment=True,
        download_name=file_path.name
    )

    threading.Thread(
        target=temp_cleanup,
        args=(output_path,),
        daemon=True
    ).start()

    return response

@app.route("/api/download/audio", methods=["POST"])
def download_audio_route():
    url = request.json["url"]
    temp_dir = Path("temp_downloads")
    temp_dir.mkdir(exist_ok=True)
    file_id = str(uuid.uuid4())
    output_path = temp_dir / file_id
    output_path.mkdir(parents=True, exist_ok=True)
    download_audio(url, output_path)

    file_path = next(output_path.glob("*"))
    response = send_file(
        file_path, 
        as_attachment=True,
        download_name=file_path.name
    )
    threading.Thread(
        target=temp_cleanup,
        args=(output_path,),
        daemon=True
    ).start()

    return response

if __name__ ==  "__main__":
    app.run()