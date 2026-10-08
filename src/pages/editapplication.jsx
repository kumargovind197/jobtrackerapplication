import React from "react";
import { useParams, Link } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { JobForm } from "../components/jobForm";

export const EditApplication = () => {
  const { id } = useParams();
  const { getApplicationById, updateApplication } = useJob();

  const application = getApplicationById(id);

  if (!application) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
        <h3>Application Not Found</h3>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
          The application you are trying to edit does not exist.
        </p>
        <Link to="/applications" className="btn btn-primary">
          Back to Applications
        </Link>
      </div>
    );
  }

  const handleSubmit = (formData) => {
    updateApplication(id, formData);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.25rem" }}>
        Edit Application: {application.company}
      </h2>
      <JobForm initialValues={application} onSubmit={handleSubmit} isEditing />
    </div>
  );
};