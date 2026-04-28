import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import { 
  Cpu, Zap, ShieldCheck, GraduationCap, 
  ChevronRight, CheckCircle2, Search, BarChart3, Rocket
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-[#ECECEB] min-h-screen font-sans text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION: REFINED 3D GLASSMORPHISM --- */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-blue-50 border border-blue-100 rounded-full">
                <Rocket size={14} className="text-blue-600" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-600">
                  Revolutionizing Campus Hiring
                </span>
              </div>
              
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-[1.1] text-slate-900">
  Streamline Success with <br/>
  <span className="text-blue-700 inline-block mt-2">
    PlacePro AI RecruitX
  </span>
</h1>
              
              <p className="text-base md:text-lg text-slate-500 mb-10 font-medium leading-relaxed max-w-xl">
                The ultimate AI-driven ecosystem. We bridge the gap between talent and industry using 
                automated NLP screening and precision eligibility matching.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard/student">
                  <button className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)] hover:shadow-none hover:translate-y-0.5 transition-all flex items-center gap-2">
                    Get Hired <ChevronRight size={18} />
                  </button>
                </Link>
                <Link to="/dashboard/recruiter/post-job">
                  <button className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm">
                    Recruiter Login
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right Visual: 3D Image/GIF Component */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 w-full h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://static01.nyt.com/images/2018/12/07/business/07hiring/07hiring-superJumbo-v2.gif" 
                  alt="3D Tech Background" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
                
                {/* Floating GIF Overlay */}
                
              </div>
              
              {/* Background 3D Shadows */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-700"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- WORKFLOW SECTION: CARD TRANSITIONS --- */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-800">How it Works</h2>
              <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
            </div>
           
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              num="01" 
              title="Resume Extraction" 
              desc="Automatic parsing of PDF files to extract skills and education using AI." 
            />
            <StepCard 
              num="02" 
              title="Smart Matching" 
              desc="Matching candidates to job criteria using logic-based eligibility checks." 
            />
            <StepCard 
              num="03" 
              title="Digital Records" 
              desc="Secure tracking of applications and placement drive status in real-time." 
            />
          </div>
        </div>
      </section>

      {/* --- RATIONALE & METRICS --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl relative z-10 border border-slate-800">
                <BarChart3 className="text-blue-500 mb-6" size={40} />
                <h3 className="text-2xl font-black mb-4 text-white uppercase">Expected Outcomes</h3>
                <div className="space-y-4">
                  <Metric text="80% Reduction in screening time" />
                  <Metric text="100% Automated eligibility verification" />
                  <Metric text="Seamless role-based portal access" />
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600 rounded-2xl -z-10 group-hover:rotate-6 transition-transform"></div>
            </div>

            <div className="text-left space-y-6">
              <h2 className="text-3xl font-black leading-tight uppercase">Why Choose PlacePro?</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Traditional placement cycles are plagued by manual effort and data inconsistencies. 
                Our platform delivers an intelligent, reliable, and error-free pipeline for 
                university placements.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                  <Cpu className="text-blue-600 mb-2" size={20} />
                  <p className="text-xs font-bold uppercase text-slate-800">NLP Powered</p>
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                  <ShieldCheck className="text-blue-600 mb-2" size={20} />
                  <p className="text-xs font-bold uppercase text-slate-800">Secure Audit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-xl font-black text-blue-600 uppercase">PlacePro</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">AI-Driven Recruitment</p>
          </div>
          <div className="flex gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <Link to="/jobs" className="hover:text-blue-600 transition">Job Board</Link>
            <Link to="/dashboard/admin" className="hover:text-blue-600 transition">Admin Console</Link>
            <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
          </div>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2026 RecruitX Module</p>
        </div>
      </footer>
    </div>
  );
};

// Sub-Components
const StepCard = ({ num, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
  >
    <span className="text-blue-600 font-black text-sm block mb-4">{num}</span>
    <h3 className="text-lg font-black mb-2 text-slate-800 uppercase">{title}</h3>
    <p className="text-slate-400 text-sm font-medium leading-relaxed">{desc}</p>
  </motion.div>
);

const Metric = ({ text }) => (
  <div className="flex items-center gap-3">
    <CheckCircle2 className="text-blue-400" size={16} />
    <span className="text-slate-300 text-sm font-medium">{text}</span>
  </div>
);

export default LandingPage;