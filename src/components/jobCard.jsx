import React from "react";
import { Link } from "react-router-dom";
import { Eye, Edit2, Trash2, Calendar, MapPin, DollarSign } from "lucide-react";
import { StatusBadge } from "./statusBadge";
import { formatDate } from "../utilis/helpers";

export const JobCard = ({ app, onDeleteClick }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <div className="job-card-title">{app.position}</div>
          <div className="job-card-company">{app.company}</div>
        </div>
        <StatusBadge status={app.status} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
        {app.location && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <MapPin size={14} /> {app.location}
          </div>
        )}
        {app.salary && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <DollarSign size={14} /> {app.salary}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <Calendar size={14} /> {formatDate(app.appliedDate)}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border-color)" }}>
        <Link to={`/applications/${app.id}`} className="btn btn-secondary" style={{ padding: "0.375rem 0.75rem", fontSize: "0.8rem" }}>
          <Eye size={14} /> View
        </Link>
        <Link to={`/applications/edit/${app.id}`} className="btn btn-secondary" style={{ padding: "0.375rem 0.75rem", fontSize: "0.8rem" }}>
          <Edit2 size={14} /> Edit
        </Link>
        <button
          onClick={() => onDeleteClick(app.id)}
          className="btn btn-danger"
          style={{ padding: "0.375rem 0.75rem", fontSize: "0.8rem" }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};