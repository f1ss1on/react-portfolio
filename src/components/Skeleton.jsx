import React from "react";
import "./Skeleton.css";

export function Skeleton({ width = "100%", height = 20, style = {}, className = "" }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, ...style }}
    />
  );
}

export function SkeletonBlock({ lines = 3, width = "100%", height = 20, gap = 12, style = {} }) {
  return (
    <div style={{ ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={typeof width === "string" ? width : width[i] || width[0]}
          height={typeof height === "number" ? height : height[i] || height[0]}
          style={{ marginBottom: i < lines - 1 ? gap : 0 }}
        />
      ))}
    </div>
  );
}
