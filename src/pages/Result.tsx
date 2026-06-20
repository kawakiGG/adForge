import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, Download, Copy, Play, Sparkles, Share2 } from 'lucide-react';
import { dummyGenerations } from '../assets/assets';

export default function Result() {
  const { projectID } = useParams<{ projectID: string }>();
  const [currentCampaign, setCurrentCampaign] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Find the campaign in local storage first
    const saved = localStorage.getItem('campaigns');
    let found = null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        found = parsed.find((c: any) => c.id === projectID);
      } catch (e) {
        // ignore
      }
    }
    
    // Fallback to dummy data
    if (!found) {
      found = dummyGenerations.find((g: any) => g.id === projectID) || dummyGenerations[0];
    }
    
    setCurrentCampaign(found);
  }, [projectID]);

  const handleCopyScript = () => {
    if (currentCampaign) {
      const text = `HOOK: ${currentCampaign.script?.hook || currentCampaign.hook}\n\nBODY: ${currentCampaign.script?.body || ''}\n\nCTA: ${currentCampaign.script?.cta || ''}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log(err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!currentCampaign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-400">Loading campaign results...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24 text-left">
      
      {/* Back Button */}
      <Link 
        to="/my-campaigns" 
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors font-medium"
      >
        <ArrowLeft size={14} /> Back to Campaigns
      </Link>

      {/* Success banner */}
      <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Check size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">UGC Creative Successfully Generated!</h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Your AI-optimized script overlays and visual render variations are ready for download.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => alert(`Downloading high-fidelity ad variation for ${currentCampaign.productName}...`)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-97 transition-all text-white shadow-md shadow-indigo-600/15 cursor-pointer"
          >
            <Download size={14} /> Download MP4
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Video Preview & Mockups */}
        <div className="md:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center">
            
            {/* Viewport container */}
            <div className="relative w-full max-w-[260px] aspect-[9/18.5] bg-black rounded-[36px] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-8 h-1 bg-black rounded-full mb-1" />
              </div>

              {/* Viewport */}
              <div className="flex-1 w-full bg-slate-950 relative z-10 flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  src={currentCampaign.generatedVideo || currentCampaign.generatedVideo1}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onClick={togglePlay}
                />
                
                {/* Play Button Overlay */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
                  >
                    <Play size={18} className="ml-0.5 fill-white" />
                  </button>
                )}

                {/* UGC Details Overlay */}
                <div className="absolute bottom-4 left-3 right-3 bg-black/50 backdrop-blur-xs p-2.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">@aiugcadmaker</span>
                  <h4 className="text-[10px] font-bold truncate text-white">{currentCampaign.productName}</h4>
                  <p className="text-[9px] text-slate-350 line-clamp-2 leading-relaxed">
                    {currentCampaign.script?.hook || currentCampaign.hook}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 mt-4">
              Visual preview formatted in {currentCampaign.aspectRatio || '9:16'} mobile canvas.
            </p>
          </div>
        </div>

        {/* Right Side: Script variations & Details */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Ad script card */}
          <div className="glass-panel p-6 rounded-3xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Generated Ad Copy Script</h3>
              <button
                onClick={handleCopyScript}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:bg-slate-850 dark:hover:bg-slate-850 light:hover:bg-slate-100 text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-800 transition-all cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Script'}
              </button>
            </div>

            <div className="space-y-4">
              {/* Hook Segment */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider bg-indigo-950/40 border border-indigo-500/10 px-2 py-0.5 rounded">
                  Hook segment (0-3s)
                </span>
                <p className="text-xs text-slate-200 bg-slate-950/50 p-3.5 rounded-xl border border-slate-900 leading-relaxed">
                  {currentCampaign.script?.hook || currentCampaign.hook}
                </p>
              </div>

              {/* Body Segment */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/40 border border-emerald-500/10 px-2 py-0.5 rounded">
                  Body Pitch (3-12s)
                </span>
                <p className="text-xs text-slate-200 bg-slate-950/50 p-3.5 rounded-xl border border-slate-900 leading-relaxed">
                  {currentCampaign.script?.body || 'This product is a total lifesaver. It is super durable, waterproof and has a dedicated space for all my accessories. I carry it everywhere with me now.'}
                </p>
              </div>

              {/* CTA Segment */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider bg-sky-950/40 border border-sky-500/10 px-2 py-0.5 rounded">
                  Call to action (12-15s)
                </span>
                <p className="text-xs text-slate-200 bg-slate-950/50 p-3.5 rounded-xl border border-slate-900 leading-relaxed">
                  {currentCampaign.script?.cta || 'Click the link below to get yours today for 20% off!'}
                </p>
              </div>
            </div>
          </div>

          {/* Additional details */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">Campaign Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500">Product:</span>
                <p className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 truncate">{currentCampaign.productName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500">Format:</span>
                <p className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 uppercase">{currentCampaign.aspectRatio}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500">Length:</span>
                <p className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">{currentCampaign.targetLength || 15} seconds</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500">Generated:</span>
                <p className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  {new Date(currentCampaign.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-850 dark:border-slate-850 light:border-slate-200">
              <Link 
                to="/generate" 
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:bg-slate-805 dark:hover:bg-slate-805 light:hover:bg-slate-100 text-xs font-semibold transition-all text-slate-200 dark:text-slate-200 light:text-slate-800"
              >
                <Sparkles size={14} /> Create Another Variation
              </Link>
              <button 
                onClick={() => alert("Copied share link to clipboard!")}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:bg-slate-805 dark:hover:bg-slate-805 light:hover:bg-slate-100 text-xs font-semibold transition-all text-slate-250 dark:text-slate-250 light:text-slate-800"
              >
                <Share2 size={14} /> Share Creative
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}