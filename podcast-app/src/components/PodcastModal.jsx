import React from "react";
import { genres } from "../data";

const PodcastModal = ({ podcast, onClose }) => {
  if (!podcast) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "500px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5em",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <img
          src={podcast.image}
          alt={podcast.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <h2 style={{ margin: "1em 0 0.5em 0" }}>{podcast.title}</h2>

        <div style={{ marginBottom: "0.5em" }}>
          {podcast.genres.map((id) => {
            const genre = genres.find((g) => g.id === id);
            return (
              <span
                key={id}
                style={{
                  background: "#eee",
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

        <div style={{ color: "#555", marginBottom: "0.5em" }}>{podcast.description}</div>
        <div style={{ fontSize: "0.85em", color: "#aaa", marginBottom: "1em" }}>
          Updated: {podcast.updated}
        </div>

        {/* 🎬 Render Seasons and Episodes if available */}
        {Array.isArray(podcast.seasons) && podcast.seasons.length > 0 && (
          <div>
            <h3 style={{ marginBottom: "0.5em" }}>Seasons</h3>
            {podcast.seasons.map((season, index) => (
              <div
                key={season.id || index}
                style={{
                  marginBottom: "1em",
                  padding: "0.5em",
                  border: "1px solid #eee",
                  borderRadius: "8px",
                }}
              >
                <strong>Season {season.number}</strong>
                {season.episodes && (
                  <ul style={{ marginTop: "0.5em", paddingLeft: "1rem", fontSize: "0.95em" }}>
                    {season.episodes.map((ep) => (
                      <li key={ep.id} style={{ marginBottom: "0.3em" }}>
                        🎧 {ep.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastModal;

