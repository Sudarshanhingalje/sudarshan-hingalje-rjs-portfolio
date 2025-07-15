import React from "react";

export default function PathDrawing() {
  return (
    <svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      style={{ maxWidth: "80vw" }}
    >
      <circle
        cx="100"
        cy="100"
        r="80"
        stroke="#FF0055"
        style={{
          strokeWidth: 10,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
      <line
        x1="220"
        y1="30"
        x2="360"
        y2="170"
        stroke="#7700FF"
        style={{
          strokeWidth: 10,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
      {/* More shapes would go here */}
    </svg>
  );
}
