import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import cyberLogo from "../assets/cyber.jpeg";
import "../signin-animations.css";

interface SecurityPortalProps {
  onLoginSuccess: () => void;
}

const SecurityPortal: React.FC<SecurityPortalProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setSuccess(true);
      setTimeout(() => onLoginSuccess(), 2000);
    }
  };

  return (
    <div className="h-screen w-full grid grid-cols-12 bg-[#020617] text-emerald-500 font-mono">
      {/* Phishing Alerts */}
      <div className="col-span-3 border-r border-emerald-900/30 p-4 space-y-4 bg-black/20 overflow-y-auto">
        <h3 className="text-[10px] text-emerald-800 font-black uppercase tracking-widest border-b border-emerald-900/30 pb-2">
          Active Threats
        </h3>
        <div className="p-2 border border-red-900/20 bg-red-950/5 text-[10px] text-red-500 animate-pulse">
          [DETECTED] Phishing origin: RU_SERVER_01
        </div>
        <div className="p-2 border border-red-900/20 bg-red-950/5 text-[10px] text-red-500 animate-pulse">
          [DETECTED] Credential stuffing attempt
        </div>
      </div>

      {/* The Login/Scan Area: centered */}
      <div className="col-span-6 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md bg-slate-950/40 border border-emerald-500/20 p-10 rounded-3xl backdrop-blur-2xl shadow-[0_0_50px_rgba(16,185,129,0.1)] text-center">
          {/* Interactive Cyber Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={cyberLogo}
              alt="Cyber Logo"
              className="animate-jump"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))",
                padding: "8px",
              }}
            />
          </div>

          {success ? (
            <div className="space-y-4 animate-tada">
              <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 mb-2">
                <span className="text-4xl">✔</span>
              </div>
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">
                UNLOCKED
              </h2>
              <p className="text-sm text-emerald-300">Access granted! 🎉</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">
                Identity Verification
              </h2>

              {/* Email Field */}
              <div className="relative">
                <Mail
                  className="absolute left-4 top-4 text-emerald-500"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-slate-800 p-4 pl-12 rounded-xl focus:border-emerald-500 outline-none text-emerald-500 placeholder-slate-600"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock
                  className="absolute left-4 top-4 text-emerald-500"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-slate-800 p-4 pl-12 rounded-xl focus:border-emerald-500 outline-none text-emerald-500 placeholder-slate-600"
                />
              </div>

              <button
                type="submit"
                disabled={success}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-black rounded-xl transition-all animate-pulse"
              >
                UNLOCK PRICING
              </button>
            </form>
          )}
        </div>
      </div>

      {/* System Logs */}
      <div className="col-span-3 border-l border-emerald-900/30 p-4 space-y-4 bg-black/20 overflow-y-auto">
        <h3 className="text-[10px] text-emerald-800 font-black uppercase tracking-widest border-b border-emerald-900/30 pb-2">
          Traffic Analysis
        </h3>
        <div className="text-[10px] text-emerald-700 opacity-70">
          {">"} Node cluster synchronized...
        </div>
        <div className="text-[10px] text-emerald-700 opacity-70">
          {">"} RSA-4096 handshake successful...
        </div>
      </div>
    </div>
  );
};

export default SecurityPortal;
