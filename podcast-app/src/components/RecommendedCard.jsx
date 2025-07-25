import React, { useState } from "react";
import { podcasts, genres } from "../data";
import AudioPlayer from "./AudioPlayer"; // 👈 Add this import

const RecommendedCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(null); // 🎧 New state for audio

  const prevShow = () => setCurrent((c) => (c === 0 ? podcasts.length - 1 : c - 1));
  const nextShow = () => setCurrent((c) => (c === podcasts.length - 1 ? 0 : c + 1));

  const currentPodcast = podcasts[current];

  const handlePlay = () => {
    // Selects the current podcast to pass into the AudioPlayer
    setSelectedEpisode({
      title: currentPodcast.title,
      podcastTitle: "Recommended Podcast", // Or pull from currentPodcast if available
      audioUrl: currentPodcast.audioUrl || "https://podcast-api.netlify.app/placeholder-audio.mp3",
      coverImage: currentPodcast.image,
    });
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2rem 0" }}>
        <button onClick={prevShow} style={{ fontSize: "1.5em", cursor: "pointer" }}>←</button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            overflowX: "auto",
            minWidth: "250px",
          }}
        >
          <img
            src={currentPodcast.image}
            alt={currentPodcast.title}
            style={{ width: "80px", height: "80px", borderRadius: "8px", cursor: "pointer" }}
            onClick={handlePlay}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{currentPodcast.title}</div>
            <div style={{ fontSize: "0.9em", color: "#888" }}>
              {currentPodcast.genres.map((genreId) => {
                const genre = genres.find((g) => g.id === genreId);
                return (
                  <span
                    key={genreId}
                    style={{
                      background: "#eee",
                      borderRadius: "4px",
                      padding: "2px 8px",
                      marginRight: "4px",
                    }}
                  >
                    {genre ? genre.title : "Unknown"}
                  </span>
                );
              })}
            </div>
            <div style={{ fontSize: "0.85em", color: "#666", marginTop: "0.5em" }}>
              {currentPodcast.description}
            </div>
          </div>
        </div>
        <button onClick={nextShow} style={{ fontSize: "1.5em", cursor: "pointer" }}>→</button>
      </div>

      {/* 🎧 Inject the AudioPlayer when an episode is selected */}
      {selectedEpisode && <AudioPlayer episode={selectedEpisode} />}
    </>
  );
};

export default RecommendedCarousel;

