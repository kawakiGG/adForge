import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download, 
  Share2, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  ExternalLink,
  X,
  Check,
  Video
} from 'lucide-react';
import { dummyGenerations } from '../assets/assets';

interface MyCampaignsProps {
  campaigns: any[];
  onSaveCampaigns: (campaigns: any[]) => void;
}

export default function MyCampaigns({ campaigns, onSaveCampaigns }: MyCampaignsProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [ratioFilter, setRatioFilter] = useState('All');
  
  // Share dialog states
  const [sharingItem, setSharingItem] = useState<any | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Combine user-created campaigns with dummy data
  const allCampaigns = [...campaigns, ...dummyGenerations];

  // Filter campaigns
  const filteredCampaigns = allCampaigns.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.productDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRatio = ratioFilter === 'All' || item.aspectRatio === ratioFilter;
    return matchesSearch && matchesRatio;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this campaign creative?")) {
      const updated = campaigns.filter(c => c.id !== id);
      onSaveCampaigns(updated);
    }
  };

  const handleEdit = (item: any) => {
    // Save to localStorage for Generator page to pick up
    localStorage.setItem('edit_campaign', JSON.stringify({
      productName: item.productName,
      productDescription: item.productDescription,
      aspectRatio: item.aspectRatio,
      hook: item.hook || (item.script ? item.script.hook : '')
    }));
    navigate('/generate');
  };

  const handleDownload = (item: any) => {
    alert(`Downloading high-converting UGC ${item.aspectRatio} ad for "${item.productName}"...`);
    // Create a mock trigger
    const link = document.createElement('a');
    link.href = item.generatedVideo;
    link.download = `${item.productName.replace(/\s+/g, '_')}_UGC_${item.aspectRatio}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openShareModal = (item: any) => {
    setSharingItem(item);
    setCopiedLink(false);
  };

  const copyShareLink = () => {
    if (sharingItem) {
      navigator.clipboard.writeText(`https://ugcadmaker.ai/share/${sharingItem.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-24">
      
      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 dark:bg-slate-900/40 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-4 py-2.5 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl text-xs text-slate-100 dark:text-slate-100 light:text-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-1.5 shrink-0">
            <Filter size={14} /> Filter by Aspect:
          </span>
          <div className="flex bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-100 p-1 rounded-lg border border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 shrink-0">
            {['All', '9:16', '1:1', '16:9'].map((ratio) => (
              <button
                key={ratio}
                onClick={() => setRatioFilter(ratio)}
                className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all ${
                  ratioFilter === ratio 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900'
                }`}
              >
                {ratio === 'All' ? 'All Formats' : ratio}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MATRIX GRID LIST */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/20 dark:bg-slate-900/20 light:bg-white border border-dashed border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 rounded-3xl">
          <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500">No campaigns found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((item) => (
            <div 
              key={item.id} 
              className="glass-panel rounded-3xl overflow-hidden group flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-16/10 bg-slate-900 overflow-hidden border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80">
                <img 
                  src={item.generatedImage} 
                  alt={item.productName} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
                />
                
                {/* Ratio badge */}
                <span className="absolute top-3 left-3 text-[10px] font-bold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full uppercase text-white">
                  {item.aspectRatio}
                </span>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 text-[10px] font-bold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-white flex items-center gap-1">
                  <Video size={10} /> {item.targetLength || 15}s
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-100 dark:text-slate-100 light:text-slate-800 truncate">{item.productName}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 line-clamp-2 leading-relaxed">
                    {item.productDescription}
                  </p>
                </div>

                {/* Card Quick Actions */}
                <div className="flex items-center justify-between border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 pt-4 mt-2">
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                    Created {new Date(item.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(item)}
                      title="Load into Builder"
                      className="p-1.5 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 text-slate-400 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-800 transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                    {/* Share */}
                    <button
                      onClick={() => openShareModal(item)}
                      title="Share link"
                      className="p-1.5 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 text-slate-400 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-800 transition-colors"
                    >
                      <Share2 size={14} />
                    </button>
                    {/* Download */}
                    <button
                      onClick={() => handleDownload(item)}
                      title="Download video"
                      className="p-1.5 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 text-slate-400 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-800 transition-colors"
                    >
                      <Download size={14} />
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Delete Campaign"
                      className="p-1.5 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SHARE MODAL OVERLAY */}
      {sharingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xs z-50 p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 relative shadow-2xl text-left">
            <button 
              onClick={() => setSharingItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X size={18} />
            </button>
            <h3 className="text-base font-bold mb-2">Share UGC Creative</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Anyone with this link can view the generated script, mockups, and play the generated video variation.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={`https://ugcadmaker.ai/share/${sharingItem.id}`}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-300 focus:outline-hidden"
              />
              <button
                onClick={copyShareLink}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs rounded-xl flex items-center gap-1 transition-all text-white cursor-pointer"
              >
                {copiedLink ? <Check size={14} /> : <ExternalLink size={14} />}
                {copiedLink ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
