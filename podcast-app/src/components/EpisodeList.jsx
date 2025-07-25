import React from "react";

const EpisodeList = ({ episodes, onSelect }) => (
  <div style={{ padding: "1rem" }}>
    <h2>Season Episodes</h2>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {episodes.map((ep) => (
        <li key={ep.id} onClick={() => onSelect(ep)} style={{
          marginBottom: "1rem",
          padding: "0.5rem",
          borderRadius: "6px",
          background: "#f8f8f8",
          cursor: "pointer",
          transition: "background 0.2s"
        }}>
          <h4 style={{ marginBottom: "4px" }}>{ep.title}</h4>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>{ep.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default EpisodeList;

