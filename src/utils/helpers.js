export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const validateUrl = (url) => {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const calculateStats = (applications = []) => {
  const stats = {
    total: applications.length,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    withdrawn: 0
  };

  applications.forEach((app) => {
    const statusKey = app.status ? app.status.toLowerCase() : "";
    if (stats.hasOwnProperty(statusKey)) {
      stats[statusKey]++;
    }
  });

  return stats;
};