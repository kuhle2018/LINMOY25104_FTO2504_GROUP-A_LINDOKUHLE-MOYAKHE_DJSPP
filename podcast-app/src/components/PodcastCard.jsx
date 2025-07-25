import React from "react";
import { genres } from "../data";
import AudioPlayer from "./AudioPlayer"; // 🔗 Add this if player lives nearby

const PodcastCard = ({ podcast, onPlay }) => {
  const handleClick = () => {
    if (onPlay) {
      onPlay({
        title: podcast.title,
        podcastTitle: podcast.podcastTitle || "Featured Podcast",
        audioUrl: podcast.audioUrl || "https://podcast-api.netlify.app/placeholder-audio.mp3",
        coverImage: podcast.image,
      });
    }
  };

  return (
    <div
      style={{
        background: "#222",
        borderRadius: "12px",
        padding: "1rem",
        margin: "1rem",
        width: "200px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        color: "#fff",
      }}
      onClick={handleClick}
    >
      <img
        src={podcast.image}
        alt={podcast.title}
        style={{
          width: "100%",
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div style={{ fontWeight: "bold", marginTop: "0.5em" }}>{podcast.title}</div>
      <div style={{ marginTop: "0.5em" }}>
        {podcast.genres.map((id) => {
          const genre = genres.find((g) => g.id === id);
          return (
            <span
              key={id}
              style={{
                background: "#444",
                borderRadius: "4px",
                padding: "2px 8px",
                marginRight: "4px",
                fontSize: "0.85em",
              }}
            >
              {genre ? genre.title : "Unknown"}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PodcastCard;

