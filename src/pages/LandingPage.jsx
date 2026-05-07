import React, { useState, useEffect } from 'react'; // Added hooks
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import logo from '../assets/logo.png'; 

// Firebase Imports
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { 
  Cpu, Zap, ShieldCheck, GraduationCap, ChevronRight, 
  Search, BarChart3, Rocket, User, Building, ArrowRight, ArrowUpRight,
  Layout, Workflow, Sparkles, FileUp, Globe, Mail, Link as LinkIcon,
  Briefcase, PieChart, Award, Database
} from 'lucide-react';

const LandingPage = () => {
  // --- 1. AUTH STATE LOGIC ---
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-[#F0EDE5] min-h-screen font-sans text-[#004643] overflow-x-hidden relative">
      <Navbar />

      {/* --- FLOATING 3D RESUME WIDGET --- */}
      <Link to="/dashboard/student/upload">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 bg-[#004643] text-[#F0EDE5] p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,70,67,0.4)] cursor-pointer border-2 border-[#F0EDE5] flex flex-col items-center gap-2 group"
        >
          <FileUp size={32} className="group-hover:animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Upload</span>
        </motion.div>
      </Link>

      {/* --- HERO SECTION: VIEWPORT LOCKED 3D --- */}
 <section className="relative h-[95vh] flex items-center overflow-hidden bg-[#F0EDE5]">
  {/* --- ENHANCED BACKGROUND GRID --- */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.3]" 
    style={{ 
      backgroundImage: `
        linear-gradient(#004643 1.5px, transparent 1.5px), 
        linear-gradient(90deg, #004643 1.5px, transparent 1.5px)
      `, 
      backgroundSize: '60px 60px',
      maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
    }} 
  />

  <div className="absolute top-20 left-10 w-72 h-72 bg-[#004643]/10 rounded-full blur-[100px] animate-pulse" />
  <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#004643]/15 rounded-full blur-[120px]" />

  <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
      
      {/* Left Content */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="lg:w-1/2 text-left space-y-8"
      >
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-[#004643] text-[#F0EDE5] rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(0,70,67,0.3)] border border-[#F0EDE5]/20"
        >
          <Sparkles size={14} className="text-yellow-400" /> PlacePro AI RecruitX
        </motion.div>
        
        <h1 className="text-6xl lg:text-6xl font-black tracking-tighter leading-[0.9] text-[#004643]">
          Find Your Dream Job <br />
          
          <motion.span 
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="inline-block mt-4 pb-2 text-7xl lg:text-8xl bg-gradient-to-r from-[#2E1F26] via-[#C87740] to-[#2E1F26] bg-clip-text text-transparent bg-clip-text bg-[length:200%_auto] bg-clip-text drop-shadow-[0_10px_15px_rgba(46,31,38,0.2)] font-black tracking-tighter"
          >
            With AI Precision
          </motion.span>
        </h1>

        <p className="text-xl text-[#004643]/70 max-w-lg leading-relaxed font-medium">
          We bridge the gap between undergraduate talent and industry leaders using automated NLP screening.
        </p>

        <div className="flex flex-wrap gap-5">
          {/* --- CONDITIONALLY RENDERED BUTTON --- */}
          {!user && (
            <Link to="/register">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0, 70, 67, 0.4)" }}
                className="px-12 py-5 bg-[#004643] text-[#F0EDE5] rounded-2xl font-black text-sm flex items-center gap-3 transition-all border border-[#F0EDE5]/10 shadow-[0_15px_30px_rgba(0,70,67,0.3)]"
              >
                Get Started <ArrowRight size={18} />
              </motion.button>
            </Link>
          )}

          <Link to="/jobs">
            <button className="px-12 py-5 bg-white/50 backdrop-blur-sm border-2 border-[#004643] rounded-2xl font-black text-sm text-[#004643] hover:bg-[#004643] hover:text-[#F0EDE5] transition-all shadow-md">
              Explore Positions
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Right Visual */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:w-5/12 relative flex justify-center items-center"
      >
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full max-w-[650px] bg-white p-2 rounded-[3.5rem] shadow-[0_60px_120px_rgba(0,40,38,0.5)] border-3 border-[#004643]"
        >
          <div className="rounded-[3rem] overflow-hidden border-5 border-[#004643] shadow-[inset_0_4px_20px_rgba(0,0,0,0.1)] relative aspect-square bg-[#004643]/5">
            <img 
              src="https://static01.nyt.com/images/2018/12/07/business/07hiring/07hiring-superJumbo-v2.gif" 
              className="w-full h-full object-cover scale-110"
              alt="AI Recruitment Interface"
            />
          </div>

          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -left-6 p-4 px-6 bg-[#00A19B]/60 backdrop-blur-lg text-white rounded-2xl shadow-[0_20px_40px_rgba(200,119,64,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)] flex items-center gap-3 border border-white/30"
          >
            <ShieldCheck size={20} className="text-white drop-shadow-md" />
            <span className="text-xs font-black uppercase tracking-[0.15em] drop-shadow-md">
              AI Verified
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>
{/* --- PLATFORM FEATURES: 3D CARDS --- */}
 <section className="relative py-24 bg-[#F0EDE5] overflow-hidden">
  {/* Subtly faded background grid for technical depth */}
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
    style={{ backgroundImage: `linear-gradient(#004643 1px, transparent 1px), linear-gradient(90deg, #004643 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
  />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <SectionHeader 
      title="Platform Features" 
      subtitle="Cutting-edge NLP technology for campus recruitment" 
      className="text-[#004643]"
    />
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
      <FeatureCard 
        icon={<Cpu size={32} />} 
        title="Neural Screening" 
        desc="LLM-based context parsing that understands project depth beyond keywords." 
      />
      <FeatureCard 
        icon={<ShieldCheck size={32} />} 
        title="Smart Eligibility" 
        desc="Real-time validation of branch and academic criteria for instant shortlisting." 
      />
      <FeatureCard 
        icon={<Zap size={32} />} 
        title="Pulse Alerts" 
        desc="Instant notifications for new job postings and real-time slot booking updates." 
      />
      <FeatureCard 
        icon={<Layout size={32} />} 
        title="SaaS Dashboard" 
        desc="Modern high-contrast UI for managing enterprise recruitment at scale." 
      />
      <FeatureCard 
        icon={<Database size={32} />} 
        title="Verified Sync" 
        desc="Seamless integration with university ERPs for verified CGPA and record matching." 
      />
      <FeatureCard 
        icon={<Workflow size={32} />} 
        title="NLP Pipeline" 
        desc="Automated ranking of candidates based on industry-specific semantic scoring." 
      />
    </div>
  </div>
</section>
  {/* --- STEPS: VERTICAL ROADMAP --- */}
<section className="relative py-10 bg-[#F0EDE5] overflow-hidden">
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
    style={{ backgroundImage: `linear-gradient(#004643 1px, transparent 1px), linear-gradient(90deg, #004643 1px, transparent 1px)`, backgroundSize: '60px 60px' }} 
  />

  <div className="max-w-5xl mx-auto px-6 relative z-10">
    <SectionHeader 
      title="The Steps" 
      subtitle="Your career roadmap from profile to offer" 
      className="text-[#004643]"
    />
    
    {/* Reduced space-y from 24 to 8 for a closer, tighter roadmap flow */}
    <div className="mt-16 space-y-8 relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#004643] via-[#C87740] to-transparent -translate-x-1/2 hidden md:block opacity-20" />
      
      <VerticalStep num="1" title="Academic Sync" desc="Connect your university ID and verified CGPA records." side="left" icon={<User size={24} />} />
      <VerticalStep num="2" title="Skill Mapping" desc="AI-driven analysis of your GitHub and portfolio." side="right" icon={<PieChart size={24} />} />
      <VerticalStep num="3" title="NLP Screening" desc="Technical verification score based on job criteria." side="left" icon={<ShieldCheck size={24} />} />
      <VerticalStep num="4" title="Final Hired" desc="Receive direct scheduling links for HR rounds." side="right" icon={<Award size={24} />} />
    </div>
  </div>
</section>
  {/* --- USER PORTALS: CENTERED 3D --- */}
<section className="relative py-24 bg-[#004643] overflow-hidden">
  {/* Background glow effects for 3D depth */}
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C87740]/10 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

  <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
    <SectionHeader 
      title="Select Portal" 
      subtitle="Access your personalized enterprise dashboard" 
      white 
    />
    
    <div className="grid md:grid-cols-3 gap-10 mt-24 max-w-6xl mx-auto">
  <Link to="/register" className="group">
    <RoleCard 
      icon={<GraduationCap size={40} />} 
      role="Student" 
      desc="Access placement drives & mock tests." 
    />
  </Link>

  <Link to="/register" className="group">
    <RoleCard 
      icon={<Building size={40} />} 
      role="Recruiter" 
      desc="Manage job postings & NLP screening." 
    />
  </Link>

  <Link to="/register" className="group">
    <RoleCard 
      icon={<User size={40} />} 
      role="TPO Admin" 
      desc="University-wide analytics & data sync." 
    />
  </Link>
</div>
  </div>
</section>
      {/* --- JOB OPPORTUNITIES: 3D GRID --- */}
<section className="relative py-24 bg-[#F0EDE5] overflow-hidden">
  {/* Subtly faded background grid */}
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
    style={{ backgroundImage: `linear-gradient(#004643 1px, transparent 1px), linear-gradient(90deg, #004643 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
  />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <SectionHeader 
      title="Job Opportunities" 
      subtitle="Direct placement drives for the 2026 Batch" 
      className="text-[#004643]"
    />
     <Link to="/jobs">
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
      <EnhancedJobCard title="Software Engineer" company="Google India" salary="15 LPA" icon={<Cpu size={28} />} />
      <EnhancedJobCard title="UI/UX Designer" company="Adobe" salary="20 LPA" icon={<Sparkles size={28} />} />
      <EnhancedJobCard title="Data Architect" company="Microsoft" salary="5 LPA" icon={<Database size={28} />} />
      <EnhancedJobCard title="Systems Lead" company="TCS Ninja" salary="12 LPA" icon={<Zap size={28} />} />
    </div></Link>

    {/* --- NEW VIEW ALL SECTION --- */}
    <div className="mt-20 flex justify-center">
      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 px-10 py-5 bg-[#004643] text-[#F0EDE5] rounded-full font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(0,70,67,0.3)] hover:bg-[#C87740] hover:shadow-[0_20px_40px_rgba(200,119,64,0.3)] transition-all duration-300"
      >
        <Link to="/jobs"><span>View All Opportunities</span></Link> 
        <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
        
        {/* Subtle 3D Inner Light Effect */}
        <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
      </motion.button>
    </div>
  </div>
</section>
    

      {/* --- FOOTER: STRUCTURED 3D --- */}
   <footer className="relative py-6 bg-[#004643] border-t border-white/10 overflow-hidden">
  {/* Subtly faded background grid - adjusted to White for visibility on Green */}
  <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
    style={{ 
      backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, 
      backgroundSize: '40px 40px' 
    }} 
  />

  {/* Changed max-w-7xl to max-w-6xl for a shorter, more balanced width */}
  <div className="max-w-6xl mx-auto px-6 relative z-10">
    <div className="grid md:grid-cols-3 gap-16 items-start">
      
      {/* Brand Section */}
      <div className="space-y-6 text-center md:text-left">
        <div className="flex justify-center md:justify-start">
          <img 
            src={logo} 
            alt="PlacePro AI Logo" 
            className="h-12 w-auto mb-2" 
          />
        </div>

        {/* Brand Title - Bone White with Caramel AI */}
        <h3 className="text-5xl font-black text-[#F0EDE5] tracking-tighter uppercase">
          PlacePro <span className="text-[#C87740]">AI</span>
        </h3>

        <p className="text-sm font-bold text-[#F0EDE5]/60 leading-relaxed max-w-xs mx-auto md:mx-0">
          A next-generation platform for campus hiring, engineered to bridge the gap between talent and industry.
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col gap-6 items-center md:items-start">
        <span className="font-black uppercase tracking-[0.3em] text-[10px] text-white/30">Sitemap</span>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {['Job Board', 'Hackathons', 'Help Desk', 'Upload Resume'].map((item) => (
            <motion.div key={item} whileHover={{ x: 5 }} className="cursor-pointer">
              <Link 
                to={`/${item.toLowerCase().replace(' ', '')}`} 
                className="text-sm font-black text-[#F0EDE5] hover:text-[#C87740] transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connect Section */}
      <div className="flex flex-col gap-8 items-center md:items-end">
        <span className="font-black uppercase tracking-[0.3em] text-[10px] text-white/30">Coming Soon</span>
        <div className="flex gap-4">
          {[
            { icon: <Globe size={20} />, label: 'Web' },
            { icon: <Mail size={20} />, label: 'Mail' },
            { icon: <LinkIcon size={20} />, label: 'Profile' }
          ].map((social, i) => (
            <motion.div
              key={i}
              whileHover={{ 
                y: -8, 
                backgroundColor: '#C87740',
                boxShadow: "0px 15px 30px rgba(200, 119, 64, 0.4)" 
              }}
              className="p-4 bg-white/10 text-[#F0EDE5] rounded-2xl cursor-pointer border border-white/10 backdrop-blur-sm transition-all duration-300"
            >
              {social.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Signature Bottom Bar */}
    <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
        © 2026 PlacePro AI 
      </div>
      <div className="flex gap-8">
        <span className="text-[9px] font-black uppercase tracking-widest text-white/20 cursor-pointer hover:text-[#C87740] transition-colors">Privacy Policy</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-white/20 cursor-pointer hover:text-[#C87740] transition-colors">Terms of Service</span>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SectionHeader = ({ title, subtitle, white }) => (
  <div className="text-center">
    <h2 className={`text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 ${white ? 'text-[#F0EDE5]' : 'text-[#004643]'}`}>{title}</h2>
    <p className={`text-lg font-medium ${white ? 'opacity-60' : 'text-[#004643]/60'}`}>{subtitle}</p>
    <div className={`h-2 w-24 mx-auto mt-8 rounded-full ${white ? 'bg-[#F0EDE5]' : 'bg-[#004643]'} shadow-xl`} />
  </div>
);

const EnhancedJobCard = ({ title, company, salary, icon }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        rotateX: 2,
        rotateY: -2
      }}
      className="group relative h-full p-1 bg-white rounded-[2rem] border-2 border-[#004643]/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_40px_80px_rgba(0,70,67,0.15)] hover:border-[#004643]"
    >
      <div className="bg-[#F8F9F8] h-full rounded-[1.8rem] p-8 flex flex-col justify-between overflow-hidden relative">
        {/* Animated Background Shimmer on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#004643]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Professional 3D Icon Container */}
          <div className="w-16 h-16 rounded-2xl bg-[#004643] text-[#F0EDE5] flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(0,70,67,0.3)] group-hover:bg-[#C87740] group-hover:shadow-[0_15px_30px_rgba(200,119,64,0.4)] transition-all duration-300">
            {icon}
          </div>

          <h3 className="text-xl font-black text-[#004643] tracking-tight mb-1">{title}</h3>
          <p className="text-[#004643]/60 font-bold uppercase text-[10px] tracking-widest">{company}</p>
        </div>

        <div className="mt-10 pt-6 border-t border-[#004643]/5 flex items-center justify-between relative z-10">
          <div>
            <p className="text-[10px] uppercase font-black text-[#004643]/40 tracking-wider">Estimated Salary</p>
            <p className="text-lg font-black text-[#004643]">{salary}</p>
          </div>
          
          <motion.div 
            whileHover={{ x: 5 }}
            className="w-10 h-10 rounded-full bg-[#004643]/5 flex items-center justify-center text-[#004643] group-hover:bg-[#004643] group-hover:text-white transition-colors"
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


const VerticalStep = ({ num, title, desc, side, icon }) => {
  const isLeft = side === "left";

  return (
    <motion.div 
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`relative flex items-center justify-between w-full ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Content Card */}
      <motion.div 
        whileHover={{ y: -10, scale: 1.02 }}
        className="w-full md:w-[45%] p-8 bg-white/80 backdrop-blur-md rounded-[2.5rem] border-2 border-[#004643]/5 shadow-[0_20px_50px_rgba(0,70,67,0.05)] hover:shadow-[0_30px_60px_rgba(200,119,64,0.1)] hover:border-[#C87740]/30 transition-all duration-500"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#004643] text-[#F0EDE5] shadow-[0_10px_20px_rgba(0,70,67,0.2)]">
            {icon}
          </div>
          <span className="text-4xl font-black text-[#004643]/10">0{num}</span>
        </div>
        
        <h3 className="text-2xl font-black text-[#004643] mb-3 tracking-tight">{title}</h3>
        <p className="text-[#004643]/70 font-medium leading-relaxed">{desc}</p>
      </motion.div>

      {/* Central Interactive Node */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
        <motion.div 
          whileHover={{ scale: 1.5 }}
          className="w-5 h-5 rounded-full bg-[#F0EDE5] border-4 border-[#004643] shadow-[0_0_20px_rgba(0,70,67,0.4)] z-20" 
        />
        <div className="absolute w-12 h-12 rounded-full bg-[#C87740]/20 animate-ping" />
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block w-[45%]" />
    </motion.div>
  );
};
const FeatureCard = ({ icon, title, desc }) => {
  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
      className="group relative p-8 bg-white rounded-[2.5rem] border-2 border-[#004643]/5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,70,67,0.1)] transition-all duration-500 overflow-hidden"
    >
      {/* Invisible Hover Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C87740]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 3D Icon Container */}
      <div className="w-16 h-16 mb-8 flex items-center justify-center rounded-2xl bg-[#004643] text-[#F0EDE5] shadow-[0_10px_20px_rgba(0,70,67,0.2)] group-hover:bg-[#C87740] group-hover:shadow-[0_15px_30px_rgba(200,119,64,0.3)] transition-all duration-500">
        {icon}
      </div>

      <h3 className="text-xl font-black text-[#004643] mb-4 tracking-tight">
        {title}
      </h3>
      
      <p className="text-[#004643]/70 font-medium leading-relaxed">
        {desc}
      </p>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <div className="w-12 h-1 w-12 bg-[#C87740] rounded-full" />
      </div>
    </motion.div>
  );
};

const RoleCard = ({ icon, role, desc }) => {
  return (
    <motion.div
      whileHover={{ y: -15, scale: 1.02, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer"
    >
      {/* REPLACED BLACK SHADOW WITH CARAMEL GLOW */}
      <div className="absolute inset-0 bg-[#C87740]/5 rounded-[2.5rem] blur-2xl group-hover:bg-[#C87740]/20 transition-colors duration-500" />
      
      <div className="relative h-full p-10 bg-[#F0EDE5]/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex flex-col items-center text-center overflow-hidden transition-all duration-500 group-hover:border-[#C87740]/40 group-hover:bg-[#F0EDE5]/10">
        
        {/* Animated Inner Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C87740]/15 rounded-full blur-3xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />

        {/* Icon Container */}
        <div className="mb-8 p-6 rounded-3xl bg-white/5 text-[#F0EDE5] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:bg-[#C87740] group-hover:text-white transition-all duration-500">
          {icon}
        </div>

        <h3 className="text-2xl font-black text-[#F0EDE5] tracking-tight mb-3">
          {role}
        </h3>
        
        <p className="text-[#F0EDE5]/60 text-sm font-medium leading-relaxed max-w-[200px]">
          {desc}
        </p>

        {/* Action Button */}
        <div className="mt-8 flex items-center gap-2 text-[#C87740] font-black uppercase text-[10px] tracking-[0.2em] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
          Enter Portal <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;