import { useState } from 'react';
import Title from '../components/Title';
import { dummyGenerations } from '../assets/assets';
import { Heart, MessageSquare, Copy, Check, Play, ExternalLink } from 'lucide-react';

export default function Community() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extend dummyGenerations with social metrics for community showcase
  const communityItems = dummyGenerations.map((item, idx) => ({
    ...item,
    creatorName: `@creator_${idx + 1}`,
    likes: 120 + idx * 85,
    comments: 12 + idx * 7,
    hookText: item.userPrompt
  }));

  const handleCopyHook = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pb-24 space-y-12">
      <Title 
        title="Community Showcase" 
        heading="Viral UGC Ads Gallery" 
        description="See what other creators and agencies are building. Copy high-performing hook templates to your clipboard."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {communityItems.map((item) => (
          <div 
            key={item.id}
            className="glass-panel rounded-3xl overflow-hidden group flex flex-col justify-between"
          >
            {/* Viewport Frame */}
            <div className="relative aspect-16/10 bg-slate-900 overflow-hidden border-b border-slate-800/80">
              <img 
                src={item.generatedImage} 
                alt={item.productName} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              {/* Aspect Ratio Badge */}
              <span className="absolute top-3 left-3 text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded-full uppercase text-white">
                {item.aspectRatio}
              </span>

              {/* Play overlay button */}
              <button 
                onClick={() => alert(`Playing ad variation demo for "${item.productName}"...`)}
                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white backdrop-blur-xs cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-indigo-600/90 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play size={16} className="ml-0.5 fill-white" />
                </div>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4">
              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-400">{item.creatorName}</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                    Product: <strong>{item.productName}</strong>
                  </span>
                </div>
                <p className="text-xs text-slate-350 dark:text-slate-350 light:text-slate-600 line-clamp-2 leading-relaxed">
                  "{item.userPrompt}"
                </p>
              </div>

              {/* Copy Template Hook Trigger */}
              <button
                onClick={() => handleCopyHook(item.id, item.userPrompt)}
                className="w-full py-2.5 rounded-xl bg-slate-905 dark:bg-slate-905 light:bg-slate-50 hover:bg-slate-850 dark:hover:bg-slate-850 light:hover:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-700 font-semibold text-xs border border-slate-800 dark:border-slate-850 light:border-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedId === item.id ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Hook Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Hook Script</span>
                  </>
                )}
              </button>

              {/* Social Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 border-t border-slate-800/50 dark:border-slate-800/50 light:border-slate-200 pt-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer">
                    <Heart size={13} className="fill-transparent" /> {item.likes}
                  </span>
                  <span className="flex items-center gap-1 hover:text-indigo-400 transition-colors cursor-pointer">
                    <MessageSquare size={13} /> {item.comments}
                  </span>
                </div>
                <button 
                  onClick={() => alert(`Opening generation statistics for ${item.productName}...`)}
                  className="flex items-center gap-0.5 hover:text-slate-200 transition-colors text-[10px]"
                >
                  Stats <ExternalLink size={10} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}