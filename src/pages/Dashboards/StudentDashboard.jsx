import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Briefcase, FileCheck, Bell, 
  Search, Layout, Settings, LogOut, 
  ExternalLink, TrendingUp, Cpu, Calendar 
} from 'lucide-react';

const StudentDashboard = () => {
  const stats = [
    { label: "Applied Jobs", val: "12", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Shortlisted", val: "04", icon: FileCheck, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pending Tasks", val: "02", icon: Bell, color: "text-orange-600", bg: "bg-orange-50" }
  ];

  const jobs = [
    { title: "Full Stack Developer", company: "Google", match: "98%", logo: "G", date: "2d ago" },
    { title: "AI Research Intern", company: "NVIDIA", match: "92%", logo: "N", date: "5d ago" }
  ];

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Cpu size={20} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">PlacePro AI</span>
        </div>

        <nav className="space-y-1 flex-1">
          <SidebarLink icon={<Layout size={20}/>} label="Dashboard" active />
          <SidebarLink icon={<Briefcase size={20}/>} label="Jobs" />
          <SidebarLink icon={<Search size={20}/>} label="AI Search" />
          <SidebarLink icon={<Calendar size={20}/>} label="Interviews" />
          <SidebarLink icon={<User size={20}/>} label="Profile" />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <SidebarLink icon={<Settings size={20}/>} label="Settings" />
          <SidebarLink icon={<LogOut size={20}/>} label="Logout" color="text-red-500" />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-4 lg:p-10 overflow-y-auto">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Student Dashboard</h2>
            <p className="text-slate-500 font-medium">Welcome back, Om! Here’s your placement overview.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all w-64" 
                placeholder="Search jobs, skills..." 
              />
            </div>
            <button className="bg-white p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((s, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -4 }} 
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5"
            >
              <div className={`${s.bg} ${s.color} p-4 rounded-2xl`}>
                <s.icon size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                <h4 className="text-2xl font-black">{s.val}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase tracking-tight">AI Recommended Jobs</h3>
                <button className="text-blue-600 text-xs font-bold uppercase hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {jobs.map((job, i) => (
                  <div key={i} className="group p-5 border border-slate-100 rounded-2xl hover:border-blue-600 transition-all flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        {job.logo}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800">{job.title}</h4>
                        <p className="text-slate-400 text-xs font-bold">{job.company} • {job.date}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <div className="hidden md:block text-right">
                        <span className="text-[10px] font-black text-blue-600 uppercase">Match Score</span>
                        <p className="font-black text-lg">{job.match}</p>
                      </div>
                      <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black uppercase hover:bg-blue-600 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Panel */}
          <div className="space-y-8">
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <Cpu className="text-blue-500 mb-4 opacity-50" size={32} />
              <h3 className="text-lg font-black mb-2 uppercase tracking-tight">NLP Profile Strength</h3>
              <p className="text-slate-400 text-xs font-medium mb-6 leading-relaxed">Your resume is 85% optimized for current tech trends.</p>
              
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-6">
                <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="bg-blue-500 h-full" />
              </div>
              
              <button className="w-full py-3 bg-white/10 backdrop-blur-md rounded-xl font-bold text-xs uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all">
                Update Resume
              </button>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black mb-6 uppercase tracking-widest text-slate-400">Upcoming Interviews</h3>
              <div className="space-y-4">
                <InterviewItem date="28 Oct" company="Meta" time="10:30 AM" />
                <InterviewItem date="02 Nov" company="Microsoft" time="02:00 PM" />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Sub-components
const SidebarLink = ({ icon, label, active, color }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : `${color || 'text-slate-400'} hover:bg-slate-50 hover:text-blue-600`}`}>
    {icon}
    <span>{label}</span>
  </a>
);

const InterviewItem = ({ date, company, time }) => (
  <div className="flex gap-4 items-center">
    <div className="bg-slate-100 px-3 py-2 rounded-xl text-center min-w-[56px]">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">{date.split(' ')[1]}</p>
      <p className="text-lg font-black leading-none">{date.split(' ')[0]}</p>
    </div>
    <div>
      <h4 className="text-sm font-black text-slate-800">{company}</h4>
      <p className="text-xs text-slate-400 font-medium">{time}</p>
    </div>
    <ExternalLink size={16} className="ml-auto text-slate-300" />
  </div>
);

export default StudentDashboard;