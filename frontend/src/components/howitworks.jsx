import { Copy, ClipboardPaste, Download } from "lucide-react";

export default function HowItWorks() {
  return (
    <>
      <div className="bg-gray-900 md:pb-10 p-10 flex flex-col items-center justify-center">
        <div className="text-center">
          <h3 className="font-bold text-2xl  text-white">How it works</h3>
          <p className="text-gray-600 text-sm mt-2 tracking-tight">
            Download your favourite videos in 3 simple steps. No registration
            required.
          </p>
        </div>
        <div className="flex gap-5 flex-col md:flex-row mt-5">
          {[
            {
              title: "Copy URL",
              icon: Copy,
              description:
                "Find the video you want to download on YouTube and copy its link using the share button",
            },
            {
              title: "Paste Link",
              icon: ClipboardPaste,
              description:
                `Paste the link in the input field above and click the "Start" button to process`,
            },
            {
              title: "Download",
              icon: Download,
              description:
                `Choose your preferred type "Video" or "Audio" and then click download.`,
            },
          ].map((item, index) => (
            <div key={index} className="bg-gray-600/30 space-y-1 shadow-[0px_0px_10px_rgba(60,60,200,0.5)] w-64 md:w-52 lg:w-64 h-auto rounded border border-gray-500 py-3 px-4">
              <div className="bg-gray-700/50 rounded p-1 w-fit ">
                <item.icon className="w-4 h-4 text-blue-700" />
              </div>
              <h6 className="text-gray-100 text-base  font-medium">
                {index+1}. {item.title}
              </h6>
              <p className="text-sm text-gray-600 tracking-tight line-clamp-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
