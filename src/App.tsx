import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Result from './pages/Result';
import Community from './pages/Community';
import Plans from './pages/Plans';
import Loading from './pages/Loading';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import MyCampaigns from './pages/MyCampaigns';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import SoftBackdrop from './components/SoftBackdrop';
import LenisScroll from './components/lenis';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // default to dark
  });

  const [campaigns, setCampaigns] = useState<any[]>(() => {
    const saved = localStorage.getItem('campaigns');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [];
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const saveCampaigns = (newCampaigns: any[]) => {
    setCampaigns(newCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(newCampaigns));
  };

  return (
    <>
      <SoftBackdrop />
      <LenisScroll />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout theme={theme} setTheme={setTheme} />}>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/community" element={<Community />} />
          <Route path="/auth" element={<Auth />} />
        </Route>

        {/* DASHBOARD ROUTES */}
        <Route element={<DashboardLayout theme={theme} setTheme={setTheme} />}>
          <Route path="/dashboard" element={<Dashboard campaigns={campaigns} />} />
          <Route path="/generate" element={<Generator campaigns={campaigns} onSaveCampaigns={saveCampaigns} />} />
          <Route path="/my-campaigns" element={<MyCampaigns campaigns={campaigns} onSaveCampaigns={saveCampaigns} />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/result/:projectID" element={<Result />} />
          <Route path="/loading" element={<Loading />} />
        </Route>

        {/* CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;