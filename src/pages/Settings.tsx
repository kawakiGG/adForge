import { useState } from 'react';
import { User, Shield, Key, Eye, EyeOff, Save, Check } from 'lucide-react';
import { PrimaryButton } from '../components/Buttons';

export default function Settings() {
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex@ugcmaker.ai');
  const [openaiKey, setOpenaiKey] = useState('sk-proj-••••••••••••••••••••');
  const [heygenKey, setHeygenKey] = useState('hg-api-••••••••••••••••••••');
  const [sdKey, setSdKey] = useState('sd-sec-••••••••••••••••••••');

  const [showOpenai, setShowOpenai] = useState(false);
  const [showHeygen, setShowHeygen] = useState(false);
  const [showSd, setShowSd] = useState(false);

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Preferences toggles
  const [autoDownload, setAutoDownload] = useState(true);
  const [emailNotify, setEmailNotify] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    setTimeout(() => {
      setSaveStatus('saved');
      
      // Update session storage
      const session = localStorage.getItem('user_session');
      if (session) {
        try {
          const parsed = JSON.parse(session);
          parsed.name = name;
          parsed.email = email;
          localStorage.setItem('user_session', JSON.stringify(parsed));
        } catch (e) {
          // ignore
        }
      }

      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24">
      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* PROFILE INFORMATION */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <User size={16} /> Profile Details
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Update your primary account identity and email parameters.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full px-4 py-3 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl text-xs text-slate-100 dark:text-slate-100 light:text-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-3 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl text-xs text-slate-100 dark:text-slate-100 light:text-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* API KEY INTEGRATIONS */}
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2 mb-1">
              <Key size={16} /> API Integration & Keys
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Provide custom developer credentials to run hooks and videos on your own service instances.</p>
          </div>

          <div className="space-y-4">
            {/* OpenAI API Key */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/30 dark:bg-slate-950/30 light:bg-slate-50 border border-slate-850 dark:border-slate-850 light:border-slate-200">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-700">OpenAI API Key</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">Used for generating script variations and tone options.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type={showOpenai ? 'text' : 'password'}
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 bg-slate-950/50 dark:bg-slate-950/50 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-lg text-xs text-slate-300 dark:text-slate-300 light:text-slate-950 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowOpenai(!showOpenai)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showOpenai ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* HeyGen API Key */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/30 dark:bg-slate-950/30 light:bg-slate-50 border border-slate-850 dark:border-slate-850 light:border-slate-200">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-700">HeyGen API Key</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">Used for model avatar voice matching and rendering video streams.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type={showHeygen ? 'text' : 'password'}
                  value={heygenKey}
                  onChange={(e) => setHeygenKey(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 bg-slate-950/50 dark:bg-slate-950/50 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-lg text-xs text-slate-300 dark:text-slate-300 light:text-slate-950 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowHeygen(!showHeygen)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showHeygen ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Stable Diffusion API Key */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/30 dark:bg-slate-950/30 light:bg-slate-50 border border-slate-850 dark:border-slate-850 light:border-slate-200">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-700">Stable Diffusion API Key</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">Used for generating the high-quality product lifestyle mockups.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type={showSd ? 'text' : 'password'}
                  value={sdKey}
                  onChange={(e) => setSdKey(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 bg-slate-950/50 dark:bg-slate-950/50 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-lg text-xs text-slate-300 dark:text-slate-300 light:text-slate-950 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowSd(!showSd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showSd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* WORKSPACE PREFERENCES */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <Shield size={16} /> Preferences
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Configure dashboard automated behaviors.</p>
          
          <div className="space-y-3">
            {/* Auto download toggle */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/20 dark:bg-slate-950/20 light:bg-slate-50 border border-slate-850 dark:border-slate-850 light:border-slate-200 cursor-pointer">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-700">Auto-Download Rendered Ads</div>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">Automatically trigger browser download when variation rendering hits 100%.</p>
              </div>
              <input
                type="checkbox"
                checked={autoDownload}
                onChange={() => setAutoDownload(!autoDownload)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-850 focus:ring-indigo-500 focus:ring-offset-slate-950"
              />
            </label>

            {/* Email Notifications */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/20 dark:bg-slate-950/20 light:bg-slate-50 border border-slate-850 dark:border-slate-850 light:border-slate-200 cursor-pointer">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-700">Marketing & Tips Newsletter</div>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">Receive periodic emails about best-performing hook templates and UGC trends.</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotify}
                onChange={() => setEmailNotify(!emailNotify)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-850 focus:ring-indigo-500 focus:ring-offset-slate-950"
              />
            </label>
          </div>
        </div>

        {/* Global Save Changes Action */}
        <div className="flex justify-end pt-2">
          <PrimaryButton
            type="submit"
            disabled={saveStatus === 'saving'}
            className="px-6 py-3 justify-center text-xs font-bold rounded-xl relative overflow-hidden text-white"
          >
            {saveStatus === 'saving' ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saveStatus === 'saved' ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Check size={14} /> Saved Successfully
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Save size={14} /> Save Preferences
              </span>
            )}
          </PrimaryButton>
        </div>

      </form>
    </div>
  );
}
