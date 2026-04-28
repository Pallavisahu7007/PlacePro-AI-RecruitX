import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, XCircle, BarChart3, Info } from 'lucide-react';

const EligibilityChecker = () => {
  // Mock data representing the "Smart Eligibility" criteria from a Job Posting
  const jobCriteria = {
    minCgpa: 7.5,
    requiredSkills: ["React.js", "Node.js", "Python"],
    branch: "Computer Science"
  };

  // Mock data representing the NLP-extracted Student profile
  const studentProfile = {
    cgpa: 8.2,
    skills: ["React.js", "Python", "Tailwind CSS"],
    branch: "Computer Science"
  };

  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  const checkEligibility = () => {
    setChecking(true);
    setTimeout(() => {
      // Automatic checking based on criteria [cite: 63]
      const cgpaPass = studentProfile.cgpa >= jobCriteria.minCgpa;
      const skillsMatch = jobCriteria.requiredSkills.filter(skill => 
        studentProfile.skills.includes(skill)
      );
      const isEligible = cgpaPass && skillsMatch.length >= 2;

      setResult({ isEligible, cgpaPass, matchedSkills: skillsMatch });
      setChecking(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Smart Eligibility System</h2>
        <p className="text-gray-500">Automated candidate-job matching using AI-extracted data[cite: 77].</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Criteria Comparison Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="text-blue-600" /> Requirements vs. Your Profile
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Minimum CGPA: {jobCriteria.minCgpa}</span>
              <span className="font-bold text-green-600">Your CGPA: {studentProfile.cgpa}</span>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 uppercase">Key Skills Required</p>
              <div className="flex flex-wrap gap-2">
                {jobCriteria.requiredSkills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={checkEligibility}
            disabled={checking}
            className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {checking ? "Analyzing Eligibility..." : "Verify My Eligibility"}
          </button>
        </div>

        {/* Results Animation */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-3xl p-8 flex flex-col items-center justify-center text-center ${
                result.isEligible ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}
            >
              {result.isEligible ? (
                <>
                  <ShieldCheck size={80} className="text-green-600 mb-4" />
                  <h3 className="text-2xl font-bold text-green-900">You are Eligible!</h3>
                  <p className="text-green-700 mt-2">Your profile matches the smart criteria for this role[cite: 32].</p>
                  <button className="mt-6 bg-green-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-green-200">
                    Apply Now
                  </button>
                </>
              ) : (
                <>
                  <XCircle size={80} className="text-red-600 mb-4" />
                  <h3 className="text-2xl font-bold text-red-900">Not Eligible</h3>
                  <p className="text-red-700 mt-2">You do not meet the minimum requirements for this job[cite: 27].</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EligibilityChecker;