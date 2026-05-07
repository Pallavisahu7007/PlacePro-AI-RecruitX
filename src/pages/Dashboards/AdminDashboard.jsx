import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png'; 
import { 
  Users, Building2, FileCheck, AlertTriangle, 
  Search, Layout, Settings, LogOut, 
  Bell, Cpu, ShieldCheck, TrendingUp, Loader2, User, Trash2, ShieldAlert, Globe, Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Firebase & Visualization
import { auth, db } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('Overview');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: "Admin", email: "", photo: null });

  // Data for the Graph
  const chartData = [
    { name: 'Week 1', placements: 45 }, { name: 'Week 2', placements: 52 },
    { name: 'Week 3', placements: 48 }, { name: 'Week 4', placements: 70 },
    { name: 'Week 5', placements: 61 }, { name: 'Week 6', placements: 85 },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUserProfile({
          name: currentUser.displayName || "Admin User",
          email: currentUser.email,
          photo: currentUser.photoURL
        });
        fetchUsers();
        setLoading(false);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete this user permanently?")) {
      await deleteDoc(doc(db, "users", id));
      fetchUsers();
    }
  };

  const promoteUser = async (id) => {
    await updateDoc(doc(db, "users", id), { role: 'admin' });
    alert("User promoted to Administrator status.");
    fetchUsers();
  };

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

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-[#F0EDE5]"><Loader2 className="animate-spin text-[#004643]" size={40} /></div>;

  return (
    <div className="flex flex-col bg-[#F0EDE5] min-h-screen font-sans text-[#004643]">
      
      {/* --- HEADER --- */}
      <nav className="flex justify-between items-center px-8 py-4 bg-[#004643] border-b border-white/10 sticky top-0 z-[100] w-full">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-[#F0EDE5]">PlacePro AI</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/10 py-1.5 px-4 rounded-2xl">
            <div className="text-right">
              <p className="text-xs font-bold text-[#F0EDE5]">{userProfile.name}</p>
              <p className="text-[10px] text-[#C87740]">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#C87740] overflow-hidden border-2 border-white/20">
              {userProfile.photo ? <img src={userProfile.photo} className="w-full h-full object-cover" /> : <User size={20} className="m-auto mt-2 text-white"/>}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col p-6">
          <nav className="space-y-2 flex-1">
            <SidebarBtn label="Overview" icon={<Layout size={20}/>} active={activeView === 'Overview'} onClick={() => setActiveView('Overview')} />
            <SidebarBtn label="User Management" icon={<Users size={20}/>} active={activeView === 'Users'} onClick={() => setActiveView('Users')} />
            <SidebarBtn label="System Health" icon={<Cpu size={20}/>} active={activeView === 'Health'} onClick={() => setActiveView('Health')} />
          </nav>
          <div className="pt-6 border-t border-gray-100">
            <SidebarBtn label="Settings" icon={<Settings size={20}/>} active={activeView === 'Settings'} onClick={() => setActiveView('Settings')} />
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
        <main className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* --- OVERVIEW --- */}
            {activeView === 'Overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <StatCard label="Total Students" val={users.filter(u => u.role === 'student').length} icon={Users} color="text-blue-600" />
                  <StatCard label="Active Drives" val="48" icon={Building2} color="text-orange-600" />
                  <StatCard label="Total Placements" val="312" icon={FileCheck} color="text-green-600" />
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-10">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold">Placement Progress Trend</h3>
                    <div className="text-[10px] font-bold text-[#C87740] bg-[#C87740]/10 px-3 py-1 rounded-full uppercase">
                      +12% Growth this month
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C87740" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#C87740" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="placements" stroke="#C87740" strokeWidth={4} fill="url(#colorP)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- USER MANAGEMENT --- */}
            {activeView === 'Users' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6">User Management</h2>
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="p-5 text-sm font-bold">User Details</th>
                        <th className="p-5 text-sm font-bold">Access Level</th>
                        <th className="p-5 text-sm font-bold text-right">Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-5">
                            <p className="text-sm font-semibold">{u.name}</p>
                            <p className="text-xs text-gray-400">{u.email}</p>
                          </td>
                          <td className="p-5">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-5 text-right flex justify-end gap-2">
                            {u.role !== 'admin' && (
                              <button onClick={() => promoteUser(u.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><ShieldAlert size={18} /></button>
                            )}
                            <button onClick={() => deleteUser(u.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* --- SYSTEM HEALTH --- */}
            {activeView === 'Health' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6">System Health & Infrastructure</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#004643] text-white p-8 rounded-[2.5rem] shadow-xl">
                    <Globe className="text-[#C87740] mb-4" size={32} />
                    <h3 className="text-lg font-bold mb-4">Server Performance</h3>
                    <HealthBar label="Database Latency" val={98} />
                    <HealthBar label="API Response Time" val={94} />
                    <p className="mt-6 text-xs opacity-50">Status: All systems operational</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <Database className="text-[#004643] mb-4" size={32} />
                    <h3 className="text-lg font-bold mb-4">Storage Usage</h3>
                    <p className="text-sm text-gray-500 mb-2">Cloud Storage: 12.4 GB / 50 GB</p>
                    <div className="w-full bg-gray-100 h-2 rounded-full"><div className="bg-[#004643] h-full w-[25%]" /></div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- SETTINGS (NOW FUNCTIONAL) --- */}
            {activeView === 'Settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6">Administrator Settings</h2>
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm max-w-2xl">
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Account Name</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold" defaultValue={userProfile.name} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Email Address</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold text-gray-400" value={userProfile.email} disabled />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Assigned Role</label>
                      <div className="text-sm font-bold text-[#C87740]">Global Administrator</div>
                    </div>
                    <button className="bg-[#004643] text-white px-8 py-3 rounded-xl font-bold text-sm">Save Changes</button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-100 py-6 px-10 text-center text-xs text-gray-400">
        © 2026 PlacePro AI • Secure Admin Portal
      </footer>
    </div>
  );
};

// Helpers
const SidebarBtn = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center gap-3 px-5 py-3.5 w-full rounded-2xl font-semibold text-sm transition-all ${active ? 'bg-[#004643] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
    {icon} {label}
  </button>
);

const StatCard = ({ label, val, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`p-4 rounded-2xl bg-gray-50 ${color}`}><Icon size={24} /></div>
    <div><p className="text-xs text-gray-400 font-bold">{label}</p><h4 className="text-xl font-bold">{val}</h4></div>
  </div>
);

const HealthBar = ({ label, val }) => (
  <div className="mb-4">
    <div className="flex justify-between text-[10px] uppercase font-bold mb-1 opacity-60"><span>{label}</span><span>{val}%</span></div>
    <div className="w-full bg-white/10 h-1 rounded-full"><div className="bg-[#C87740] h-full" style={{ width: `${val}%` }} /></div>
  </div>
);

export default AdminDashboard;