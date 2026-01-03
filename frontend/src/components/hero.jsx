import { useEffect, useRef, useState } from "react";
import { Link2 } from "lucide-react";
import DownloadCard from "./card";
import { Spinner } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";

export default function HeroSection() {
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(null);
  const [shadow, setShadow] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const clickRef = useRef();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const handleClick = (event) => {
      if (clickRef.current && !clickRef.current.contains(event.target)) {
        setShadow(false);
      } else {
        setShadow(true);
      }
    };
    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getMetaData = async () => {
    if (!url) return;
    setLoader(true);
    try {
      const res = await fetch(`/api/metadata`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ url: url }),
      });
      if (!res.ok) {
        console.error("Error Occurred");
        toaster.create({
          description: "Internal Server Error",
          type: "error",
        });
        return;
      }
      const data = await res.json();
      if (data) {
        setVideoData(data);
        // console.log("Updated videoData:", [data]);
      }
      // console.log(data);
      toaster.create({
        description: "Download Your Preferred Type",
        type: "info",
        closable: true,
      });
    } catch (error) {
      console.error("Internal Server Error", error);
      toaster.create({
        description: "Error Occurred",
        type: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="flex bg-gray-800 p-2 md:p-10 md:pt-30 pt-30 flex-col items-center justify-center">
        <h1
          className={`animate-slidein opacity-0 [--slidein-delay:300ms] transition-all duration-1000 ease-in-out flex flex-col text-center font-bold text-3xl md:text-5xl  tracking-tight text-white `}
        >
          Download YouTube Videos
          <span>Instantaly</span>
        </h1>
        <p
          className={`animate-slidein opacity-0 [--slidein-delay:500ms] transition-all duration-1000 ease-in-out flex flex-col text-center text-xs md:text-sm text-gray-500 pt-2`}
        >
          Convert and download YouTube videos in MP4 and MP3.
          <span>High quality, free and fast</span>
        </p>
        <div
          ref={clickRef}
          className={`group/input mt-10 mb-10 md:mb-0 flex items-center gap-2 
  w-[90%] sm:w-[80%] lg:w-[40%] 
  rounded px-2 py-1
  ${
    shadow
      ? "shadow-[0_0_20px_rgba(59,130,246,0.9)]"
      : "shadow-[0_0_20px_rgba(59,130,246,0.4)]"
  }
  transition-shadow duration-300 ease-in-out`}
        >
          <Link2 className="w-4 h-4 text-gray-500 shrink-0" />

          <input
            type="url"
            name="url_input"
            id="url_input"
            value={url}
            placeholder="Paste the URL to download"
            onChange={(e) => setUrl(e.target.value)}
            className={` flex-1 min-w-0 h-10
      bg-transparent text-white text-sm
      px-2 outline-none border-none
      placeholder:text-gray-500`}
          />

          <button
            className={`shrink-0 h-9
      bg-blue-700 hover:bg-blue-800/90 hover:text-gray-400
      text-white text-sm font-medium
      px-4 rounded transition-all duration-300 ${
        !url || loader ? "cursor-not-allowed" : "cursor-pointer"
      }
    `}
            onClick={() => {
              if (loader) return;
              getMetaData();
            }}
          >
            {loader ? <Spinner size={"sm"} /> : "Start"}
          </button>
        </div>
      </div>
      <div
        className={`${
          videoData
            ? "opacity-100 pointer-events-auto"
            : "pointer-events-none opacity-0 w-0 h-0"
        } transition-opacity duration-1000 ease-in-out`}
      >
        <DownloadCard metaData={videoData} url={url} />
      </div>
    </>
  );
}

// {
//     "channel": "Futbol Media",
//     "duration": 51,
//     "size": 126442484,
//     "thumbnail": "https://i.ytimg.com/vi/KTDXLH4xEaI/sd2.jpg?sqp=-oaymwEoCIAFEOAD8quKqQMcGADwAQH4AbYIgAKgC4oCDAgAEAEYZSBDKFQwDw==&rs=AOn4CLBLFS6uWEhCQ0r2PZT2aVrrhq13iA",
//     "timestamp": 1764000417,
//     "title": "Ronaldo's Revenge On Messi's Family.. 😮‍💨",
//     "viewcount": 86307625
// }
