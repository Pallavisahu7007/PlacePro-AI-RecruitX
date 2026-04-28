import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
      <p className="text-center text-gray-500 mb-8">Access the PlacePro AI Portal</p>
      
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="name@university.edu" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          Sign In
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        New here? <Link to="/register" className="text-blue-600 font-bold">Create an account</Link>
      </p>
    </motion.div>
  </div>
);

export default Login;