import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Eye,
  EyeOff,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";
import PricingLoader from "./components/PricingLoader";

const ALERT_MESSAGES = [
  "SQL_INJECTION",
  "MALWARE_LOADED",
  "BREACH_ATTEMPT",
  "UNAUTHORIZED_IP",
];

type Stage = "scanning" | "login" | "dashboard";

const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>("scanning");
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showAccessBox, setShowAccessBox] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPricing, setShowPricing] = useState(false);

  const [randomAlerts] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      msg: ALERT_MESSAGES[Math.floor(Math.random() * ALERT_MESSAGES.length)],
      top: Math.random() * 80 + 10 + "%",
      left: Math.random() * 80 + 10 + "%",
      isCritical: Math.random() > 0.6,
      delay: Math.random() * 0.8,
    })),
  );

  useEffect(() => {
    if (stage === "scanning") {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setStage("login"), 400);
            return 100;
          }
          return prev + 2.5;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [stage]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAccessBox(true);
    setStage("dashboard");
    // Timing: Show Access Box -> Hide it after 1.5s -> Then show Pricing Cards
    setTimeout(() => {
      setShowAccessBox(false);
      setTimeout(() => setShowPricing(true), 400);
    }, 1500);
  };

  return (
    <div
      className={`min-h-screen font-mono flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-900"}`}
    >
      {/* THEME TOGGLE */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-6 right-6 z-[110] p-3 rounded-full border-2 transition-all ${isDarkMode ? "border-blue-600 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white" : "border-slate-300 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-600"}`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* BACKGROUND ALERTS */}
      <AnimatePresence>
        {(stage === "scanning" || stage === "login") && (
          <div className="absolute inset-0 pointer-events-none">
            {randomAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity:
                    stage === "scanning" ? (isDarkMode ? 0.7 : 0.4) : 0.1,
                  scale: 1,
                }}
                exit={{ opacity: 0 }}
                className="absolute"
                style={{ top: alert.top, left: alert.left }}
              >
                <div
                  className={`px-2 py-1 border text-[9px] font-black uppercase ${alert.isCritical ? "border-red-600 text-red-600 bg-red-600/5" : "border-blue-600 text-blue-500 bg-blue-600/5"}`}
                >
                  {alert.isCritical ? "!!" : ">"} {alert.msg}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ACCESS GRANTED POPUP */}
      <AnimatePresence>
        {showAccessBox && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            className={`fixed z-[100] border-b-4 border-blue-600 px-10 py-6 rounded-2xl shadow-2xl flex flex-col items-center ${isDarkMode ? "bg-white" : "bg-slate-900"}`}
          >
            <div className="bg-blue-600/10 p-3 rounded-full mb-3">
              <ShieldCheck className="text-blue-600" size={32} />
            </div>
            <h1 className="text-blue-600 font-black text-2xl uppercase tracking-tighter italic">
              Access Granted
            </h1>
            <p
              className={`${isDarkMode ? "text-slate-400" : "text-slate-500"} text-[10px] uppercase font-bold mt-1 tracking-widest`}
            >
              Authorized Personnel Verified
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`z-20 w-full transition-all duration-700 ${stage === "dashboard" ? "max-w-7xl px-6" : "max-w-lg"}`}
      >
        <AnimatePresence mode="wait">
          {/* SCANNER */}
          {stage === "scanning" && (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className={`border-2 border-blue-600 rounded-2xl p-8 shadow-[0_0_50px_rgba(37,99,235,0.3)] ${isDarkMode ? "bg-black" : "bg-[#0a1120]"}`}
            >
              <div className="text-white">
                <PricingLoader progress={progress} />
              </div>
              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                <span className="text-blue-400 text-[9px] uppercase tracking-[0.4em] font-bold">
                  Scanning for vulnerabilities...
                </span>
              </div>
            </motion.div>
          )}

          {/* LOGIN WINDOW */}
          {stage === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -12, 0], // Jumping/Floating animation
              }}
              transition={{
                opacity: { duration: 0.4 },
                y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
              }}
              className={`border-t-4 border-t-blue-600 border-x-2 border-x-blue-600 border-b-2 border-b-blue-600 rounded-3xl p-10 shadow-2xl mx-auto max-w-[400px] relative mt-12 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-white"}`}
            >
              {/* COMPANY LOGO AREA */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl border-4 border-blue-600 overflow-hidden"
                >
                  <img
                    src="/cyber.jpeg"
                    alt="Cyber Logo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/150?text=CYBER";
                    }}
                  />
                </motion.div>
              </div>

              <div className="text-center mb-8 mt-10">
                <div className="bg-red-600/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-600/20">
                  <ShieldAlert className="text-red-600" size={24} />
                </div>
                <h2
                  className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  Sign In Required
                </h2>
                <p className="text-blue-500/60 text-[10px] uppercase tracking-widest mt-2 font-bold italic">
                  Secure Access Portal
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 font-sans">
                <input
                  type="email"
                  required
                  placeholder="Security ID"
                  className={`w-full px-4 py-3 border border-blue-600/30 rounded-lg outline-none focus:border-blue-600 transition-all ${isDarkMode ? "bg-black text-white" : "bg-slate-50 text-slate-900"}`}
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    className={`w-full px-4 py-3 border border-blue-600/30 rounded-lg outline-none focus:border-blue-600 transition-all ${isDarkMode ? "bg-black text-white" : "bg-slate-50 text-slate-900"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-blue-600/30 hover:text-blue-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-slate-900 text-white py-4 rounded-lg font-black text-xs uppercase tracking-widest transition-all border border-blue-600 shadow-lg shadow-blue-600/10"
                >
                  Sign In
                </button>
              </form>
            </motion.div>
          )}

          {/* DASHBOARD */}
          {stage === "dashboard" && (
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2
                  className={`text-5xl font-black uppercase tracking-tighter ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  System Access
                </h2>
                <p className="text-blue-500 font-bold mt-2 uppercase text-xs tracking-[0.4em]">
                  Secure Portal:{" "}
                  <span className="text-red-600">Cyber Alert</span> Nepal
                </p>
              </motion.div>

              {/* PRICING CARDS - Gated by showPricing state */}
              {showPricing && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PricingCard
                    isDark={isDarkMode}
                    delay={0.1}
                    tier="Basic Defense"
                    price="0.00"
                    features={["10k API Requests", "Asset Takedown", "Reports"]}
                  />
                  <PricingCard
                    isDark={isDarkMode}
                    delay={0.2}
                    tier="Personal Shield"
                    price="499.00"
                    featured
                    features={[
                      "Hygiene Report",
                      "Phishing Detection",
                      "24/7 Alerts",
                    ]}
                  />
                  <PricingCard
                    isDark={isDarkMode}
                    delay={0.3}
                    tier="Business Protect"
                    price="2499.00"
                    color="red"
                    features={[
                      "Breach Alert",
                      "Employee Training",
                      "User Mgmt",
                    ]}
                  />
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function PricingCard({
  tier,
  price,
  features,
  delay,
  isDark,
  featured = false,
  color = "blue",
}: any) {
  const accentBorder = color === "red" ? "border-red-600" : "border-blue-600";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`p-8 rounded-[2rem] border-2 flex flex-col h-full transition-colors duration-500 ${isDark ? "bg-[#0a0a0a]" : "bg-white"} ${accentBorder} ${featured ? "shadow-[0_10px_40px_rgba(37,99,235,0.1)]" : "border-opacity-30"}`}
    >
      <h3
        className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
      >
        {tier}
      </h3>
      <div className="mb-6">
        <span className="text-blue-600/50 text-xs font-black uppercase tracking-widest text-[10px]">
          Rs.
        </span>
        <span
          className={`text-4xl font-black ml-2 ${isDark ? "text-white" : "text-slate-900"}`}
        >
          {price}
        </span>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((f: string, i: number) => (
          <li
            key={i}
            className={`flex gap-3 text-[11px] items-start font-sans ${isDark ? "text-white/50" : "text-slate-600"}`}
          >
            <Check
              size={14}
              className={color === "red" ? "text-red-600" : "text-blue-600"}
            />{" "}
            {f}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${color === "red" ? "bg-red-600" : "bg-blue-600"} text-white hover:opacity-80`}
      >
        Select Plan
      </button>
    </motion.div>
  );
}

export default App;
