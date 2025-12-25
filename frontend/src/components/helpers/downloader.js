import { toaster } from "../ui/toaster";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const downloadVideo = async (url, title, setVideoLoader) => {
  setVideoLoader(true);
  try {
    const res = await fetch(`${BASE_URL}/api/download/video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    });
    const blob = await res.blob();
    const urlBlob = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlBlob;
    a.download = title ? `${title}.mp4` : "video.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return setVideoLoader(false);
  } catch (err) {
    console.error("Error Occured in Download Video", err);
    toaster.create({
      description: "Couldn't Get the file",
      type: "error",
    });
    setVideoLoader(false);
  } finally {
    setVideoLoader(false);
  }
};

const downloadAudio = async (url, title, setAudioLoader) => {
  setAudioLoader(true);
  try {
    const res = await fetch(`${BASE_URL}/api/download/audio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    });
    const blob = await res.blob();
    const urlBlob = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlBlob;
    a.download = title ? `${title}.mp3`: "audio.mp3";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return setAudioLoader(false);
  } catch (err) {
    console.error("Error Occured in Download Audio", err);
    toaster.create({
      description: "Couldn't Get the file",
      type: "error",
    });
    setAudioLoader(false);
  } finally {
    setAudioLoader(false);
  }
};

export { downloadVideo, downloadAudio};
