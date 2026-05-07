import React, { useState, useEffect } from 'react'; // <--- The Fix
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, Briefcase, FileCheck, Bell, Search, Layout, 
  Settings, LogOut, FileUp, Cpu, Calendar, BookOpen, 
  Star, Loader2, ArrowUpRight 
} from 'lucide-react';

// Assets & Firebase
import logo from '../../assets/logo.png'; 
import { auth, db } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('Overview');
  const [loading, setLoading] = useState(true);

  const [userProfile, setUserProfile] = useState({
    name: "Student",
    email: "",
    photo: null,
    batch: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // 1. Capture Google Auth Data
        const googleName = currentUser.displayName;
        const googleEmail = currentUser.email;
        const googlePhoto = currentUser.photoURL;

        try {
          // 2. Fetch Firestore Data
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          
          if (userDoc.exists()) {
            const dbData = userDoc.data();
            setUserProfile({
              name: dbData.name || googleName || "Student User",
              email: dbData.email || googleEmail,
              photo: googlePhoto, 
              batch: dbData.batch || "2026 Graduating"
            });
          } else {
            setUserProfile({
              name: googleName || "Student User",
              email: googleEmail,
              photo: googlePhoto,
              batch: "2026 Graduating"
            });
          }
        } catch (err) {
          console.error("Firestore fetch failed:", err);
          // Fallback to Google data if Firestore fails
          setUserProfile({
            name: googleName || "Student User",
            email: googleEmail,
            photo: googlePhoto
          });
        }
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  
  // ... rest of your component

const handleLogout = async () => {
  // Show the confirmation dialog
  const confirmLogout = window.confirm("Are you sure you want to log out of RecruitX?");

  if (confirmLogout) {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Something went wrong. Please try again.");
    }
  }
  // If they click 'Cancel', nothing happens and they stay on the dashboard
};

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F0EDE5]">
        <Loader2 className="animate-spin text-[#004643]" size={40} />
      </div>
    );
  }

  const stats = [
    { label: "Applied Jobs", val: "12", icon: Briefcase, color: "text-[#004643]", bg: "bg-[#004643]/10" },
    { label: "Shortlisted", val: "04", icon: FileCheck, color: "text-[#C87740]", bg: "bg-[#C87740]/10" },
    { label: "AI Match Rate", val: "88%", icon: Star, color: "text-[#004643]", bg: "bg-[#004643]/10" }
  ];

  const jobs = [
    { title: "Full Stack Developer", company: "Google India", match: "98%", logo: "G", date: "2d ago" },
    { title: "AI Research Intern", company: "NVIDIA", match: "92%", logo: "N", date: "5d ago" },
    { title: "Systems Engineer", company: "Microsoft", match: "85%", logo: "M", date: "1w ago" }
  ];

  return (
    <div className="flex flex-col bg-[#F0EDE5] min-h-screen font-sans text-[#004643]">
      
      {/* --- HEADER --- */}
      <nav className="flex justify-between items-center px-8 py-4 bg-[#004643] border-b border-white/10 sticky top-0 z-[100] w-full">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="PlacePro AI Logo" className="h-10 w-auto" />
          <span className="text-xl font-black text-[#F0EDE5] tracking-tighter uppercase">
            PlacePro <span className="text-[#C87740]">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 py-1.5 pl-4 pr-1.5 rounded-2xl backdrop-blur-md">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black text-[#F0EDE5] uppercase tracking-widest">{userProfile.name}</span>
              <span className="text-[8px] font-bold text-[#C87740] uppercase tracking-tighter mt-1">Student Dashboard</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#C87740] overflow-hidden border-2 border-white/20 shadow-lg">
              {userProfile.photo ? (
                <img src={userProfile.photo} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white"><User size={20}/></div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-[#004643]/5 hidden lg:flex flex-col p-6 sticky top-[73px] h-[calc(100vh-73px)]">
          <nav className="space-y-1 flex-1">
            <button onClick={() => setActiveView('Overview')} className="w-full text-left">
              <SidebarLink label="Overview" icon={<Layout size={20}/>} active={activeView === 'Overview'} />
            </button>
            <Link to="/jobs" className="w-full text-left">
              <SidebarLink label="Job Board" icon={<Briefcase size={20}/>} />
            </Link>
            <Link to="/dashboard/student/upload" className="w-full text-left">
              <SidebarLink label="Resume Hub" icon={<FileUp size={20}/>} />
            </Link>
            <button onClick={() => setActiveView('Schedules')} className="w-full text-left">
              <SidebarLink label="Schedules" icon={<Calendar size={20}/>} active={activeView === 'Schedules'} />
            </button>
            <button onClick={() => setActiveView('Learning')} className="w-full text-left">
              <SidebarLink label="Learning" icon={<BookOpen size={20}/>} active={activeView === 'Learning'} />
            </button>
          </nav>
          <div className="mt-auto pt-6 border-t border-[#004643]/5">
            <button onClick={() => setActiveView('Settings')} className="w-full text-left">
              <SidebarLink label="Settings" icon={<Settings size={20}/>} active={activeView === 'Settings'} />
            </button>
            <button 
  onClick={handleLogout} 
  className="flex items-center gap-3 px-5 py-3.5 w-full text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-all active:scale-95"
>
  <LogOut size={20}/> 
  <span>Logout</span>
</button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {activeView === 'Overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase">Portal Overview</h2>
                    <p className="text-[#004643]/60 font-bold uppercase text-[10px] tracking-widest">
                      Welcome back, {userProfile.name.split(' ')[0]}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#004643]/40" size={16} />
                      <input className="bg-white border border-[#004643]/10 rounded-2xl pl-10 pr-4 py-2.5 text-sm outline-none w-64 shadow-sm" placeholder="Search opportunities..." />
                    </div>
                    <button className="bg-white p-2.5 rounded-2xl border border-[#004643]/10 text-[#004643] relative shadow-sm">
                      <Bell size={20} />
                      <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#C87740] rounded-full"></span>
                    </button>
                  </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border-2 border-[#004643]/5 shadow-sm flex items-center gap-5">
                      <div className={`${s.bg} ${s.color} p-4 rounded-2xl`}><s.icon size={24} /></div>
                      <div>
                        <p className="text-[#004643]/40 text-[10px] font-black uppercase tracking-widest">{s.label}</p>
                        <h4 className="text-2xl font-black">{s.val}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-[2.5rem] border-2 border-[#004643]/5 shadow-sm">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black uppercase tracking-tighter">AI Recommended Drives</h3>
                        <Link to="/jobs" className="text-[#C87740] text-[10px] font-black uppercase tracking-widest hover:underline">View All</Link>
                      </div>
                      <div className="space-y-4">
                        {jobs.map((job, i) => (
                          <div key={i} className="group p-6 border border-[#004643]/5 rounded-3xl hover:border-[#C87740]/40 transition-all flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                              <div className="w-14 h-14 bg-[#004643] rounded-2xl flex items-center justify-center text-[#F0EDE5] font-black text-xl">{job.logo}</div>
                              <div>
                                <h4 className="font-black text-lg">{job.title}</h4>
                                <p className="text-[#004643]/50 text-[10px] font-black uppercase tracking-widest">{job.company} • {job.date}</p>
                              </div>
                            </div>
                            <Link to="/jobs" className="bg-[#004643] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#C87740]">Apply</Link>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                  <div className="space-y-8">
                    <section className="bg-[#004643] p-8 rounded-[2.5rem] text-[#F0EDE5] shadow-xl">
                      <Cpu className="text-[#C87740] mb-4" size={32} />
                      <h3 className="text-xl font-black mb-2 uppercase tracking-tight">AI Matching</h3>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-4">
                        <div className="bg-[#C87740] h-full w-[85%]" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-6">Profile strength: 85%</p>
                      <button onClick={() => setActiveView('Settings')} className="w-full py-4 bg-[#C87740] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em]">Optimize Profile</button>
                    </section>
                  </div>
                </div>
              </motion.div>
            )}

            {(activeView === 'Schedules' || activeView === 'Learning') && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#004643]/5 text-[#004643]/20 mb-8">
                  {activeView === 'Schedules' ? <Calendar size={48} /> : <BookOpen size={48} />}
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">No {activeView} Yet</h3>
                <p className="max-w-xs text-[#004643]/60 font-bold uppercase text-[10px] tracking-[0.3em] leading-relaxed mb-8">
                  Your journey at RecruitX is just beginning. Explore our latest opportunities to populate your feed.
                </p>
                <Link 
                  to="/jobs" 
                  className="flex items-center gap-3 bg-[#004643] text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:shadow-[0_10px_30px_rgba(0,70,67,0.3)] transition-all active:scale-95"
                >
                  Explore Job Board <ArrowUpRight size={18} />
                </Link>
              </motion.div>
            )}

            {activeView === 'Settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl">
                <h2 className="text-3xl font-black uppercase mb-8">Personal Records</h2>
                <div className="bg-white rounded-[3rem] border-2 border-[#004643]/5 p-12 space-y-10 shadow-sm">
                   <div className="flex items-center gap-6 pb-10 border-b border-[#004643]/5">
                      <div className="w-24 h-24 rounded-3xl bg-[#004643] overflow-hidden border-4 border-[#F0EDE5] shadow-xl">
                        {userProfile.photo && <img src={userProfile.photo} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter">{userProfile.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#004643]/40 mt-1">{userProfile.email}</p>
                      </div>
                   </div>
                   <div className="grid md:grid-cols-2 gap-10">
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#004643]/40 block mb-3">Verification ID</label>
                        <div className="w-full bg-[#F0EDE5] rounded-2xl px-6 py-4 font-bold text-sm tracking-tight opacity-50">#RECRUITX-{auth.currentUser?.uid.slice(0, 8).toUpperCase()}</div>
                      </div>
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#004643]/40 block mb-3">Current Status</label>
                        <div className="w-full bg-[#F0EDE5] rounded-2xl px-6 py-4 font-bold text-sm tracking-tight text-[#004643]">Actively Seeking Roles</div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label, active, color }) => (
  <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all cursor-pointer ${active ? 'bg-[#004643] text-[#F0EDE5] shadow-xl' : `${color || 'text-[#004643]/40'} hover:bg-[#F0EDE5] hover:text-[#004643]`}`}>
    {icon}
    <span>{label}</span>
  </div>
);

export default StudentDashboard;