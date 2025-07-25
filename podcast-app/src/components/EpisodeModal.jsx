import React, { useState } from "react";
import { genres } from "../data";
import EpisodeList from "./EpisodeList";

const PodcastModal = ({ podcast, onClose }) => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [showEpisodes, setShowEpisodes] = useState(false);

  if (!podcast) return null;

  const isDark = document.body.classList.contains("dark");

  return (
    <>
      {/* 🎙️ Main Podcast Modal */}
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
            background: isDark ? "#1a1a1a" : "#fff",
            color: isDark ? "#eee" : "#213547",
            borderRadius: "16px",
            padding: "2rem",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          {/* ❌ Close Button */}
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
              color: isDark ? "#eee" : "#333",
            }}
          >
            ×
          </button>

          {/* 🖼️ Podcast Cover */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img
              src={podcast.image}
              alt={podcast.title}
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* 📄 Title & Description */}
          <h2 style={{ marginBottom: "0.75em" }}>{podcast.title}</h2>

          <div style={{ marginBottom: "1em", display: "flex", flexWrap: "wrap", gap: "0.5em" }}>
            {Array.isArray(podcast.genres) && podcast.genres.length > 0 ? (
              podcast.genres.map((id) => {
                const genre = genres.find((g) => g.id === id);
                return (
                  <span
                    key={id}
                    style={{
                      background: isDark ? "#333" : "#eee",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "0.85em",
                    }}
                  >
                    {genre ? genre.title : "Unknown"}
                  </span>
                );
              })
            ) : (
              <span>No genres available</span>
            )}
          </div>

          <p style={{ marginBottom: "0.75em", lineHeight: "1.5", color: isDark ? "#bbb" : "#555" }}>
            {podcast.description || "No description available"}
          </p>

          <div style={{ fontSize: "0.85em", color: isDark ? "#888" : "#999", marginBottom: "1em" }}>
            Updated: {podcast.updated || "N/A"}
          </div>

          {/* 🎧 Audio Player */}
          <audio controls style={{ marginBottom: "1.5em", width: "100%" }}>
            <source src="https://podcast-api.netlify.app/placeholder-audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          {/* 📚 Season List */}
          {Array.isArray(podcast.seasons) && podcast.seasons.length > 0 && (
            <div>
              <h3 style={{ marginBottom: "0.5em" }}>Seasons</h3>
              {podcast.seasons.map((season, index) => (
                <div
                  key={season.id || index}
                  style={{
                    marginBottom: "1em",
                    padding: "0.75em",
                    border: `1px solid ${isDark ? "#333" : "#eee"}`,
                    borderRadius: "8px",
                  }}
                >
                  <strong>Season {season.number}</strong>
                  <button
                    onClick={() => {
                      setSelectedSeason(season);
                      setShowEpisodes(true);
                    }}
                    style={{
                      marginLeft: "1rem",
                      fontSize: "0.85em",
                      background: isDark ? "#444" : "#eee",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      color: isDark ? "#eee" : "#333",
                    }}
                  >
                    View Episodes
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🎬 Hidden Episode Modal */}
      {showEpisodes && selectedSeason && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
          }}
        >
          <div
            style={{
              background: isDark ? "#1a1a1a" : "#fff",
              color: isDark ? "#eee" : "#213547",
              padding: "2rem",
              borderRadius: "16px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowEpisodes(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5em",
                cursor: "pointer",
                color: isDark ? "#eee" : "#333",
              }}
            >
              ×
            </button>

            <EpisodeList
              episodes={selectedSeason.episodes || []}
              onSelect={(ep) => console.log("Episode clicked:", ep)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PodcastModal;

