import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png'; 
import { 
  PlusCircle, CheckCircle, Layout, Briefcase, 
  Users, Settings, LogOut, Search, Bell, 
  User, Loader2, IndianRupee, MapPin, GraduationCap,
  Building, Globe, Phone, Mail, TrendingUp, BarChart3, Trash2, Edit3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Firebase & Visualization
import { auth, db } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { 
  collection, addDoc, getDocs, query, where, 
  serverTimestamp, updateDoc, doc, deleteDoc 
} from 'firebase/firestore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('Overview');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [myJobs, setMyJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null); // Track if we are updating
  
  const [userProfile, setUserProfile] = useState({ 
    name: "Recruiter", 
    email: "", 
    photo: null, 
    company: "RecruitX Partner", 
    website: "www.recruitx.ai",
    phone: "+91 98765 43210"
  });

  const trendData = [
    { name: 'Mon', apps: 12 }, { name: 'Tue', apps: 18 },
    { name: 'Wed', apps: 15 }, { name: 'Thu', apps: 25 },
    { name: 'Fri', apps: 32 }, { name: 'Sat', apps: 10 },
    { name: 'Sun', apps: 5 },
  ];

  const [formData, setFormData] = useState({
    title: '', location: '', package: '', minCgpa: '', requiredSkills: '', description: '', companyWebsite: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserProfile(prev => ({
          ...prev,
          name: user.displayName || "Hiring Manager",
          email: user.email,
          photo: user.photoURL
        }));
        fetchMyJobs(user.uid);
        setLoading(false);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchMyJobs = async (uid) => {
    const q = query(collection(db, "jobs"), where("recruiterId", "==", uid));
    const snap = await getDocs(q);
    setMyJobs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // --- FEATURE: POST OR UPDATE JOB ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      if (editingJobId) {
        // Update existing
        const jobRef = doc(db, "jobs", editingJobId);
        await updateDoc(jobRef, {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        alert("Job Updated Successfully!");
      } else {
        // Create new
        await addDoc(collection(db, "jobs"), {
          ...formData,
          recruiterId: auth.currentUser.uid,
          companyName: userProfile.company,
          postedAt: serverTimestamp(),
        });
        alert("Job Published Successfully!");
      }
      
      setEditingJobId(null);
      setFormData({ title: '', location: '', package: '', minCgpa: '', requiredSkills: '', description: '', companyWebsite: '' });
      fetchMyJobs(auth.currentUser.uid);
      setActiveView('Listings');
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setPosting(false);
    }
  };

  // --- FEATURE: DELETE JOB ---
  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await deleteDoc(doc(db, "jobs", jobId));
      fetchMyJobs(auth.currentUser.uid);
    }
  };

  // --- FEATURE: EDIT JOB (SETUP) ---
  const handleEditSetup = (job) => {
    setEditingJobId(job.id);
    setFormData({
      title: job.title,
      location: job.location,
      package: job.package,
      minCgpa: job.minCgpa,
      requiredSkills: job.requiredSkills,
      description: job.description,
      companyWebsite: job.companyWebsite || ''
    });
    setActiveView('PostJob');
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out of RecruitX?");
    if (confirmLogout) {
      await signOut(auth);
      navigate('/login');
    }
  };

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-[#F0EDE5]"><Loader2 className="animate-spin text-[#004643]" size={40} /></div>;

  return (
    <div className="flex flex-col bg-[#F0EDE5] min-h-screen font-sans text-[#004643]">
      
      {/* --- HEADER --- */}
      <nav className="flex justify-between items-center px-8 py-4 bg-[#004643] border-b border-white/10 sticky top-0 z-[100] w-full">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-[#F0EDE5]">PlacePro <span className="text-[#C87740]">AI</span></span>
        </div>
        <div className="flex items-center gap-4 text-[#F0EDE5]">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold">{userProfile.name}</p>
            <p className="text-[10px] text-[#C87740] font-bold uppercase">{userProfile.company}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#C87740] overflow-hidden border-2 border-white/20">
            {userProfile.photo ? <img src={userProfile.photo} className="w-full h-full object-cover" /> : <User size={20} className="m-auto mt-2"/>}
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col p-6">
          <nav className="space-y-2 flex-1">
            <SidebarBtn label="Dashboard" icon={<Layout size={20}/>} active={activeView === 'Overview'} onClick={() => setActiveView('Overview')} />
            <SidebarBtn label={editingJobId ? "Editing Job" : "Post a Job"} icon={<PlusCircle size={20}/>} active={activeView === 'PostJob'} onClick={() => setActiveView('PostJob')} />
            <SidebarBtn label="My Listings" icon={<Briefcase size={20}/>} active={activeView === 'Listings'} onClick={() => setActiveView('Listings')} />
            <SidebarBtn label="Applicants" icon={<Users size={20}/>} active={activeView === 'Applicants'} onClick={() => setActiveView('Applicants')} />
          </nav>
          <div className="pt-6 border-t border-gray-100">
            <SidebarBtn label="Settings" icon={<Settings size={20}/>} active={activeView === 'Settings'} onClick={() => setActiveView('Settings')} />
            <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-3.5 w-full text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-all active:scale-95">
              <LogOut size={20}/> <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* --- OVERVIEW --- */}
            {activeView === 'Overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6">Hiring Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <StatCard label="Active Roles" val={myJobs.length} icon={Briefcase} color="text-blue-600" />
                  <StatCard label="New Applications" val="142" icon={Users} color="text-orange-600" />
                  <StatCard label="Hiring Rate" val="82%" icon={TrendingUp} color="text-green-600" />
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold">Applicant Flow Trend</h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <BarChart3 size={14} /> +15% more than last week
                    </div>
                  </div>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C87740" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#C87740" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <Tooltip contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)'}} />
                        <Area type="monotone" dataKey="apps" stroke="#C87740" strokeWidth={3} fill="url(#colorApps)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- MY LISTINGS (With Edit/Delete) --- */}
            {activeView === 'Listings' && (
              <motion.div key="listings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-6">
                   <h2 className="text-2xl font-bold">Your Active Postings</h2>
                   <button onClick={() => { setEditingJobId(null); setActiveView('PostJob'); }} className="text-[#C87740] font-bold text-sm">+ Add Another</button>
                </div>
                <div className="grid gap-4">
                  {myJobs.length > 0 ? myJobs.map(job => {
                    const logoUrl = job.companyWebsite ? `https://www.google.com/s2/favicons?domain=${job.companyWebsite}&sz=128` : null;
                    return (
                    <div key={job.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#004643] text-[#F0EDE5] rounded-2xl flex items-center justify-center font-bold overflow-hidden shadow-lg p-2 bg-white">
                          {logoUrl ? <img src={logoUrl} className="w-full h-full object-contain" /> : job.title.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{job.title}</h4>
                          <p className="text-sm text-gray-400">{job.location} • {job.package}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleEditSetup(job)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18}/></button>
                        <button onClick={() => handleDeleteJob(job.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                      </div>
                    </div>
                  )}) : <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-gray-400">No jobs posted yet.</div>}
                </div>
              </motion.div>
            )}

            {/* --- SETTINGS --- */}
            {activeView === 'Settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6">Business Profile</h2>
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 max-w-4xl shadow-sm">
                   <div className="grid md:grid-cols-2 gap-8 mb-10">
                      <div className="space-y-6">
                         <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest">General Info</h3>
                         <FormInput label="Company Name" val={userProfile.company} icon={<Building size={16}/>} disabled />
                         <FormInput label="Corporate Website" val={userProfile.website} icon={<Globe size={16}/>} disabled />
                      </div>
                      <div className="space-y-6">
                         <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest">Direct Contact</h3>
                         <FormInput label="Business Email" val={userProfile.email} icon={<Mail size={16}/>} disabled />
                         <FormInput label="Phone Number" val={userProfile.phone} icon={<Phone size={16}/>} disabled />
                      </div>
                   </div>
                   <button className="w-full bg-[#004643] text-white py-4 rounded-2xl font-bold">Update Profile (Coming Soon)</button>
                </div>
              </motion.div>
            )}

            {/* --- POST/EDIT JOB FORM --- */}
            {activeView === 'PostJob' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="max-w-4xl bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-10">{editingJobId ? "Edit Job Posting" : "Create Job Posting"}</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormInput label="Job Title" value={formData.title} placeholder="e.g. Frontend Developer" icon={<Briefcase size={16}/>} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                      <FormInput label="Location" value={formData.location} placeholder="e.g. Remote / Bangalore" icon={<MapPin size={16}/>} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                      <FormInput label="Annual Package" value={formData.package} placeholder="e.g. 12 LPA" icon={<IndianRupee size={16}/>} onChange={(e) => setFormData({...formData, package: e.target.value})} />
                      <FormInput label="Minimum CGPA" value={formData.minCgpa} placeholder="e.g. 8.0" icon={<GraduationCap size={16}/>} onChange={(e) => setFormData({...formData, minCgpa: e.target.value})} />
                      <FormInput label="Company Website" value={formData.companyWebsite} placeholder="e.g. apple.com" icon={<Globe size={16}/>} onChange={(e) => setFormData({...formData, companyWebsite: e.target.value})} />
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Required Skills</label>
                        <input type="text" value={formData.requiredSkills} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#C87740]" placeholder="React, Firebase..." onChange={(e) => setFormData({...formData, requiredSkills: e.target.value})} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Job Description</label>
                        <textarea rows="4" value={formData.description} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#C87740]" placeholder="Details..." onChange={(e) => setFormData({...formData, description: e.target.value})} />
                      </div>
                      <button disabled={posting} type="submit" className="md:col-span-2 bg-[#C87740] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg">
                        {posting ? <Loader2 className="animate-spin" size={20}/> : (editingJobId ? "Update Job" : "Publish Requirement")}
                      </button>
                    </form>
                  </div>
               </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// --- HELPERS ---
const SidebarBtn = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center gap-3 px-5 py-3.5 w-full rounded-2xl font-bold text-sm transition-all ${active ? 'bg-[#004643] text-white shadow-md shadow-[#004643]/20' : 'text-gray-400 hover:bg-gray-50'}`}>
    {icon} {label}
  </button>
);

const FormInput = ({ label, placeholder, icon, onChange, value, val, disabled }) => (
  <div>
    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">{icon}</div>
      <input type="text" disabled={disabled} required={!disabled} onChange={onChange} value={value || val || ""} placeholder={placeholder} className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#C87740] font-medium text-sm disabled:opacity-60" />
    </div>
  </div>
);

const StatCard = ({ label, val, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`p-4 rounded-2xl bg-gray-50 ${color}`}><Icon size={24} /></div>
    <div><p className="text-xs text-gray-400 font-bold uppercase">{label}</p><h4 className="text-xl font-black">{val}</h4></div>
  </div>
);

export default RecruiterDashboard;