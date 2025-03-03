import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import ErrorBoundary from "./components/ErrorBoundary";
import useDebounce from "./utils/useDebounce";
import useTimer from "./utils/useTimer";

// Constants for localStorage keys
const LOCAL_STORAGE_KEYS = {
  TEXT: "focusWriterText",
  DARK_MODE: "focusWriterDarkMode",
  TIME: "focusWriterTime",
};

export default function FocusWriter() {
  const [text, setText] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_KEYS.TEXT) || ""
  );
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE) === "true"
  );
  const [focusMode, setFocusMode] = useState(false);
  const { time, isRunning, start, pause, reset } = useTimer(
    parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.TIME)) || 0
  );
  const [isFullScreen, setIsFullScreen] = useState(false);

  const debouncedText = useDebounce(text, 500);

  // Save text, dark mode, and timer to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TEXT, debouncedText);
  }, [debouncedText]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.DARK_MODE, darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TIME, time);
  }, [time]);

  // Word and character count
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  // Handlers
  const handleClear = () => setText("");
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "focus-writer.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Text copied to clipboard!"));
  };
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .catch((err) => console.error("Error enabling full-screen mode:", err));
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };
  const handleStartStop = () => (isRunning ? pause() : start());
  const handleReset = () => reset();

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen p-4 transition-all duration-300 ease-in-out font-inter ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <TopBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          onClear={handleClear}
          onDownload={handleDownload}
          onCopy={handleCopy}
          onFullScreen={handleFullScreen}
        />

        <textarea
          className="w-full h-screen outline-none bg-transparent text-base p-4 mt-16 resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Reflect, write, and grow..."
          aria-label="Text area for writing"
        />

        {!focusMode && (
          <BottomBar
            wordCount={wordCount}
            charCount={charCount}
            time={time}
            isRunning={isRunning}
            onStartStop={handleStartStop}
            onReset={handleReset}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
