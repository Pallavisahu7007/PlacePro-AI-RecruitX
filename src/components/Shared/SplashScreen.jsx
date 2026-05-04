import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

const SplashScreen = () => {
  return (
    /* Background changed to White for a clean, minimalist look */
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        {/* --- LOGO --- */}
        <img src={logo} alt="PlacePro AI Logo" className="h-20 w-auto mb-6" />
        
        {/* --- TAGLINE (Brand Title) --- */}
        <h1 className="text-3xl font-black text-[#004643] tracking-tighter uppercase">
          PlacePro <span className="text-[#C87740]">AI</span>
        </h1>
        
        <p className="mt-2 text-[10px] font-black text-black uppercase tracking-[0.4em]">
          Next-Gen Campus Hiring
        </p>
        
        {/* --- LOADING LINE --- */}
        <div className="mt-10 w-48 h-1 bg-[#004643]/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#C87740]" // Caramel loading bar
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
{/* 
        <p className="mt-4 text-[#004643]/60 text-[10px] font-bold uppercase tracking-[0.2em]">
          Initializing NLP Engine...
        </p> */}
      </motion.div>
    </div>
  );
};

export default SplashScreen;