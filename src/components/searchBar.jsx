import React from "react";
import { Search } from "lucide-react";

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div style={{ position: "relative", flex: "1", minWidth: "220px" }}>
      <Search
        size={18}
        style={{
          position: "absolute",
          left: "0.875rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)"
        }}
      />
      <input
        type="text"
        className="form-control"
        style={{ paddingLeft: "2.5rem", width: "100%" }}
        placeholder="Search by company, position, or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};