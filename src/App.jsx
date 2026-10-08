import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddEditApplication from './pages/AddEditApplication';
import ApplicationDetails from './pages/ApplicationDetails';
import Settings from './pages/Settings';

export default function App() {
  return (
    <JobProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/add" element={<AddEditApplication />} />
            <Route path="/applications/edit/:id" element={<AddEditApplication />} />
            <Route path="/applications/:id" element={<ApplicationDetails />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </JobProvider>
  );
}