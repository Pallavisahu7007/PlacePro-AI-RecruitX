import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from "../../assets/logo.png";
import { 
  User, Mail, Lock, Building2, ShieldCheck, GraduationCap, Loader2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Firebase Imports
import { auth, db, googleProvider } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);

  // Helper to save user to Firestore (Common for both methods)
  const saveUserToFirestore = async (user, name, selectedRole) => {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name || user.displayName || "New User",
      email: user.email,
      role: selectedRole,
      createdAt: new Date()
    }, { merge: true });
  };

  // --- REGISTRATION LOGIC ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 1. Save data to Firestore
      await saveUserToFirestore(userCredential.user, fullName, role);
      
      // 2. Navigate DIRECTLY to the dashboard based on the selected role
      // This saves the user an extra step!
      navigate(`/dashboard/${role}`); 
      
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
};

  // --- GOOGLE SIGN UP LOGIC ---
  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      // If Popup gets stuck, Firebase automatically handles the transition to Redirect if coded
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user, null, role);
      navigate('/login');
    } catch (error) {
      console.error("Signup Error:", error);
      // Fallback for COOP/Popup blocked errors
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
        await signInWithRedirect(auth, googleProvider);
      } else {
        alert("Google Sign-up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#F0EDE5] min-h-screen font-sans text-[#004643] relative overflow-hidden">
      
      {/* Background stays the same */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.08]"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)'
        }} 
      />

      <nav className="flex justify-between items-center px-8 py-4 bg-[#004643] border-b border-white/10 sticky top-0 z-[100] w-full shadow-lg">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="PlacePro AI Logo" className="h-10 w-auto" />
          <span className="text-xl font-black text-[#F0EDE5] tracking-tighter uppercase ">
            PlacePro <span className="text-[#C87740]">AI</span>
          </span>
        </Link>
      </nav>

      <main className="flex-1 p-6 lg:p-12 relative z-10 flex flex-col items-center justify-center">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-black tracking-tight uppercase">
            Create <span className="text-[#C87740]">Account</span>
          </h2>
          <p className="text-[#004643]/60 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Join the next generation of placement excellence</p>
        </header>

        <div className="w-full max-w-4xl bg-white p-12 rounded-[3rem] border-2 border-[#004643]/5 shadow-sm space-y-10">
          
          {/* Role Selection Tabs */}
          <div className="flex gap-2 p-1.5 bg-[#F0EDE5] rounded-3xl border border-[#004643]/5 max-w-xl mx-auto">
            {[
              { id: 'student', icon: GraduationCap, label: 'Student' },
              { id: 'recruiter', icon: Building2, label: 'Recruiter' },
              { id: 'admin', icon: ShieldCheck, label: 'Admin' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setRole(item.id)}
                type="button"
                className={`flex-1 flex flex-col items-center py-4 rounded-2xl transition-all ${
                  role === item.id 
                    ? 'bg-[#004643] text-[#F0EDE5] shadow-lg' 
                    : 'text-[#004643]/40 hover:bg-[#004643]/5 hover:text-[#004643]'
                }`}
              >
                <item.icon size={20} className="mb-2" />
                <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-8 pt-6 border-t border-[#004643]/5">
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#004643]/40 block mb-3">Full Name</label>
              <input name="fullName" type="text" required placeholder="Enter your full name" className="w-full bg-[#F0EDE5] border border-[#004643]/10 rounded-2xl px-6 py-4 font-bold outline-none focus:border-[#C87740]" />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#004643]/40 block mb-3">Email Address</label>
              <input name="email" type="email" required placeholder="example@university.edu" className="w-full bg-[#F0EDE5] border border-[#004643]/10 rounded-2xl px-6 py-4 font-bold outline-none focus:border-[#C87740]" />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#004643]/40 block mb-3">Create Password</label>
              <input name="password" type="password" required placeholder="Min 8 characters" className="w-full bg-[#F0EDE5] border border-[#004643]/10 rounded-2xl px-6 py-4 font-bold outline-none focus:border-[#C87740]" />
            </div>

            <div className="md:col-span-2 pt-6 flex items-center justify-between gap-6 border-t border-[#004643]/5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#004643]/40">Already Verified? <Link to="/login" className="text-[#C87740]">Sign In</Link></p>
              <button disabled={loading} type="submit" className="px-10 py-4 bg-[#C87740] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all flex items-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={18} /> : `Initialize ${role}`}
              </button>
            </div>
          </form>

          <div className="pt-10 border-t border-[#004643]/5 flex flex-col items-center">
            <span className="text-[9px] font-black text-[#004643]/30 uppercase tracking-[0.3em] mb-6">Social Gateway</span>
            <div className="flex gap-4">
              <button onClick={handleGoogleSignUp} type="button" className="flex items-center gap-3 px-8 py-3 bg-white border border-[#004643]/10 rounded-full text-[10px] font-black text-[#004643] uppercase shadow-sm hover:shadow-lg transition-all active:scale-95">
                <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-4 w-4" />
                Google
              </button>
              <button type="button" className="flex items-center gap-3 px-8 py-3 bg-white border border-[#004643]/10 rounded-full text-[10px] font-black text-[#004643] uppercase shadow-sm hover:shadow-lg transition-all active:scale-95 opacity-50 cursor-not-allowed">
                <img src="https://authjs.dev/img/providers/facebook.svg" alt="Facebook" className="h-4 w-4" />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;