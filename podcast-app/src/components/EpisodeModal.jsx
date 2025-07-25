import React from "react";
import AudioPlayer from "./AudioPlayer";

const EpisodeModal = ({ episode, onClose }) => {
  if (!episode) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        position: "relative",
        width: "90%",
        maxWidth: "600px"
      }}>
        <button onClick={onClose} style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: "1.2rem",
          background: "none",
          border: "none",
          cursor: "pointer"
        }}>❌</button>
        <AudioPlayer episode={episode} />
      </div>
    </div>
  );
};

export default EpisodeModal;

