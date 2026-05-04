import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileUp, Menu } from 'lucide-react'; 
import logo from '../../assets/logo.png'; 

const Navbar = () => (
  <nav className="flex justify-between items-center px-10 py-5 bg-[#004643] border-b border-white/10 sticky top-0 z-[999] w-full">
    
    {/* --- LOGO SECTION --- */}
    <Link to="/" className="flex items-center gap-3">
      <img 
        src={logo} 
        alt="PlacePro AI Logo" 
        className="h-10 w-auto" 
      />
      <span className="text-2xl font-black text-[#F0EDE5] tracking-tighter uppercase hidden md:block">
        PlacePro <span className="text-[#C87740]">AI</span>
      </span>
    </Link>
    
    {/* --- NAVIGATION & ACTIONS --- */}
    <div className="flex items-center gap-8">
      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-8 text-[11px] font-black text-[#F0EDE5]/70 uppercase tracking-[0.2em]">
        <Link to="/jobs" className="hover:text-[#C87740] transition-colors">Job Board</Link>
        <Link to="/about" className="hover:text-[#C87740] transition-colors">About</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-[11px] font-black text-[#F0EDE5] uppercase tracking-widest hover:text-[#C87740] px-4">
          Sign In
        </Link>
        
        {/* --- THE REGISTER BUTTON --- */}
    <Link to="/register" className="relative z-[1000]">
  <button 
    /* 
       1. Removed whileHover and whileTap from framer-motion
       2. Set static background to #C87740 (Caramel Orange)
       3. Set static text to #FFFFFF (White) 
    */
    className="block bg-[#C87740] text-[#FFFFFF] px-8 py-3 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
  >
    Register Now
  </button>
</Link>
        
        <div className="lg:hidden text-[#F0EDE5]">
          <Menu size={24} />
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;