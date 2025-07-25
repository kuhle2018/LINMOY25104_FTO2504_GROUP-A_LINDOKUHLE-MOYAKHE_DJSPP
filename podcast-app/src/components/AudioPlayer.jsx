import React, { useRef, useState } from "react";

const AudioPlayer = ({ episode }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const {
    audioUrl = "https://podcast-api.netlify.app/placeholder-audio.mp3",
    title = "Episode Title",
    podcastTitle = "Podcast Show",
    coverImage = null,
  } = episode || {};

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        background: "#fff",
        borderTop: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 2rem",
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
        {coverImage ? (
          <img
            src={coverImage}
            alt="Cover"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            🎧
          </div>
        )}
        <div>
          <div style={{ fontWeight: "bold" }}>{title}</div>
          <div style={{ fontSize: "0.9em", color: "#888" }}>{podcastTitle}</div>
        </div>
      </div>
      <button
        onClick={handlePlayPause}
        style={{
          background: "none",
          border: "none",
          fontSize: "1.5em",
          marginRight: "1rem",
          cursor: "pointer",
        }}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        style={{ width: "120px", marginRight: "1rem" }}
      />
      <span style={{ fontSize: "0.9em", color: "#888", marginRight: "1rem" }}>
        {Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)} /{" "}
        {Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}
      </span>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ display: "none" }}
      />
      <button
        style={{
          background: "none",
          border: "none",
          fontSize: "1.2em",
          cursor: "pointer",
        }}
        title="Volume"
      >
        🔊
      </button>
    </div>
  );
};

export default AudioPlayer;

