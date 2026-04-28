import { useState } from 'react';
import Navbar from '../../components/Layout/Navbar';
import JobCard from '../../components/Shared/JobCard';
import { Search, Filter } from 'lucide-react';

const JobListing = () => {
  // Dummy data based on system requirements
  const [jobs] = useState([
    { id: 1, title: "Software Engineer", company: "TechCorp", location: "Bangalore", minCgpa: "7.5", package: "12 LPA", type: "Full-time" },
    { id: 2, title: "Data Analyst", company: "DataSync", location: "Remote", minCgpa: "8.0", package: "10 LPA", type: "Internship" },
    { id: 3, title: "AI Developer", company: "FutureMind", location: "Pune", minCgpa: "8.5", package: "18 LPA", type: "Full-time" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Explore Opportunities</h1>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search jobs or skills..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
              <Filter size={20} /> Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListing;