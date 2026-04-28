import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Register = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Join PlacePro AI</h2>
      <p className="text-center text-gray-500 mb-8">Select your role to get started</p>
      
      <form className="space-y-5">
        <div className="flex gap-4 mb-6">
          <label className="flex-1">
            <input type="radio" name="role" className="hidden peer" defaultChecked />
            <div className="text-center p-3 border-2 rounded-xl cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50 transition">
              Student
            </div>
          </label>
          <label className="flex-1">
            <input type="radio" name="role" className="hidden peer" />
            <div className="text-center p-3 border-2 rounded-xl cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50 transition">
              Recruiter
            </div>
          </label>
        </div>
        <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Full Name" />
        <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Email Address" />
        <input type="password" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Create Password" />
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          Create Account
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-600 font-bold">Log in</Link>
      </p>
    </motion.div>
  </div>
);

export default Register;