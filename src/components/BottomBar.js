import React from "react";
import IconButton from "./IconButton";
import { FiPlay, FiPause, FiRotateCw } from "react-icons/fi"; // Feather Icons

const BottomBar = ({
  wordCount,
  charCount,
  time,
  isRunning,
  onStartStop,
  onReset,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-transparent">
      <div className="text-sm">
        Words: {wordCount} | Characters: {charCount}
      </div>
      <div className="flex space-x-2">
        {/* Start/Pause Button */}
        <IconButton
          onClick={onStartStop}
          title={isRunning ? "Pause" : "Start"}
          ariaLabel={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? <FiPause size={20} /> : <FiPlay size={20} />}
        </IconButton>

        {/* Reset Button */}
        <IconButton
          onClick={onReset}
          title="Reset Timer"
          ariaLabel="Reset timer"
        >
          <FiRotateCw size={20} />
        </IconButton>

        {/* Timer Display */}
        <div className="p-2 text-sm">
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
