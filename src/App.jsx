import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth & Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import JobListing from './pages/Jobs/JobListing';
import SplashScreen from './components/Shared/SplashScreen';

// Dashboard Modules
import StudentDashboard from './pages/Dashboards/StudentDashboard';
import StudentResumeUpload from './pages/Dashboards/StudentResumeUpload';
import RecruiterJobPost from './pages/Dashboards/RecruiterJobPost';
import EligibilityChecker from './pages/Dashboards/EligibilityChecker';
import AdminDashboard from './pages/Dashboards/AdminDashboard';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simulate initialization of NLP tools like NLTK or spaCy [cite: 135]
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>
        {/* Public & Authentication [cite: 61, 68] */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobListing />} />
        
        {/* Student Module: Resume Analysis & Eligibility [cite: 26, 27] */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/student/upload" element={<StudentResumeUpload />} />
        <Route path="/dashboard/student/check-eligibility" element={<EligibilityChecker />} />
        
        {/* Recruiter Module: Job Management [cite: 25, 66] */}
        <Route path="/dashboard/recruiter" element={<div className="p-10 font-bold">Recruiter Overview</div>} />
        <Route path="/dashboard/recruiter/post-job" element={<RecruiterJobPost />} />
        
        {/* Admin Module: System Tracking & Auditing [cite: 53, 67] */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;