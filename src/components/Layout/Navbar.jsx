import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, LogOut, Layout, FileText, 
  Briefcase, Bell, Menu, X, ChevronDown 
} from 'lucide-react';
import logo from '../../assets/logo.png';

// Firebase
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await signOut(auth);
      navigate('/login');
    }
  };

  const getDashboardLink = () => {
    if (userRole === 'admin') return '/dashboard/admin';
    if (userRole === 'recruiter') return '/dashboard/recruiter';
    return '/dashboard/student';
  };

  return (
    <nav className="bg-[#004643] border-b border-white/10 sticky top-0 z-[500] w-full px-8 py-4 flex items-center h-20">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        
        {/* --- BRAND LOGO --- */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-xl font-black text-[#F0EDE5] tracking-tighter uppercase">
            PlacePro <span className="text-[#C87740]">AI</span>
          </span>
        </Link>

        {/* --- NAVIGATION LINKS --- */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/jobs" icon={<Briefcase size={16}/>} label="Job Board" />
          
          {/* Always show if logged in as student, or you can remove userRole check to show for everyone */}
          {user && userRole === 'student' && (
            <NavLink to="/dashboard/student/upload" icon={<FileText size={16}/>} label="Upload Resume" />
          )}
        </div>

        {/* --- AUTH SECTION --- */}
        <div className="flex items-center gap-6 shrink-0">
          {!user ? (
            <div className="flex items-center gap-8">
              {/* Wrapped Login in a Link with specific styles to prevent upward shifting */}
              <Link to="/login" className="text-[#F0EDE5] font-bold text-sm uppercase tracking-widest hover:text-[#C87740] transition-colors leading-none">
                Login
              </Link>
              <Link to="/register" className="bg-[#C87740] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#C87740]/20 active:scale-95 transition-all leading-none">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-white/5 border border-white/10 py-2 pl-4 pr-2 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-[#F0EDE5] uppercase tracking-widest leading-none">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-[8px] font-bold text-[#C87740] uppercase tracking-tighter mt-1 leading-none">
                    {userRole || "Member"}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#C87740] overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="pfp" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold uppercase text-sm">
                      {user.email?.charAt(0)}
                    </div>
                  )}
                </div>
                <ChevronDown size={14} className={`text-[#F0EDE5] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-20"
                    >
                      <div className="p-2 space-y-1">
                        <DropdownLink 
                          to={getDashboardLink()} 
                          icon={<Layout size={18}/>} 
                          label="Dashboard" 
                          onClick={() => setIsDropdownOpen(false)}
                        />
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl font-bold text-sm transition-all"
                        >
                          <LogOut size={18} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

// --- HELPER COMPONENTS ---

const NavLink = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center gap-2 text-[#F0EDE5]/70 font-bold text-[11px] uppercase tracking-[0.2em] hover:text-[#C87740] transition-colors h-full"
  >
    <span className="text-[#C87740]">{icon}</span> 
    <span>{label}</span>
  </Link>
);

const DropdownLink = ({ to, icon, label, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 text-[#004643] hover:bg-[#F0EDE5] rounded-2xl font-bold text-sm transition-all"
  >
    {icon} {label}
  </Link>
);

export default Navbar;