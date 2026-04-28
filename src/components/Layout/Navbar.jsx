import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileUp } from 'lucide-react'; // Adding a modern upload icon
import logo from '../../assets/logo.png'; 

const Navbar = () => (
  <nav className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
    {/* --- LOGO SECTION --- */}
    <Link to="/" className="flex items-center gap-3 group">
      <motion.img 
        whileHover={{ rotate: 5 }}
        src={logo} 
        alt="PlacePro AI Logo" 
        className="h-10 w-auto" 
      />
      <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase hidden md:block">
        PlacePro <span className="text-blue-600">AI</span>
      </span>
    </Link>
    
    {/* --- NAV LINKS --- */}
    <div className="flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
      <Link to="/jobs" className="hover:text-blue-600 transition-colors">Job Board</Link>
      
      {/* New: Upload Resume Link with Icon */}
      <Link 
        to="/dashboard/student/upload" 
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all group"
      >
        <FileUp size={18} className="group-hover:-translate-y-0.5 transition-transform text-blue-600" />
        <span>Upload Resume</span>
      </Link>

      <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div> {/* Divider */}

      <Link to="/login" className="hover:text-blue-600 transition-colors">Sign In</Link>
      
      <Link to="/register">
        <motion.button 
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs tracking-widest uppercase shadow-lg shadow-slate-200 hover:bg-blue-600 transition-colors"
        >
          Register
        </motion.button>
      </Link>
    </div>
  </nav>
);

export default Navbar;