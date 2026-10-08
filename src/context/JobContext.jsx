import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialJobs } from '../data/sampleJobs';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('jobApplications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialJobs;
      }
    }
    return initialJobs;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addApplication = (appData) => {
    const newApp = {
      ...appData,
      id: Date.now().toString(),
      appliedDate: appData.appliedDate || new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const updateApplication = (id, updatedData) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, ...updatedData } : app));
  };

  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const getApplicationById = (id) => {
    return applications.find(app => app.id === id);
  };

  const clearAllApplications = () => {
    setApplications([]);
  };

  const importApplications = (newData) => {
    if (Array.isArray(newData)) {
      setApplications(newData);
      return true;
    }
    return false;
  };

  return (
    <JobContext.Provider value={{
      applications,
      addApplication,
      updateApplication,
      deleteApplication,
      getApplicationById,
      clearAllApplications,
      importApplications,
      theme,
      setTheme
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);