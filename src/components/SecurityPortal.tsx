import React from "react";
// Removed ShieldAlert and Activity since they aren't used below
import { Lock } from "lucide-react";

const SecurityPortal: React.FC = () => {
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
          <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 mb-6">
            <Lock className="text-emerald-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Identity Verification
          </h2>
          <input
            type="text"
            placeholder="SECURE_ACCESS_ID"
            className="w-full bg-black/40 border border-slate-800 p-4 rounded-xl mb-4 focus:border-emerald-500 outline-none text-emerald-500"
          />
          <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition-all">
            UNLOCK PRICING
          </button>
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
