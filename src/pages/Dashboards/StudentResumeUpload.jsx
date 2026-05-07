import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, Cpu, CheckCircle, AlertCircle, 
  Loader2, X, Sparkles, User, Globe, Mail, 
  Link as LinkIcon, GraduationCap, Star, BrainCircuit, RotateCcw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Navbar from '../../components/Layout/Navbar';

// Firebase
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";

const StudentResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [userProfile, setUserProfile] = useState({ name: "Student", photo: null });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserProfile({
          name: currentUser.displayName || "Candidate",
          photo: currentUser.photoURL
        });
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setScanResult(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setScanResult(null);
  };

  const simulateNLPScan = () => {
    if (!file) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        name: userProfile.name,
        extractedSkills: ["React.js", "Tailwind CSS", "Node.js", "Python", "Firebase"],
        education: "B.Tech Computer Science",
        matchScore: "94%"
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F0EDE5]">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <div className="bg-[#004643] py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C87740] rounded-full blur-[150px] opacity-10 -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-black text-[#F0EDE5] uppercase tracking-tighter mb-6">
              Resume <span className="text-[#C87740]">Intelligence</span>
            </h1>
            <p className="text-[#F0EDE5]/60 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              Upload your resume to activate our AI Skill Extraction engine. 
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- UPLOAD BOX --- */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-white flex flex-col items-center text-center">
          
          <input 
            type="file" 
            id="resume-upload" 
            className="hidden" 
            onChange={handleFileChange} 
            accept=".pdf,.doc,.docx" 
          />

          {!file ? (
            <label htmlFor="resume-upload" className="cursor-pointer group w-full">
              <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 bg-[#004643]/5 text-[#004643] transition-all group-hover:bg-[#004643] group-hover:text-white">
                <Upload size={32} /> {/* Icon is now straight */}
              </div>
              <h3 className="text-2xl font-black text-[#004643] uppercase tracking-tighter mb-2">
                Select your Resume
              </h3>
              <p className="text-gray-400 text-sm font-medium">Supported formats: PDF, DOCX (Max 5MB)</p>
            </label>
          ) : (
            <div className="w-full">
              <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 bg-[#C87740] text-white">
                <FileText size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#004643] uppercase tracking-tighter mb-2">
                {file.name}
              </h3>
              
              <div className="flex justify-center gap-4 mt-6">
                <button 
                  onClick={clearFile}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                >
                  <RotateCcw size={14} /> Change Resume
                </button>
              </div>

              <AnimatePresence>
                {!scanResult && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={simulateNLPScan}
                    disabled={isScanning}
                    className="mt-8 bg-[#004643] text-white px-12 py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-[#003330] transition-all shadow-xl shadow-[#004643]/20 uppercase tracking-widest text-xs mx-auto"
                  >
                    {isScanning ? <Loader2 className="animate-spin" size={20} /> : <BrainCircuit size={20} />}
                    {isScanning ? "Analyzing..." : "Start AI Extraction"}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* --- RESULTS SECTION --- */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <AnimatePresence mode="wait">
          {scanResult && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="bg-[#004643] p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C87740] rounded-full blur-[60px] opacity-20 -mr-16 -mt-16"></div>
                <Star className="text-[#C87740] mb-6" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">AI Match Score</p>
                <h4 className="text-5xl font-black text-[#C87740]">{scanResult.matchScore}</h4>
              </div>

              <div className="md:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="text-[#C87740]" size={24} />
                  <h3 className="text-xl font-black text-[#004643] uppercase tracking-tighter">Identified Skillset</h3>
                </div>
                <div className="flex flex-wrap gap-3 mb-10">
                  {scanResult.extractedSkills.map((skill, i) => (
                    <span key={i} className="bg-gray-50 border border-gray-100 text-[#004643] px-5 py-2.5 rounded-2xl text-xs font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="pt-8 border-t border-gray-50">
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Extracted Education</p>
                     <p className="font-bold text-[#004643]">{scanResult.education}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- PREMIUM FOOTER --- */}
      <footer className="relative py-6 bg-[#004643] border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-16 items-start">
            <div className="space-y-6 text-center md:text-left">
              <img src={logo} alt="Logo" className="h-12 w-auto mb-2 mx-auto md:mx-0" />
              <h3 className="text-5xl font-black text-[#F0EDE5] tracking-tighter uppercase">PlacePro <span className="text-[#C87740]">AI</span></h3>
            </div>
            <div className="flex flex-col gap-6 items-center md:items-start">
              <span className="font-black uppercase tracking-[0.3em] text-[10px] text-white/30">Explore</span>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                {['Job Board', 'Hackathons', 'Help Desk', 'Profile'].map((item) => (
                  <Link key={item} to="/" className="text-sm font-black text-[#F0EDE5] hover:text-[#C87740] transition-colors">{item}</Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-8 items-center md:items-end">
              <span className="font-black uppercase tracking-[0.3em] text-[10px] text-white/30">Connect</span>
              <div className="flex gap-4">
                {[<Globe size={20} />, <Mail size={20} />, <LinkIcon size={20} />].map((icon, i) => (
                  <motion.div key={i} whileHover={{ y: -8, backgroundColor: '#C87740' }} className="p-4 bg-white/10 text-[#F0EDE5] rounded-2xl cursor-pointer border border-white/10 backdrop-blur-sm transition-all duration-300">
                    {icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 text-center">© 2026 PlacePro AI</div>
        </div>
      </footer>
    </div>
  );
};

export default StudentResumeUpload;