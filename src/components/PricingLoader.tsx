import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PricingLoaderProps {
  progress: number;
}

const PricingLoader: React.FC<PricingLoaderProps> = ({ progress }) => {
  const steps = [
    "Inbound connection...",
    "Mapping Cyber Alert Nepal assets...",
    "Retrieving SMS_tiers...",
    "Analyzing security vectors...",
  ];
  const [logs, setLogs] = useState<{ id: number; msg: string }[]>([]);

  useEffect(() => {
    const step = Math.floor((progress / 100) * steps.length);
    if (step < steps.length && !logs.find((l) => l.msg === steps[step])) {
      setLogs((prev) => [...prev, { id: Date.now(), msg: steps[step] }]);
    }
  }, [progress]);

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/20 p-10 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.1)]">
      <div className="space-y-2 mb-10 h-28 overflow-hidden flex flex-col justify-end font-mono">
        {logs.map((log) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={log.id}
            className="text-[10px] text-blue-500/60 uppercase"
          >
            {">"} {log.msg}
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-blue-900 mb-3 font-black">
        <span>Authorization_Scan</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 bg-blue-950 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default PricingLoader;
