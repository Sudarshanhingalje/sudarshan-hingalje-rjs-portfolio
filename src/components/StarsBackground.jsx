import React from "react";
import "../styles/stars.css";

export default function StarsBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="stars" />
    </div>
  );
}
