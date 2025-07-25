import React, { useRef } from "react";
const AudioPlayer = ({ episode }) => {
  const audioRef = useRef(null);

  const {
    title = "Untitled Episode",
    podcastTitle = "Untitled Podcast",
    image: coverImage = null,
    file = "https://podcast-api.netlify.app/placeholder-audio.mp3",
  } = episode || {};

  const handleTimeUpdate = (e) => {
    // Add custom logic if needed (e.g., tracking progress)
    console.log("Current time:", e.target.currentTime);
  };

  const handleLoadedMetadata = (e) => {
    // Optional: duration handling or autoplay setup
    console.log("Duration:", e.target.duration);
  };

  return (
    <div className="audio-player-container p-4 bg-gray-100 rounded-lg">
      {coverImage && (
        <img src={coverImage} alt={`${podcastTitle} Cover`} className="w-full mb-4 rounded" />
      )}
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{podcastTitle}</p>

      <audio
        ref={audioRef}
        src={file}
        controls
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full"
      />
    </div>
  );
};

export default AudioPlayer;

