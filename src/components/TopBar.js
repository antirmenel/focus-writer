import React, { useState } from "react";
import IconButton from "./IconButton";
import { FiMaximize2 } from "react-icons/fi"; // Feather Icons
import { LiaCopy } from "react-icons/lia"; // Copy Icon
import { MdDownloading } from "react-icons/md";
import { GrClear } from "react-icons/gr";
import { IoMdMenu } from "react-icons/io";
import { RxEyeOpen, RxMoon } from "react-icons/rx";
import { PiEyeClosedDuotone, PiSunHorizonFill } from "react-icons/pi";

const TopBar = ({
  darkMode,
  setDarkMode,
  focusMode,
  setFocusMode,
  onClear,
  onDownload,
  onCopy,
  onFullScreen,
}) => {
  const [showMenu, setShowMenu] = useState(false); // State to toggle the three-dots menu

  return (
    <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-transparent">
      <div className="flex space-x-2">
        {/* Three-dots menu to toggle additional buttons */}
        <IconButton
          onClick={() => setShowMenu(!showMenu)}
          title="More Options"
          ariaLabel="More options"
        >
          <IoMdMenu size={24} />
        </IconButton>

        {/* Additional buttons (hidden by default, shown when menu is toggled) */}
        {showMenu && (
          <>
            <IconButton onClick={onClear} title="Clear" ariaLabel="Clear text">
              <GrClear size={19} />
            </IconButton>
            <IconButton
              onClick={onDownload}
              title="Download"
              ariaLabel="Download text as file"
            >
              <MdDownloading size={22} />
            </IconButton>
            <IconButton onClick={onCopy} title="Copy" ariaLabel="Copy text">
              <LiaCopy size={24} />
            </IconButton>
          </>
        )}
      </div>

      <div className="flex space-x-2">
        {/* Focus Mode Toggle */}
        <IconButton
          onClick={() => setFocusMode(!focusMode)}
          title={focusMode ? "Show Stats" : "Hide Stats"}
          ariaLabel={focusMode ? "Show stats" : "Hide stats"}
        >
          {focusMode ? (
            <PiEyeClosedDuotone size={20} />
          ) : (
            <RxEyeOpen size={20} />
          )}
        </IconButton>

        {/* Dark/Light Mode Toggle */}
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          ariaLabel={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <PiSunHorizonFill size={20} /> : <RxMoon size={20} />}
        </IconButton>

        {/* Full Screen Toggle */}
        <IconButton
          onClick={onFullScreen}
          title="Toggle Full Screen"
          ariaLabel="Toggle full screen"
        >
          <FiMaximize2 size={20} />
        </IconButton>
      </div>
    </div>
  );
};

export default TopBar;
