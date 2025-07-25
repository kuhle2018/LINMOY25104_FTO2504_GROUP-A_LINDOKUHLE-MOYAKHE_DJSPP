import React from "react";

const PodcastModal = ({ isOpen, onClose, podcast, episodes }) => {
  if (!isOpen || !podcast) return null;

  const isDark = document.body.classList.contains("dark");

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9998,
  };

  const modalStyle = {
    backgroundColor: isDark ? "#1c1c1c" : "#ffffff",
    color: isDark ? "#eee" : "#222",
    padding: "1.5rem",
    borderRadius: "12px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 0 25px rgba(0, 0, 0, 0.2)",
    zIndex: 9999,
  };

  const titleStyle = {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    fontSize: "1.2rem",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: isDark ? "#eee" : "#222",
  };

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={onClose}>
          ✖
        </button>
        <h2 style={titleStyle}>{podcast.title}</h2>
        <p style={{ marginBottom: "1rem" }}>{podcast.description}</p>

        <h3 style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>Episodes</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Array.isArray(episodes) && episodes.length > 0 ? (
            episodes.map((ep) => (
              <li
                key={ep.id}
                style={{
                  marginBottom: "1rem",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  background: isDark ? "#2a2a2a" : "#f2f2f2",
                  color: isDark ? "#ccc" : "#333",
                }}
              >
                <h4 style={{ marginBottom: "0.5rem" }}>{ep.title}</h4>
                <p style={{ fontSize: "0.9rem" }}>{ep.description || "No description available."}</p>
              </li>
            ))
          ) : (
            <li style={{ color: isDark ? "#888" : "#555" }}>No episodes available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PodcastModal;

