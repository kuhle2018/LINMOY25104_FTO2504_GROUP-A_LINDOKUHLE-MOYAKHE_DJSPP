import React, { useEffect, useState } from "react";

const THEME_KEY = "theme";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) setTheme(saved);
    document.body.className = saved || "light";
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    document.body.className = next;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: theme === "light" ? "#eee" : "#333",
        borderRadius: "20px",
        padding: "4px 12px",
        cursor: "pointer",
        userSelect: "none",
        transition: "background 0.3s",
      }}
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span style={{
        fontSize: "1.2em",
        marginRight: "8px",
        color: theme === "light" ? "#222" : "#fff"
      }}>
        🌞
      </span>
      <div style={{
        width: "40px",
        height: "20px",
        background: theme === "light" ? "#fff" : "#222",
        borderRadius: "10px",
        position: "relative",
        marginRight: "8px",
        transition: "background 0.3s"
      }}>
        <div style={{
          position: "absolute",
          top: "2px",
          left: theme === "light" ? "2px" : "22px",
          width: "16px",
          height: "16px",
          background: theme === "light" ? "#ffd700" : "#444",
          borderRadius: "50%",
          transition: "left 0.3s, background 0.3s"
        }} />
      </div>
      <span style={{
        fontSize: "1.2em",
        color: theme === "light" ? "#888" : "#ffd700"
      }}>
        🌚
      </span>
    </div>
  );
};

export default ThemeToggle;

