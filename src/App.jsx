import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// Auth & Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import JobListing from './pages/Jobs/JobListing';
import SplashScreen from './components/Shared/SplashScreen';

// Dashboard Modules
import StudentDashboard from './pages/Dashboards/StudentDashboard';
import StudentResumeUpload from './pages/Dashboards/StudentResumeUpload';
import RecruiterDashboard from './pages/Dashboards/RecruiterDashboard';
import EligibilityChecker from './pages/Dashboards/EligibilityChecker';
import AdminDashboard from './pages/Dashboards/AdminDashboard';

// --- PROTECTED ROUTE COMPONENT ---
// This ensures only the right people can see the right pages
const ProtectedRoute = ({ children, allowedRole }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docSnap = await getDoc(doc(db, "users", currentUser.uid));
          if (docSnap.exists()) {
            setRole(docSnap.data().role);
          }
          setUser(currentUser);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <SplashScreen />;
  
  // If not logged in, send to login
  if (!user) return <Navigate to="/login" />;
  
  // If logged in but role doesn't match, send to home (prevents students from seeing admin/recruiter)
  if (allowedRole && role !== allowedRole) {
    console.warn(`Access denied. Expected: ${allowedRole}, but User is: ${role}`);
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  // Initial app splash screen timer
  useEffect(() => {
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
        {/* --- Public & Authentication Routes --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobListing />} />
        
        {/* --- Student Module --- */}
        <Route path="/dashboard/student" element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/student/upload" element={
          <ProtectedRoute allowedRole="student">
            <StudentResumeUpload />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/student/check-eligibility" element={
          <ProtectedRoute allowedRole="student">
            <EligibilityChecker />
          </ProtectedRoute>
        } />
        
        {/* --- Recruiter Module (FIXED: Duplicate Route Removed) --- */}
        <Route path="/dashboard/recruiter" element={
          <ProtectedRoute allowedRole="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        } />
        
        {/* --- Admin Module --- */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* --- Fallback for undefined routes --- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;