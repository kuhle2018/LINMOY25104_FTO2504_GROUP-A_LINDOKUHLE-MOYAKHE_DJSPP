import React, { useState } from "react";
import { podcasts } from "../data";
import AudioPlayer from "./AudioPlayer"; // 🎶 Import your player component

const FavouritesPage = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handlePlay = (podcast) => {
    setSelectedEpisode({
      title: podcast.title,
      podcastTitle: "Favourites", // You can update this dynamically if needed
      audioUrl: podcast.audioUrl || "https://podcast-api.netlify.app/placeholder-audio.mp3",
      coverImage: podcast.image,
    });
  };

  return (
    <div className="favourites-page">
      <h1>Favourite Episodes</h1>
      <p>Your saved episodes from all shows</p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select>
          <option>Newest Added</option>
          <option>Oldest Added</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select>
          <option>All Shows</option>
          {podcasts.map((podcast) => (
            <option key={podcast.id}>{podcast.title}</option>
          ))}
        </select>
      </div>

      <h2>
        All Podcasts <span style={{ fontWeight: "normal" }}>({podcasts.length} episodes)</span>
      </h2>

      <div>
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              background: "#fff",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                marginRight: "1rem",
                fontWeight: "bold",
                overflow: "hidden",
              }}
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold" }}>{podcast.title}</div>
              <div style={{ color: "#555", fontSize: "0.95em" }}>{podcast.description}</div>
              <div style={{ fontSize: "0.85em", color: "#888" }}>Seasons: {podcast.seasons}</div>
            </div>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginRight: "1rem",
              }}
            >
              <span
                role="img"
                aria-label="favourite"
                style={{ fontSize: "1.5em", color: "#888" }}
              >
                ♥
              </span>
            </button>
            <button
              onClick={() => handlePlay(podcast)}
              style={{
                background: "#222",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.5em 1em",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ▶ Play
            </button>
          </div>
        ))}
      </div>

      {/* 🔊 Inject the AudioPlayer when an episode is selected */}
      {selectedEpisode && <AudioPlayer episode={selectedEpisode} />}
    </div>
  );
};

export default FavouritesPage;

