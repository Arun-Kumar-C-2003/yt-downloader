import { Download } from "lucide-react";
import { Coffee } from "lucide-react";

const SUPPORT = import.meta.env.VITE_COFFEE;
export default function Navbar() {
  return (
    <>
      <div className="bg-gray-800 border-b border-gray-700 fixed z-30 flex justify-between top-0 w-full p-3">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700  rounded-full p-2">
            <Download className="text-gray-800 w-5 h-5 " />
          </div>
          <p className="text-white font-bold">YTDownloader</p>
        </div>
        <button
          className="text-white font-semibold bg-blue-700 flex gap-1 items-center justify-center text-sm rounded py-0.5 px-3 transition-colors duration-300 hover:text-gray-400 hover:bg-blue-800/90 cursor-pointer"
          onClick={() => window.open(SUPPORT)}
        >
          <span>Buy a</span>
          <Coffee className="w-5 h-5 -mt-1 " />
        </button>
      </div>
    </>
  );
}
