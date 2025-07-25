import React, { useRef, useState, useEffect } from "react";

const AudioPlayer = ({ episode }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
  const handleLoadedMetadata = () => setDuration(audioRef.current?.duration || 0);
  const handleSeek = (e) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const {
    audioUrl = "https://podcast-api.netlify.app/placeholder-audio.mp3",
    title = "Episode Title",
    podcastTitle = "Podcast Show",
    coverImage = null,
  } = episode || {};

  return (
    <div style={{ padding: "1rem", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        {coverImage ? (
          <img src={coverImage} alt="Cover" style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover" }} />
        ) : (
          <div style={{ width: 60, height: 60, background: "#ccc", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🎧</div>
        )}
        <div>
          <h4 style={{ margin: 0 }}>{title}</h4>
          <p style={{ margin: 0, color: "#666" }}>{podcastTitle}</p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ display: "none" }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button onClick={handlePlayPause} style={{ fontSize: "1.5rem", background: "none", border: "none", cursor: "pointer" }}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <input type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} style={{ flex: 1 }} />
        <span style={{ fontSize: "0.9rem", color: "#888" }}>
          {Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)} / {Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;

