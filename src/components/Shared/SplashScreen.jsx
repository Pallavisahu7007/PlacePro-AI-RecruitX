import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[100]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <img src={logo} alt="Logo" className="h-24 w-auto mb-6" />
        <h1 className="text-3xl font-bold text-blue-700">PlacePro AI RecruitX</h1>
        
        {/* Loading Indicator */}
        <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <p className="mt-4 text-gray-500 animate-pulse text-sm">Initializing NLP Engine...</p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;