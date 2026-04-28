import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Clock, Zap, ChevronRight, Building2 } from 'lucide-react';

const JobCard = ({ job }) => {
  // Mock match score for AI feel
  const matchScore = job.matchScore || 95;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* AI Match Badge - Top Right */}
      <div className="absolute -top-3 -right-3">
        <div className="bg-slate-900 text-white px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-slate-800">
          <Zap size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-black tracking-tight">{matchScore}% Match</span>
        </div>
      </div>

      {/* Header: Logo & Info */}
      <div className="flex gap-4 items-start mb-6">
        <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
          {job.logo ? (
            <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
          ) : (
            <Building2 size={28} />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
            {job.title}
          </h3>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">
            {job.company}
          </p>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-y-3 mb-8">
        <div className="flex items-center gap-2 text-slate-400">
          <MapPin size={16} className="text-slate-300" />
          <span className="text-xs font-bold text-slate-500">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <DollarSign size={16} className="text-slate-300" />
          <span className="text-xs font-bold text-slate-500">{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Clock size={16} className="text-slate-300" />
          <span className="text-xs font-bold text-slate-500">2 days ago</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase text-green-600 tracking-widest">Actively Hiring</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-3">
        <button className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all transform active:scale-95 shadow-lg shadow-slate-200">
          Quick Apply
        </button>
        <button className="p-3.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Glassy Background Effect on Hover */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export default JobCard;