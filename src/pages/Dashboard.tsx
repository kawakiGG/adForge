import { Link } from 'react-router-dom';
import { Video, Zap, TrendingUp, RefreshCw, ArrowRight, Play, Eye } from 'lucide-react';
import { dummyGenerations } from '../assets/assets';

interface DashboardProps {
  campaigns: any[];
}

export default function Dashboard({ campaigns }: DashboardProps) {
  // Combine custom generated ones with dummy data to look populated
  const displayCampaigns = campaigns.length > 0 ? campaigns : dummyGenerations.slice(0, 3);
  
  // Custom Analytics Chart variables
  const points = [
    { x: 0, y: 150 },
    { x: 80, y: 130 },
    { x: 160, y: 140 },
    { x: 240, y: 90 },
    { x: 320, y: 110 },
    { x: 400, y: 50 },
    { x: 480, y: 30 },
  ];
  
  const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;
  const areaD = `${pathD} L 480 200 L 0 200 Z`;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* HEADER HERO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-linear-to-r from-indigo-900/20 via-slate-900 to-indigo-950/10 border border-indigo-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="space-y-2 z-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
            Welcome to your UGC Workspace
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 max-w-lg">
            Create conversion-focused UGC video scripts, realistic models, and high-fidelity video variations instantly.
          </p>
        </div>
        <Link 
          to="/generate" 
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-97 text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 shrink-0 text-white"
        >
          <Video size={16} />
          Create New UGC Ad
        </Link>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-wider">Total Ads Generated</span>
            <div className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">{campaigns.length + 12}</div>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp size={10} /> +15% this week
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Video size={22} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-wider">Credits Remaining</span>
            <div className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">45 / 100</div>
            <div className="w-28 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
            <Zap size={22} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-wider">Avg. CTR Boost</span>
            <div className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">+24.8%</div>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp size={10} /> 4.2x baseline CTR
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <TrendingUp size={22} />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-wider">Active Campaigns</span>
            <div className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">8 Campaigns</div>
            <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">Across Facebook, TikTok</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
            <RefreshCw size={22} className="animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* GRAPH & TUTORIAL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Analytics graph */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">UGC Performance Improvement</h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Ad Click-Through Rates (CTR) post platform-generation</p>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs font-medium">
              Last 30 Days
            </div>
          </div>

          <div className="relative pt-4 w-full overflow-hidden">
            {/* SVG line chart */}
            <svg viewBox="0 0 480 200" className="w-full h-48 text-indigo-500" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Horizontal grid lines */}
              <line x1="0" y1="50" x2="480" y2="50" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="0" y1="100" x2="480" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="0" y1="150" x2="480" y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              {/* Glowing fill path */}
              <path d={areaD} fill="url(#gradient-area)" />
              {/* Line path */}
              <path d={pathD} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Dots */}
              {points.map((p, i) => (
                <circle 
                  key={i} 
                  cx={p.x} 
                  cy={p.y} 
                  r="4" 
                  fill="#ffffff" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  className="hover:scale-150 transition-transform cursor-pointer" 
                />
              ))}
            </svg>

            {/* Labels */}
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 mt-2 px-1">
              <span>May 20</span>
              <span>May 25</span>
              <span>May 30</span>
              <span>Jun 04</span>
              <span>Jun 09</span>
              <span>Jun 14</span>
              <span>Jun 20</span>
            </div>
          </div>
        </div>

        {/* Quick Launch / Resources */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-base font-bold mb-1.5 text-slate-100 dark:text-slate-100 light:text-slate-900">UGC Ads Masterclass</h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 leading-relaxed">
              Learn how hook combinations increase CTR and how aspect ratios affect CPM cost across networks.
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 group border border-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=350&fit=crop" 
              alt="UGC Video Lesson" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/45 transition-colors">
              <button 
                onClick={() => alert("Launching 5-minute platform demo video...")} 
                className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                <Play size={20} className="ml-1 fill-white" />
              </button>
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-semibold">
              4:12 mins
            </div>
          </div>

          <Link 
            to="/generate" 
            className="flex items-center justify-between text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Learn Hook Testing Strategies</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* RECENT CAMPAIGNS HEADER */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">Recent Ads & Variations</h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Quick view of your recently generated campaign variations</p>
          </div>
          <Link 
            to="/my-campaigns" 
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View All Campaigns</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* CAMPAIGNS LIST (GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayCampaigns.slice(0, 3).map((item: any) => (
            <div 
              key={item.id} 
              className="glass-panel rounded-2xl overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 bg-slate-900 overflow-hidden border-b border-slate-800/80">
                <img 
                  src={item.generatedImage} 
                  alt={item.productName} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
                />
                <span className="absolute top-2 left-2 text-[10px] font-semibold bg-black/60 px-2 py-0.5 rounded-full uppercase">
                  {item.aspectRatio}
                </span>
                
                <Link 
                  to="/my-campaigns" 
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-xs text-white"
                >
                  <Eye size={22} className="mr-2" />
                  <span className="text-xs font-semibold">View Variation</span>
                </Link>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-slate-100 dark:text-slate-100 light:text-slate-800 truncate">{item.productName}</h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 truncate leading-relaxed">
                  {item.productDescription}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">Duration: {item.targetLength}s</span>
                  <span className="text-[10px] text-indigo-400 dark:text-indigo-400 light:text-indigo-600 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
