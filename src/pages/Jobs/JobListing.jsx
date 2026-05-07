import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MapPin, Briefcase, 
  Loader2, Sparkles, Star, Globe, Mail, 
  Link as LinkIcon, X, CheckCircle2, IndianRupee 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import logo from '../../assets/logo.png'; 

// Firebase
import { db, auth } from '../../firebase';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal & Application State
  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const q = query(collection(db, "jobs"), orderBy("postedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => {
    const results = jobs.filter(job =>
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  const handleApply = async (jobId) => {
    if (!auth.currentUser) return alert("Please login to apply!");
    setApplying(true);
    try {
      await addDoc(collection(db, "applications"), {
        jobId: jobId,
        studentId: auth.currentUser.uid,
        studentName: auth.currentUser.displayName,
        studentEmail: auth.currentUser.email,
        status: "pending",
        appliedAt: serverTimestamp()
      });
      alert("Application submitted successfully!");
      setSelectedJob(null);
    } catch (error) {
      alert("Error: " + error.message);
    } finally { setApplying(false); }
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
              Find Your <span className="text-[#C87740]">Future</span>
            </h1>
            <p className="text-[#F0EDE5]/60 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              Browse through high-quality opportunities curated for the 2026 batch. 
              Smart filtering helps you match with the right career path.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-white flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
            <input 
              type="text" 
              placeholder="Search roles, skills, or companies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-[#004643]/5 font-semibold text-gray-700 transition-all"
            />
          </div>
          <button className="px-10 py-5 bg-[#004643] text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-[#003330] transition-all shadow-lg shadow-[#004643]/20">
            <Filter size={20} />
            <span className="uppercase tracking-widest text-xs">Refine</span>
          </button>
        </div>
      </div>

      {/* --- GRID CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#C87740] mb-6" size={50} />
            <p className="font-bold text-[#004643]/30 uppercase text-xs tracking-[0.3em]">Gathering Opportunities</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} onView={() => setSelectedJob(job)} />
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-[#004643]/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <button onClick={() => setSelectedJob(null)} className="absolute right-8 top-8 text-gray-400 hover:text-[#004643] transition-colors"><X size={24} /></button>
              <div className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#004643] rounded-2xl flex items-center justify-center text-white text-2xl font-black">{selectedJob.companyName?.charAt(0)}</div>
                  <div>
                    <h2 className="text-3xl font-black text-[#004643] tracking-tighter uppercase">{selectedJob.title}</h2>
                    <p className="text-[#C87740] font-bold uppercase text-xs tracking-widest">{selectedJob.companyName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <DetailBox label="Location" value={selectedJob.location} />
                  <DetailBox label="Salary" value={selectedJob.package} />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-10">{selectedJob.description}</p>
                <button onClick={() => handleApply(selectedJob.id)} disabled={applying} className="w-full py-5 bg-[#C87740] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#b06533] transition-all flex justify-center items-center gap-2">
                  {applying ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={20}/> Submit Application</>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- PREMIUM FOOTER --- */}
      <footer className="relative py-8 bg-[#004643] border-t border-white/10 overflow-hidden mt-20">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-16 items-start">
            <div className="space-y-6 text-center md:text-left">
              <img src={logo} alt="Logo" className="h-12 w-auto mb-2 mx-auto md:mx-0" />
              <h3 className="text-5xl font-black text-[#F0EDE5] tracking-tighter uppercase">PlacePro <span className="text-[#C87740]">AI</span></h3>
              <p className="text-sm font-bold text-[#F0EDE5]/60 max-w-xs mx-auto md:mx-0">A next-generation platform for campus hiring.</p>
            </div>
            <div className="flex flex-col gap-6 items-center md:items-start">
              <span className="font-black uppercase tracking-[0.3em] text-[10px] text-white/30">Sitemap</span>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                {['Job Board', 'Hackathons', 'Help Desk', 'Upload Resume'].map((item) => (
                  <Link key={item} to={`/${item.toLowerCase().replace(' ', '')}`} className="text-sm font-black text-[#F0EDE5] hover:text-[#C87740] transition-colors">{item}</Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-8 items-center md:items-end">
              <span className="font-black uppercase tracking-[0.3em] text-[10px] text-white/30">Connect</span>
              <div className="flex gap-4">
                {[<Globe size={20} />, <Mail size={20} />, <LinkIcon size={20} />].map((icon, i) => (
                  <motion.div key={i} whileHover={{ y: -8, backgroundColor: '#C87740' }} className="p-4 bg-white/10 text-[#F0EDE5] rounded-2xl cursor-pointer border border-white/10 backdrop-blur-sm">{icon}</motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">© 2026 PlacePro AI</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const JobCard = ({ job, index, onView }) => {
  // Construct the logo URL using the company website from Firestore
  const logoUrl = job.companyWebsite 
    ? `https://www.google.com/s2/favicons?domain=${job.companyWebsite}&sz=128` 
    : null;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#004643]/10 transition-all group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6">
        {/* --- DYNAMIC LOGO CONTAINER --- */}
        <div className="w-14 h-14 bg-[#004643] rounded-2xl flex items-center justify-center text-[#F0EDE5] font-black text-xl shadow-lg shadow-[#004643]/20 overflow-hidden border-2 border-white/10">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={job.companyName} 
              className="w-full h-full object-contain p-2 bg-white" 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          ) : (
            <span>{job.companyName?.charAt(0) || "R"}</span>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="bg-[#C87740]/10 text-[#C87740] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            {job.package}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold">AI Recommended</span>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-black text-[#004643] leading-tight mb-2">{job.title}</h3>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">{job.companyName}</p>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs bg-gray-50 px-3 py-2 rounded-xl">
          <MapPin size={14} className="text-[#C87740]" /> {job.location}
        </div>
        <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs bg-gray-50 px-3 py-2 rounded-xl">
          <Briefcase size={14} className="text-[#C87740]" /> {job.type || "Full-time"}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
        <div>
          <p className="text-[10px] font-bold text-gray-300 uppercase mb-1">Required CGPA</p>
          <p className="text-sm font-black text-[#004643]">{job.minCgpa}+</p>
        </div>
        <button 
          onClick={onView}
          className="bg-[#004643] text-white px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#004643]/10 hover:bg-[#C87740] hover:shadow-[#C87740]/20 transition-all active:scale-95"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};
const DetailBox = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{label}</p>
    <p className="text-sm font-black text-[#004643]">{value}</p>
  </div>
);

export default JobListing;