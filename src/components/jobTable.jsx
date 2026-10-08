import React from "react";
import { Link } from "react-router-dom";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "../utils/helpers";

export const JobTable = ({ applications, onDeleteClick }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Applied Date</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td style={{ fontWeight: "600" }}>{app.company}</td>
              <td>{app.position}</td>
              <td>{app.location || "N/A"}</td>
              <td>{app.salary || "N/A"}</td>
              <td>{formatDate(app.appliedDate)}</td>
              <td>
                <StatusBadge status={app.status} />
              </td>
              <td>
                <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
                  <Link to={`/applications/${app.id}`} className="icon-btn" title="View Details">
                    <Eye size={18} />
                  </Link>
                  <Link to={`/applications/edit/${app.id}`} className="icon-btn" title="Edit">
                    <Edit2 size={18} />
                  </Link>
                  <button
                    onClick={() => onDeleteClick(app.id)}
                    className="icon-btn delete"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};