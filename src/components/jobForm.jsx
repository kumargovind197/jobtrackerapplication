const JobForm = ({ initialData, isEdit = false, navigate }) => {
  const { addApplication, updateApplication } = useJob();

  const [formData, setFormData] = useState(initialData || {
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

  const validate = () => {
    const errs = {};
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.position.trim()) errs.position = 'Job position is required';
    if (!formData.appliedDate) errs.appliedDate = 'Application date is required';
    
    if (formData.jobUrl && !formData.jobUrl.startsWith('http://') && !formData.jobUrl.startsWith('https://')) {
      errs.jobUrl = 'Job URL must start with http:// or https://';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit) {
      updateApplication(formData.id, formData);
    } else {
      addApplication(formData);
    }

    navigate('#/applications');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-sm p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        {isEdit ? 'Edit Job Application' : 'Track New Application'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Company */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
            <input
              type="text"
              placeholder="e.g. Google"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                errors.company ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
              }`}
            />
            {errors.company && <p className="mt-1 text-xs text-rose-500">{errors.company}</p>}
          </div>

          {/* Position */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Position *</label>
            <input
              type="text"
              placeholder="e.g. Frontend Engineer"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                errors.position ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
              }`}
            />
            {errors.position && <p className="mt-1 text-xs text-rose-500">{errors.position}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
            <input
              type="text"
              placeholder="e.g. Remote, San Francisco, CA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Salary Range</label>
            <input
              type="text"
              placeholder="e.g. $120,000 - $140,000"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Applied Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Applied Date *</label>
            <input
              type="date"
              value={formData.appliedDate}
              onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
              className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                errors.appliedDate ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
              }`}
            />
            {errors.appliedDate && <p className="mt-1 text-xs text-rose-500">{errors.appliedDate}</p>}
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Application Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>

        {/* Job URL */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Posting URL</label>
          <input
            type="url"
            placeholder="https://example.com/careers/job-123"
            value={formData.jobUrl}
            onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
            className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
              errors.jobUrl ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
            }`}
          />
          {errors.jobUrl && <p className="mt-1 text-xs text-rose-500">{errors.jobUrl}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notes & Details</label>
          <textarea
            rows={4}
            placeholder="Interview dates, recruiter contact details, key notes..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            type="button"
            onClick={() => navigate('#/applications')}
            className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            {isEdit ? 'Save Changes' : 'Add Application'}
          </button>
        </div>
      </form>
    </div>
  );
};