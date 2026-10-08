import React from "react";

export const ProgressBar = ({ label, count, total, color }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.375rem" }}>
        <span style={{ fontWeight: "600" }}>{label}</span>
        <span style={{ color: "var(--text-secondary)" }}>{count} ({percentage}%)</span>
      </div>
      <div style={{
        height: "8px",
        width: "100%",
        backgroundColor: "var(--bg-main)",
        borderRadius: "9999px",
        overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          width: `${percentage}%`,
          backgroundColor: color,
          transition: "width 0.4s ease-in-out"
        }} />
      </div>
    </div>
  );
};