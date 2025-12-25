import { DownloadIcon } from "lucide-react";
import { durationConversion, formatViewCount } from "./helpers/convertor";
import { downloadVideo, downloadAudio } from "./helpers/downloader";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";

export default function DownloadCard({ metaData, url }) {
  const [videoLoader, setVideoLoader] = useState(null);
  const [audioLoader, setAudioLoader] = useState(null);

  return (
    <>
      <div className="bg-gray-800 md:pt-5  px-4 w-full flex justify-center pb-10">
        <div
          className={`rounded flex border flex-col md:flex-row justify-center border-gray-600 p-3 
            
              hover:shadow-[0px_0px_12px_rgba(60,50,200,0.9)]
              shadow-[0px_0px_12px_rgba(60,50,200,0.5)]
           bg-gray-600/30 transition-shadow duration-300 ease-in-out `}
        >
          <div className="w-full max-w-xs md:max-w-sm">
            <div className="relative w-fit">
              <img
                src={metaData?.thumbnail}
                alt="youtube video thumbnail"
                className="w-80 rounded h-fit "
              />
              <p className="absolute bottom-2 right-2 rounded bg-gray-900/80 text-gray-300 py-0.5 text-xs px-3">
                {durationConversion(metaData?.duration)}
              </p>
            </div>
            <h5 className="text-gray-200 font-medium line-clamp-2 tracking-tight overflow-hidden wrap-break-word text-sm pt-2">
              {metaData?.title}
            </h5>
            <div className="flex text-xs pt-1 text-gray-500 tracking-tight gap-1">
              <p className="truncate max-w-25">{metaData?.channel}</p>
              <p>&#8226;</p>
              <p>{formatViewCount(metaData?.viewcount)} views</p>
            </div>
          </div>

          <div className="bg h-fit border-t mt-2 md:mt-0 md:border-0 border-gray-600 w-full space-y-2">
            <div className="flex justify-between py-2 px-4">
              {["TYPE", "SIZE", "ACTION"].map((i) => (
                <p
                  key={i}
                  className="text-xs text-gray-500 tracking-tight font-semibold "
                >
                  {i}
                </p>
              ))}
            </div>
            <div className="bg-gray-800 border text-xs tracking-tighter py-1 md:py-2 px-2 md:px-3 ml-0 md:ml-2   flex items-center justify-between rounded border-gray-500 text-gray-300 font-medium">
              <p>VIDEO</p>
              <p>{metaData?.videosize}</p>
              <button
                className={`${
                  videoLoader ? "cursor-not-allowed" : "cursor-pointer"
                }  bg-blue-700  transition-colors duration-300 hover:text-gray-400 hover:bg-blue-800/90 rounded font-medium flex items-center gap-x-1 py-1 px-2`}
                onClick={() => {
                  if (videoLoader) return;
                  downloadVideo(url, metaData?.title, setVideoLoader);
                }}
              >
                {videoLoader ? (
                  <Spinner size={"sm"} />
                ) : (
                  <>
                    <DownloadIcon className="w-4 h-4" />
                    <span className="hidden md:block ">Download</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-800 border text-xs tracking-tighter py-1 md:py-2 px-2 md:px-3 ml-0 md:ml-2  flex items-center justify-between rounded border-gray-500 text-gray-300 font-medium">
              <p>AUDIO</p>
              <p>{metaData?.audiosize}</p>
              <button
                className="bg-blue-700 cursor-pointer transition-colors duration-300 hover:text-gray-400 hover:bg-blue-800/90 rounded font-medium flex items-center gap-x-1 py-1 px-2"
                onClick={() => {
                  if (audioLoader) return;
                  downloadAudio(url, metaData?.title, setAudioLoader);
                }}
              >
                {audioLoader ? (
                  <Spinner size={"sm"} />
                ) : (
                  <>
                    <DownloadIcon className="w-4 h-4" />
                    <span className="hidden md:block ">Download</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
