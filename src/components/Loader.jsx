import React from "react";
import "./Loader.css";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="loader-container">
      <div className="loader-spinner" />
      <div className="loader-message">{message}</div>
    </div>
  );
}
