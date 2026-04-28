import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, CheckCircle } from 'lucide-react';

const RecruiterJobPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    package: '',
    minCgpa: '',
    requiredSkills: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", formData);
    alert("Job Requirement Posted Successfully!");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 my-10">
      <header className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
          <PlusCircle size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Post Job Requirement</h2>
          <p className="text-gray-500 text-sm">Define smart eligibility criteria for automated screening.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Job Title</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. Software Engineer"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Minimum CGPA </label>
          <input 
            type="number" 
            step="0.1"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. 7.5"
            onChange={(e) => setFormData({...formData, minCgpa: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">Required Skills (Comma separated) [cite: 26]</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="React, Node.js, Python..."
            onChange={(e) => setFormData({...formData, requiredSkills: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">Job Description</label>
          <textarea 
            rows="4"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="Detail the role and responsibilities..."
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <CheckCircle size={20} /> Publish Job Role
        </motion.button>
      </form>
    </div>
  );
};

export default RecruiterJobPost;