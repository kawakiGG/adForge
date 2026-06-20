import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sparkles, Server, Cpu } from 'lucide-react';

const LOG_MESSAGES = [
  "Initializing UGC compilation engine...",
  "Analyzing product image contours...",
  "Drafting hook variations with OpenAI...",
  "Matching actor lip-sync tracks...",
  "Blending layers and stabilizing FPS...",
  "Rendering final 4K MP4 stream..."
];

export default function Loading() {
  const navigate = useNavigate();
  const [logIndex, setLogIndex] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Increment logs
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev + 1) % LOG_MESSAGES.length);
    }, 600);

    // Increment percent
    const percentInterval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(percentInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 120);

    // Redirect to default result page after 3.5s
    const timeout = setTimeout(() => {
      navigate('/result/dummy_1');
    }, 3500);

    return () => {
      clearInterval(logInterval);
      clearInterval(percentInterval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-md mx-auto text-center p-6 space-y-8">
      
      {/* Spinning graphics */}
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-20 h-20 text-indigo-500 animate-spin" />
        <div className="absolute w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
          <Sparkles size={16} className="animate-pulse" />
        </div>
      </div>

      <div className="space-y-3 w-full">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
          <span>AI Pipeline Status</span>
          <span>{percent}% Completed</span>
        </div>
        <div className="w-full bg-slate-900 border border-slate-850 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-100" 
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Compiler active log screen */}
      <div className="w-full bg-black/60 border border-slate-900 rounded-2xl p-4 font-mono text-[10px] text-left space-y-2 text-slate-400 relative overflow-hidden">
        <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          <Server size={10} /> Active Pipeline
        </div>
        
        <div className="flex items-center gap-2 text-indigo-400 font-bold">
          <Cpu size={12} />
          <span>[SYSTEM LOGS]</span>
        </div>

        <div className="space-y-1.5 pt-2 select-none h-14 overflow-hidden">
          <div className="text-slate-500">&gt; check_env: OK</div>
          <div className="text-slate-300 font-bold animate-pulse">&gt; {LOG_MESSAGES[logIndex]}</div>
        </div>
      </div>

      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
        Do not close this tab. The UGC Ad Maker platform is rendering audio assets and lip syncing your templates.
      </p>

    </div>
  );
}