import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, FileCheck, AlertTriangle, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for system oversight
  const stats = [
    { label: "Total Students", val: "1,240", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Partner Companies", val: "48", icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Placements Done", val: "312", icon: FileCheck, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pending Verifications", val: "15", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Administrator Console</h2>
          <p className="text-gray-500 mt-1">Global oversight of the campus placement lifecycle.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
          <TrendingUp size={18} /> +12% growth this month
        </div>
      </header>

      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className={`p-3 w-fit rounded-2xl ${stat.bg} ${stat.color} mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h4 className="text-2xl font-bold text-gray-900">{stat.val}</h4>
          </motion.div>
        ))}
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / Tracking Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8">
          <h3 className="text-xl font-bold mb-6">Recent Placement Drives</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm uppercase tracking-wider border-b">
                  <th className="pb-4 font-semibold">Company</th>
                  <th className="pb-4 font-semibold">Date</th>
                  <th className="pb-4 font-semibold">Candidates</th>
                  <th className="pb-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { name: "Google", date: "Oct 12", count: 450, status: "Ongoing" },
                  { name: "Microsoft", date: "Oct 15", count: 320, status: "Scheduled" },
                  { name: "TCS", date: "Oct 08", count: 890, status: "Completed" }
                ].map((drive, i) => (
                  <tr key={i} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-bold text-gray-800">{drive.name}</td>
                    <td className="py-4 text-gray-600">{drive.date}</td>
                    <td className="py-4 text-gray-600">{drive.count}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        drive.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        drive.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {drive.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health / Audit Section */}
        <div className="bg-gray-900 rounded-3xl p-8 text-white">
          <h3 className="text-xl font-bold mb-6">System Health</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2 text-gray-400">
                <span>NLP Engine Accuracy</span>
                <span>94%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[94%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 text-gray-400">
                <span>Server Uptime</span>
                <span>99.9%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[99.9%]"></div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-500 leading-relaxed">
                The AI system is currently optimized for PDF and DOCX resume parsing[cite: 135].
              </p>
              <button className="w-full mt-4 bg-white text-gray-900 py-3 rounded-xl font-bold text-sm">
                View Detailed Audit Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;