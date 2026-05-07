import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, EyeOff, Loader2 } from 'lucide-react';
import logo from "../../assets/logo.png";
import Navbar from "../../components/Layout/Navbar"; // 1. Import your Navbar component

// Firebase Imports
import { auth, db, googleProvider, facebookProvider } from "../../firebase";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- NEW: CHECK REDIRECT RESULT ON MOUNT ---
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setLoading(true);
          await handleRoleRouting(result.user);
        }
      } catch (error) {
        console.error("Redirect Error:", error);
      } finally {
        setLoading(false);
      }
    };
    checkRedirect();
  }, []);

  const handleRoleRouting = async (user) => {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (userDoc.exists()) {
      const role = userDoc.data().role;
      navigate(`/dashboard/${role}`);
    } else {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName || "New User",
        email: user.email,
        role: 'student',
        createdAt: new Date()
      });
      navigate('/dashboard/student');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleRoleRouting(userCredential.user);
    } catch (error) {
      alert(`Login Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: UNIVERSAL SOCIAL SIGN IN ---
  const handleSocialSignIn = async (type) => {
    const provider = type === 'google' ? googleProvider : facebookProvider;
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      await handleRoleRouting(result.user);
    } catch (error) {
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
        await signInWithRedirect(auth, provider);
      } else {
        console.error(`${type} Sign-In Error:`, error);
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // 2. Wrap everything in a flex-col container
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-[#004643]">
      
      {/* 3. Place Navbar at the top */}
      <Navbar />

      {/* Background Decor */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(120%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#004643]/90 via-[#004643]/80 to-[#C87740]/20 z-1" />
      
      {/* 4. Use flex-1 to center the Login card in the remaining space */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[450px] bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] relative z-10"
        >
          <div className="text-center mb-10">
            <img src={logo} alt="Logo" className="h-14 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-[#F0EDE5] uppercase tracking-tighter">
              RecruitX <span className="text-[#C87740]">Portal</span>
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input name="email" type="email" required placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none" />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input name="password" type={showPassword ? "text" : "password"} required placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white text-sm outline-none" />
              <div onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 cursor-pointer"><EyeOff size={18} /></div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-[#C87740] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Sign In"}
            </button>
          </form>

          <div className="mt-8">
            <div className="flex gap-4">
              {/* GOOGLE BUTTON */}
              <button 
                type="button" 
                onClick={() => handleSocialSignIn('google')} 
                className="flex-1 flex items-center justify-center gap-3 bg-white py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-4 w-4" />
                <span className="text-[10px] font-black text-[#004643] uppercase">Google</span>
              </button>

              {/* FACEBOOK BUTTON */}
              <button 
                type="button" 
                onClick={() => handleSocialSignIn('facebook')} 
                className="flex-1 flex items-center justify-center gap-3 bg-white py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <img src="https://authjs.dev/img/providers/facebook.svg" alt="Facebook" className="h-4 w-4" />
                <span className="text-[10px] font-black text-[#004643] uppercase">Facebook</span>
              </button>
            </div>
            
            <p className="mt-8 text-center text-[10px] font-black uppercase text-white/20">
              New here? <Link to="/register" className="text-[#C87740]">Create Account</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;