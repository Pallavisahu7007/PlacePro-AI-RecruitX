import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import { 
  Cpu, Zap, ShieldCheck, GraduationCap, ChevronRight, 
  Search, BarChart3, Rocket, User, Building, ArrowRight, 
  Play, Sparkles, Calendar, Globe, Layers
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-[#0a0c10] min-h-screen font-sans text-slate-300 overflow-x-hidden">
      <Navbar />

<section className="relative pt-8 pb-20 lg:pt-16 lg:pb-32 overflow-hidden flex items-center min-h-[80vh]">
  {/* Ambient Deccan AI Glows */}
  <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0" />
  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -z-0" />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
      
      {/* Left Content: Broad & Dominant (8/12) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:w-8/12 text-left"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.2)]">
          <Sparkles size={14} className="animate-pulse" /> Next-Gen AI Recruitment
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-8 text-white">
          Find Your Dream Job <br />
          <span className="text-cyan-400">With AI Precision</span>
        </h1>

        <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-medium">
          The AI powered ecosystem for campus hiring. We bridge the gap between 
          top-tier talent and industry leaders using automated NLP screening.
        </p>

        <div className="flex flex-wrap gap-5">
          <Link to="/register">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)" }}
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl transition-all"
            >
              Get Started <ArrowRight size={18} />
            </motion.button>
          </Link>
          <button className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl font-black text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2">
            <Play size={18} fill="currentColor" className="text-blue-400" /> Watch Demo
          </button>
        </div>
      </motion.div>

      {/* Right Visual: Ultra-Compact & Glowing (4/12) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1 }}
        className="lg:w-4/12 hidden lg:block perspective-1000 relative group"
      >
        {/* Multi-layered Gradient Shadow (Bloom) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-indigo-500/20 to-cyan-400/40 blur-[50px] rounded-[3rem] -z-10 group-hover:blur-[70px] transition-all duration-700 opacity-90" />

        <div className="relative p-1.5 bg-gradient-to-tr from-white/15 to-transparent rounded-[2.5rem] shadow-2xl border border-white/10 backdrop-blur-md">
          <div className="bg-slate-900 rounded-[2rem] overflow-hidden border-2 border-slate-700 shadow-inner relative">
            
            {/* The GIF Container */}
            <div className="aspect-[4/5] overflow-hidden">
                <img 
                src="https://static01.nyt.com/images/2018/12/07/business/07hiring/07hiring-superJumbo-v2.gif" 
                className="w-full h-full object-cover opacity-80 mix-blend-screen transform scale-110"
                alt="AI Interface"
                />
            </div>
            
            {/* Scanline Deccan AI effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,4px_100%] pointer-events-none" />
          </div>
        </div>
      </motion.div>
      
    </div>
  </div>
</section>

      {/* --- NEW: EVENTS & HACKATHONS SECTION --- */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Live Events" subtitle="Upcoming placement drives and technical events" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <EventCard title="Google Cloud Drive" date="MAY 15" tag="Placements" />
            <EventCard title="Deccan Hack 2026" date="JUN 02" tag="Hackathon" />
            <EventCard title="Mock Interview Week" date="MAY 20" tag="Training" />
            <EventCard title="Microsoft Hiring" date="JUN 12" tag="Placements" />
          </div>
        </div>
      </section>

      {/* --- THE PROCESS: 3D STEP CARDS --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="The Process" subtitle="A simple, intelligent 6-step journey" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-20">
            {['Register', 'Profile', 'Upload', 'AI Screen', 'Apply', 'Hired'].map((step, i) => (
              <StepCard key={i} num={i + 1} title={step} active={i === 3} />
            ))}
          </div>
        </div>
      </section>

      {/* --- CAPABILITIES: STAYED SAME AS REQUESTED --- */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Capabilities" subtitle="Next-gen features for a high-impact experience" />
          <div className="grid md:grid-cols-3 gap-10 mt-20">
            <FeatureCard icon={<Cpu />} title="AI Screening" desc="Deep NLP parsing for skill extraction and job matching." />
            <FeatureCard icon={<ShieldCheck />} title="Smart Eligibility" desc="Automated checks for CGPA, branch, and technical filters." />
            <FeatureCard icon={<Zap />} title="Real-time Alerts" desc="Instant notifications for upcoming placement drives." />
            <FeatureCard icon={<BarChart3 />} title="Admin Analytics" desc="Detailed visibility over placement success rates." />
            <FeatureCard icon={<Building />} title="Recruiter Portal" desc="Efficient tools for companies to manage talent pipelines." />
            <FeatureCard icon={<Search />} title="Easy Search" desc="Quickly find the right candidates with smart filters." />
          </div>
        </div>
      </section>

      {/* --- NEW: GLOBAL REACH --- */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <SectionHeader title="Global Network" subtitle="Connected with 500+ global enterprises" left />
              <p className="mt-6 text-slate-400 text-lg leading-relaxed">
                Our platform doesn't just work locally. We have integrated recruiters from over 15 countries, 
                giving you access to international opportunities and global career growth.
              </p>
              <div className="flex gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">500+</div>
                  <div className="text-xs text-blue-500 uppercase tracking-widest mt-2">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">50k+</div>
                  <div className="text-xs text-blue-500 uppercase tracking-widest mt-2">Placed</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 p-8 bg-blue-600/10 rounded-[3rem] border border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
              <Globe className="w-full h-auto text-blue-500 opacity-50" size={300} />
            </div>
          </div>
        </div>
      </section>

      {/* --- USER ROLES: 3D CARDS --- */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <RoleCard icon={<GraduationCap />} role="Student" />
          <RoleCard icon={<Building />} role="Recruiter" />
          <RoleCard icon={<User />} role="Admin" />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <h3 className="text-2xl font-black text-blue-500 uppercase tracking-tighter">PlacePro AI</h3>
          <div className="flex gap-10 text-xs font-black text-slate-500 uppercase tracking-widest">
            <Link to="/jobs" className="hover:text-blue-400 transition-colors">Jobs</Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
          </div>
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">© 2026 RecruitX Module</p>
        </div>
      </footer>
    </div>
  );
};

// --- SUB COMPONENTS ---

const SectionHeader = ({ title, subtitle, left }) => (
  <div className={left ? "text-left" : "text-center"}>
    <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4">{title}</h2>
    <p className="text-slate-500 text-lg font-medium tracking-wide">{subtitle}</p>
    <div className={`h-1.5 w-20 bg-blue-600 ${left ? "" : "mx-auto"} mt-8 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]`} />
  </div>
);

const StepCard = ({ num, title, active }) => (
  <motion.div 
    whileHover={{ y: -10, rotateX: 5 }}
    className={`p-10 rounded-[2.5rem] border-2 transition-all cursor-default ${
      active ? 'bg-blue-600 border-blue-400 text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] scale-110 z-10' : 'bg-slate-900 border-white/5 text-slate-400 shadow-xl'
    }`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-xl shadow-md ${active ? 'bg-white text-blue-600' : 'bg-blue-500/20 text-blue-500'}`}>
      {num}
    </div>
    <h4 className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{title}</h4>
  </motion.div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -12, scale: 1.02 }}
    className="p-10 bg-slate-900/50 border border-white/5 rounded-[3rem] shadow-2xl hover:border-blue-500/30 transition-all relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform text-white">
      {React.cloneElement(icon, { size: 100 })}
    </div>
    <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </motion.div>
);

const EventCard = ({ title, date, tag }) => (
  <motion.div 
    whileHover={{ scale: 1.05, y: -5 }}
    className="p-6 bg-slate-900 border border-white/5 rounded-3xl group cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 text-[10px] font-black uppercase tracking-widest">{tag}</div>
      <Calendar size={18} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
    </div>
    <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
    <p className="text-xs text-slate-500 uppercase font-black tracking-widest">{date}</p>
  </motion.div>
);

const RoleCard = ({ icon, role }) => (
  <motion.div 
    whileHover={{ rotateY: 15, scale: 1.05, boxShadow: "0_30px_60px_rgba(0,0,0,0.5)" }}
    className="p-16 bg-slate-900 border border-white/5 rounded-[4rem] text-center shadow-2xl group cursor-pointer border-b-blue-600 border-b-4"
  >
    <div className="mb-8 flex justify-center text-blue-500 group-hover:scale-110 transition-transform group-hover:text-blue-400">
      {React.cloneElement(icon, { size: 60 })}
    </div>
    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{role}</h3>
    <div className="text-blue-500 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
      Enter Dashboard <ChevronRight size={14} />
    </div>
  </motion.div>
);

export default LandingPage;