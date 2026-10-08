import React from "react";

export const FilterBar = ({ filterStatus, setFilterStatus, sortBy, setSortBy }) => {
  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <select
        className="form-control"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
        <option value="Withdrawn">Withdrawn</option>
      </select>

      <select
        className="form-control"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="Newest">Sort by: Newest</option>
        <option value="Oldest">Sort by: Oldest</option>
        <option value="Company A-Z">Company: A - Z</option>
        <option value="Company Z-A">Company: Z - A</option>
      </select>
    </div>
  );
};