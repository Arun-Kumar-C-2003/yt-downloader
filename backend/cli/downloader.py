from yt_dlp import YoutubeDL
from pathlib import Path
import time
import shutil

BASE_DIR = Path(__file__).resolve().parent.parent
TEMP_DIR = BASE_DIR/"core"/"temp"
TEMP_DIR.mkdir(parents=True, exist_ok=True)

def url_validator(url: str)->bool:
    try:
        extract_metadata(url) 
        return True
    except Exception:
        return False

def get_video_formats(url):
    with YoutubeDL() as ydl:
        info_dict = ydl.extract_info(url, download = False)
        # formats = info_dict.get("formats", [])
        title = info_dict.get("title", [])
        thumbnail = info_dict.get("thumbnail", [])
        duration = info_dict.get("duration", [])
        return  title, thumbnail, duration


def extract_metadata(url):
    ydl_opts = {
        "quiet": True,
        "skip_download": True,
        "ffmpeg_location": str(BASE_DIR / "bin"),
    }

    with YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download = False)
        title = info_dict.get("title")
        duration = info_dict.get("duration")
        thumbnail = info_dict.get("thumbnail")
        channel = info_dict.get("uploader") or info_dict.get("channel")
        viewCount = info_dict.get("view_count")
        timestamp = info_dict.get("timestamp")
        formats = info_dict.get("formats", [])
        best_video = None
        best_audio = None

        for f in formats:
            if f.get("vcodec") != "none" and f.get("acodec") == "none":
                if not best_video or (f.get("height", 0) or 0) > (best_video.get("height", 0) or 0):
                    best_video = f
            
            if f.get("acodec") != "none" and f.get("vcodec") == "none":
                if not best_audio or (f.get("abr", 0) or 0) >(best_audio.get("adr", 0) or 0):
                    best_audio = f
        
        video_size = best_video.get("filesize") or best_video.get("filesize_approx") if best_video else 0
        audio_size = best_audio.get("filesize") or best_audio.get("filesize_approx") if best_audio else 0

        approx_size = (video_size or 0) + (audio_size or 0)

        # print(info_dict.keys())

        return {
            "title":title,
            "duration": duration,
            "thumbnail": thumbnail,
            "videosize": format_size(video_size),
            "audiosize": format_size(audio_size),
            "channel":channel,
            "timestamp": timestamp,
            "viewcount": viewCount,
        }


def format_size(bytes_size):
    if bytes_size is None or bytes_size == 0:
        return "0 B"
    
    for unit in ["B", "KB", "MB", "GB", "TB"]:
        if bytes_size < 1024:
            return f"{bytes_size:.2f} {unit}"
        bytes_size /= 1024

def format_time(duration):
    if duration is None or duration == 0:
        return "0 s"
    time = duration/60
    return f"{time} Minutes"

def download_video(url:str, output_path:Path):
    ydl_opts = {
        "format":"bestvideo+bestaudio",
        "merge_output_format":"mp4",
        "outtmpl": str(output_path / "%(title)s.%(ext)s"),
        "restrictfilenames": True,
        "retries": 5,
        "fragment_retries": 5,
        "noplaylist":True,
        "ffmpeg_location": str(BASE_DIR / "bin"),
        "paths":{
            "temp":str(TEMP_DIR)
        }
    }
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

def download_audio(url:str, output_path: Path):
    ydl_opts = {
        "format":"bestaudio",
        "outtmpl": str(output_path/"%(title)s.%(ext)s"),
        "noplaylist":True,
        "restrictfilenames": True,
        "retries": 5,
        "fragment_retries": 5,
        "ffmpeg_location": str(BASE_DIR / "bin"),
        "paths":{
            "temp": str(TEMP_DIR)
        },
        "postprocessors":[
            {
                "key":"FFmpegExtractAudio",
                "preferredcodec":"mp3",
                "preferredquality": "0",
            }
        ]
    }
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

def temp_cleanup(path: Path, delay=10):
    time.sleep(delay)
    shutil.rmtree(path, ignore_errors= True)

output_dir = Path("output")
output_dir.mkdir(exist_ok=True)


