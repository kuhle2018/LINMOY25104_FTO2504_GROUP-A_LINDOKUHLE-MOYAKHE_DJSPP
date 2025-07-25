import React from "react";

const EpisodeList = ({ episodes, onSelect }) => {
  const isDark = document.body.classList.contains("dark");

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Season Episodes</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Array.isArray(episodes) && episodes.length > 0 ? (
          episodes.map((ep) => (
            <li
              key={ep.id}
              onClick={() => onSelect(ep)}
              style={{
                marginBottom: "1rem",
                padding: "0.75rem",
                borderRadius: "6px",
                background: isDark ? "#2a2a2a" : "#f8f8f8",
                color: isDark ? "#eee" : "#333",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <h4 style={{ marginBottom: "4px", fontSize: "1.05rem" }}>{ep.title}</h4>
              <p style={{ fontSize: "0.9rem", color: isDark ? "#bbb" : "#666" }}>
                {ep.description || "No description available."}
              </p>
            </li>
          ))
        ) : (
          <li style={{ color: isDark ? "#888" : "#555" }}>No episodes available.</li>
        )}
      </ul>
    </div>
  );
};

export default EpisodeList;





