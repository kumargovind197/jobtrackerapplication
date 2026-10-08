import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJob } from '../context/JobContext';

export default function AddEditApplication() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addApplication, updateApplication, getApplicationById } = useJob();

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
    jobUrl: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      const existing = getApplicationById(id);
      if (existing) {
        setFormData(existing);
      } else {
        navigate('/applications');
      }
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = 'Company Name is required';
    if (!formData.position.trim()) newErrors.position = 'Job Position is required';
    if (!formData.appliedDate) newErrors.appliedDate = 'Application Date is required';
    if (!formData.status) newErrors.status = 'Status is required';

    if (formData.jobUrl && formData.jobUrl.trim() !== '') {
      try {
        new URL(formData.jobUrl);
      } catch (_) {
        newErrors.jobUrl = 'Please enter a valid URL (e.g. https://example.com)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit) {
      updateApplication(id, formData);
    } else {
      addApplication(formData);
    }

    navigate('/applications');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem' }}>
          {isEdit ? 'Edit Job Application' : 'Add Job Application'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                name="company"
                className="form-control"
                placeholder="Google"
                value={formData.company}
                onChange={handleChange}
              />
              {errors.company && <div className="error-text">{errors.company}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Job Position *</label>
              <input
                type="text"
                name="position"
                className="form-control"
                placeholder="Frontend Developer"
                value={formData.position}
                onChange={handleChange}
              />
              {errors.position && <div className="error-text">{errors.position}</div>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="Remote / New York, NY"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Salary Range</label>
              <input
                type="text"
                name="salary"
                className="form-control"
                placeholder="$80,000 - $100,000"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Application Date *</label>
              <input
                type="date"
                name="appliedDate"
                className="form-control"
                value={formData.appliedDate}
                onChange={handleChange}
              />
              {errors.appliedDate && <div className="error-text">{errors.appliedDate}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Status *</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Job Posting URL</label>
            <input
              type="url"
              name="jobUrl"
              className="form-control"
              placeholder="https://company.com/careers/job-id"
              value={formData.jobUrl}
              onChange={handleChange}
            />
            {errors.jobUrl && <div className="error-text">{errors.jobUrl}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              className="form-control"
              rows="4"
              placeholder="Add extra information, interview dates, contact persons..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/applications')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEdit ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}