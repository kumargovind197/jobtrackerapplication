const STORAGE_KEY = "jobApplications";
const THEME_KEY = "jobTrackerTheme";

export const getStoredApplications = (fallbackData = []) => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackData));
      return fallbackData;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading LocalStorage applications:", error);
    return fallbackData;
  }
};

export const saveStoredApplications = (applications) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error("Error saving applications to LocalStorage:", error);
  }
};

export const getStoredTheme = () => {
  return localStorage.getItem(THEME_KEY) || "light";
};

export const saveStoredTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};