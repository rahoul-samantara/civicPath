import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar/Sidebar';
import TopBar from './components/common/TopBar/TopBar';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const AssistantPage = lazy(() => import('./pages/AssistantPage/AssistantPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage/CalendarPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));

import { useAuth } from './hooks/useAuth';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="app-layout">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <div className="app-main">
          <TopBar
            onMenuClick={() => setIsSidebarOpen(true)}
            userName={user?.displayName || 'Voter'}
            userPhoto={user?.photoURL || null}
          />
          
          <main className="page-content" id="main-content">
            <Suspense fallback={<div className="p-xl text-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/assistant" element={<AssistantPage />} />
                <Route path="/research" element={<CalendarPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<ProfilePage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
