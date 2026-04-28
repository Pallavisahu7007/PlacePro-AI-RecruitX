import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Cpu, CheckCircle, AlertCircle } from 'lucide-react';

const StudentResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setScanResult(null);
  };

  const simulateNLPScan = () => {
    if (!file) return;
    setIsScanning(true);
    
    // Simulating the NLP extraction process (Python spaCy/NLTK logic)
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        name: "Vicky Kumar Yadav",
        extractedSkills: ["React.js", "Tailwind CSS", "Node.js", "Python"],
        education: "B.Tech CSE",
        matchScore: "92%"
      });
    }, 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <header>
        <h2 className="text-3xl font-bold text-gray-900">Resume & NLP Profile</h2>
        <p className="text-gray-500">Upload your resume to let our AI extract your skills and check job eligibility.</p>
      </header>

      {/* Upload Zone */}
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center">
        <input 
          type="file" 
          id="resume-upload" 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />
        <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4">
            <Upload size={32} />
          </div>
          <p className="text-lg font-semibold text-gray-700">
            {file ? file.name : "Click to upload resume"}
          </p>
          <p className="text-sm text-gray-400 mt-1">PDF, DOC or DOCX (Max 5MB)</p>
        </label>
        
        {file && !scanResult && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={simulateNLPScan}
            className="mt-6 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto"
          >
            {isScanning ? <Cpu className="animate-spin" /> : <Cpu />}
            {isScanning ? "NLP Analysis in Progress..." : "Run AI Skill Extraction"}
          </motion.button>
        )}
      </div>

      {/* AI Extraction Results (Simulated Outcome) */}
      {scanResult && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200"
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle /> NLP Extraction Successful
            </h3>
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold">
              AI Confidence: {scanResult.matchScore}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-blue-100 text-sm uppercase tracking-wider font-bold">Identified Skills</p>
              <div className="flex flex-wrap gap-2">
                {scanResult.extractedSkills.map((skill, i) => (
                  <span key={i} className="bg-white text-blue-700 px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-blue-100 text-sm uppercase tracking-wider font-bold">Extracted Education</p>
              <p className="text-lg font-semibold">{scanResult.education}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StudentResumeUpload;