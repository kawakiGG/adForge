import { useState, useEffect, useRef } from "react";
import Title from "../components/Title";
import UploadZone from "../components/UploadZone";
import { assets } from "../assets/assets";
import { Copy, Check, Sparkles, Volume2, Play, RefreshCw } from "lucide-react";

interface GeneratorProps {
  campaigns: any[];
  onSaveCampaigns: (campaigns: any[]) => void;
}

const PREBUILT_HOOKS = [
  { label: "Before & After", text: "Before I started using this, my routine was a mess. But after..." },
  { label: "Wish I Knew Sooner", text: "I wish I knew this sooner! This absolute game-changer has literally..." },
  { label: "TikTok Buy", text: "So TikTok made me buy this, and honestly, let me tell you if it is actually worth the hype..." },
  { label: "Stop Scrolling", text: "Stop scrolling if you want to fix your daily problems in under 10 seconds..." }
];

const TONE_OPTIONS = ["Enthusiastic", "Honest Review", "Problem-Solver", "Unboxing", "Professional", "Funny"];

const Generator = ({ campaigns, onSaveCampaigns }: GeneratorProps) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [selectedTones, setSelectedTones] = useState<string[]>(["Honest Review"]);
  const [selectedHook, setSelectedHook] = useState(PREBUILT_HOOKS[0].text);
  const [customHook, setCustomHook] = useState("");
  
  // Generation Simulator state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState("");
  
  // Active Preview states
  const [activeTab, setActiveTab] = useState<"script" | "video" | "image">("script");
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Default display preview content
  const [currentPreview, setCurrentPreview] = useState<any>({
    productName: "Trolly Bag",
    productDescription: "Sky Colored Trolly Bag, durable, waterproof and compact.",
    aspectRatio: "9:16",
    hook: "Before I started using this, my routine was a mess. But after...",
    script: {
      hook: "Before I started using this, my routine was a mess. But after...",
      body: "I got my hands on the UGC Ads Maker Trolly Bag. This bag is an absolute lifesaver. It is super lightweight, completely waterproof, and has a dedicated space for all my electronics. Traveling has never been this stress-free.",
      cta: "Click below to grab yours today and get 20% off your first travel purchase!"
    },
    generatedImage: assets.generated1,
    generatedVideo: assets.generatedVideo1
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "product" | "model") => {
    if (e.target.files && e.target.files[0]) {
      if (type === "product") setProductImage(e.target.files[0]);
      else setModelImage(e.target.files[0]);
    }
  };

  const toggleTone = (tone: string) => {
    if (selectedTones.includes(tone)) {
      setSelectedTones(selectedTones.filter(t => t !== tone));
    } else {
      setSelectedTones([...selectedTones, tone]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName) {
      alert("Please enter a product name first.");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStep("Analyzing product parameters...");
    setIsPlaying(false);
    setActiveTab("script");
  };

  // Generation progress simulator
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setGenerationProgress(prev => {
          const next = prev + 5;
          if (next >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            
            // Generate Mock Ad Result
            const hookText = customHook || selectedHook;
            const newAd = {
              id: `gen_${Date.now()}`,
              productName,
              productDescription: productDescription || "Custom AI UGC generated creative",
              aspectRatio,
              targetLength: 15,
              hook: hookText,
              script: {
                hook: hookText,
                body: `Honestly, this ${productName} completely changed how I think about my daily routine. The benefits are unreal, especially the build quality and simple design. I've recommended it to all my friends already!`,
                cta: `Tap the link to buy the ${productName} right now and claim your limited time launch discount!`
              },
              generatedImage: aspectRatio === "16:9" ? assets.generated4 : assets.generated2,
              generatedVideo: aspectRatio === "16:9" ? assets.generatedVideo2 : assets.generatedVideo1,
              isGenerating: false,
              isPublished: false,
              createdAt: new Date().toISOString()
            };

            // Save to campaigns list
            onSaveCampaigns([newAd, ...campaigns]);
            setCurrentPreview(newAd);
            setActiveTab("video");
            return 100;
          }

          // Stepper messages based on progress percentage
          if (next < 25) setGenerationStep("Analyzing product assets...");
          else if (next < 50) setGenerationStep("Writing optimized high-converting copy...");
          else if (next < 75) setGenerationStep("Synthesizing model photo into lifestyle mockup...");
          else setGenerationStep("Rendering 4K social-ready UGC ad variation...");

          return next;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Copy script logic
  const handleCopyScript = () => {
    const fullText = `HOOK: ${currentPreview.script.hook}\n\nBODY: ${currentPreview.script.body}\n\nCTA: ${currentPreview.script.cta}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Video play toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(_err => console.log("Video play interrupted"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen text-white max-w-6xl mx-auto pb-24">
      <Title 
        title="UGC Builder" 
        heading="Generate UGC Ad Creative" 
        description="Upload product images and model photos. AI will automatically draft script templates, mockups, and video render variations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        
        {/* LEFT COLUMN: FORM INPUTS */}
        <form onSubmit={handleGenerate} className="lg:col-span-7 space-y-6 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/85 p-6 rounded-3xl">
          
          {/* Section 1: Product Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">1. Product Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 mb-1.5">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Ergonomic Sneakers" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="block w-full px-4 py-3 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl text-sm text-slate-100 dark:text-slate-100 light:text-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 mb-1.5">Product Description & Core Benefits</label>
                <textarea 
                  rows={3}
                  placeholder="e.g. Pain-relief sole, memory foam cushion, suitable for running and all-day casual wear." 
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="block w-full px-4 py-3 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl text-sm text-slate-100 dark:text-slate-100 light:text-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Upload Zone */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">2. Upload Source Assets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UploadZone 
                label="Product Image (PNG/JPG)" 
                file={productImage} 
                onClear={() => setProductImage(null)} 
                onChange={(e) => handleFileChange(e, 'product')} 
              />
              <UploadZone 
                label="Actor/Model Image (Optional)" 
                file={modelImage} 
                onClear={() => setModelImage(null)} 
                onChange={(e) => handleFileChange(e, 'model')} 
              />
            </div>
          </div>

          {/* Section 3: Ad Style & Ratio */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">3. Creative Formatting</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Aspect Ratio */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600">Video Aspect Ratio</label>
                <div className="flex gap-2">
                  {[
                    { label: "Vertical 9:16", value: "9:16" },
                    { label: "Square 1:1", value: "1:1" },
                    { label: "Feed 4:5", value: "4:5" }
                  ].map((ratio) => (
                    <button
                      key={ratio.value}
                      type="button"
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                        aspectRatio === ratio.value 
                          ? "bg-indigo-600 border-indigo-500 text-white" 
                          : "bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-100 border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900"
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone Multi-select */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600">Tone / Persona</label>
                <div className="flex flex-wrap gap-1.5">
                  {TONE_OPTIONS.map((tone) => {
                    const isSelected = selectedTones.includes(tone);
                    return (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => toggleTone(tone)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border transition-all duration-200 ${
                          isSelected 
                            ? "bg-indigo-600/20 border-indigo-500 text-indigo-300" 
                            : "bg-slate-950/20 dark:bg-slate-950/20 light:bg-slate-100 border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600"
                        }`}
                      >
                        {tone}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Hook Selection */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">4. UGC Scroll-Stopping Hook</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PREBUILT_HOOKS.map((hook) => (
                <button
                  key={hook.label}
                  type="button"
                  onClick={() => { setSelectedHook(hook.text); setCustomHook(""); }}
                  className={`p-3 text-left rounded-xl border text-xs leading-relaxed transition-all duration-200 ${
                    selectedHook === hook.text && !customHook 
                      ? "bg-indigo-600/10 border-indigo-500 text-indigo-300" 
                      : "bg-slate-950/20 dark:bg-slate-950/20 light:bg-slate-50 border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold mb-1 text-slate-200 dark:text-slate-200 light:text-slate-800">{hook.label}</div>
                  <p className="line-clamp-2 text-slate-400 dark:text-slate-400 light:text-slate-500">{hook.text}</p>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 mb-1.5">Or write custom hook</label>
              <input 
                type="text" 
                placeholder="e.g. My husband hates when I buy things, but he loved this because..."
                value={customHook}
                onChange={(e) => setCustomHook(e.target.value)}
                className="block w-full px-4 py-3 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl text-sm text-slate-100 dark:text-slate-100 light:text-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:from-indigo-800 disabled:to-indigo-900 active:scale-98 transition-all font-semibold text-sm cursor-pointer shadow-lg shadow-indigo-600/10 text-white"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Simulating AI Generator...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate UGC Ad Creative</span>
              </>
            )}
          </button>

        </form>

        {/* RIGHT COLUMN: PREVIEW VIEWPORT */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center">
            
            {/* Viewport header tabs */}
            <div className="flex bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 p-1 rounded-xl w-full mb-6">
              {[
                { label: "AI Script", value: "script" },
                { label: "Video Variation", value: "video" },
                { label: "Image Ad", value: "image" }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value as any)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === tab.value 
                      ? "bg-indigo-600 text-white shadow-md" 
                      : "text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Smartphone shell frame */}
            <div className="relative w-full max-w-[280px] aspect-[9/18.5] bg-black rounded-[40px] border-[10px] border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-black rounded-full mb-1" />
              </div>

              {/* Viewport Content */}
              <div className="flex-1 w-full h-full bg-slate-950 relative z-10 flex flex-col justify-between p-4 pt-8">
                
                {/* 1. SKELETON LOADER STATE */}
                {isGenerating ? (
                  <div className="flex-1 flex flex-col justify-center items-center text-center space-y-5 p-4">
                    <div className="relative flex h-14 w-14 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex size-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                        <Sparkles size={20} />
                      </span>
                    </div>

                    <div className="space-y-2 w-full">
                      <div className="text-sm font-bold">{generationProgress}%</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 italic px-2">{generationStep}</div>
                      
                      {/* Stepper skeleton blocks */}
                      <div className="pt-4 space-y-2">
                        <div className="h-4 bg-slate-900 rounded-md w-full animate-pulse" />
                        <div className="h-4 bg-slate-900 rounded-md w-5/6 animate-pulse" />
                        <div className="h-4 bg-slate-900 rounded-md w-4/5 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ) : (
                  
                  // 2. STABLE VIEWPORT PREVIEW STATE
                  <div className="flex-1 flex flex-col h-full justify-between overflow-y-auto">
                    
                    {/* SCRIPT TAB CONTENT */}
                    {activeTab === "script" && (
                      <div className="flex-1 flex flex-col justify-between space-y-4 py-2">
                        <div className="space-y-3.5 overflow-y-auto max-h-[300px] pr-1">
                          {/* Hook */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/40 border border-indigo-500/20">Hook</span>
                            <p className="text-xs text-slate-200 bg-slate-900/50 p-2 rounded-lg border border-slate-900">
                              {currentPreview.script ? currentPreview.script.hook : currentPreview.hook}
                            </p>
                          </div>
                          
                          {/* Body */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20">Body copy</span>
                            <p className="text-xs text-slate-200 bg-slate-900/50 p-2 rounded-lg border border-slate-900 leading-relaxed">
                              {currentPreview.script ? currentPreview.script.body : "Loading body content..."}
                            </p>
                          </div>

                          {/* CTA */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-sky-400 px-1.5 py-0.5 rounded bg-sky-950/40 border border-sky-500/20">Call to action</span>
                            <p className="text-xs text-slate-200 bg-slate-900/50 p-2 rounded-lg border border-slate-900">
                              {currentPreview.script ? currentPreview.script.cta : "Loading CTA content..."}
                            </p>
                          </div>
                        </div>

                        {/* Copy Script Button */}
                        <button
                          type="button"
                          onClick={handleCopyScript}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-800 transition-all cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check size={14} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied to Clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Copy Full Script</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* VIDEO TAB CONTENT */}
                    {activeTab === "video" && (
                      <div className="flex-1 flex flex-col justify-between relative overflow-hidden h-full">
                        
                        {/* Video Element */}
                        <div className="absolute inset-0 rounded-2xl bg-black overflow-hidden flex items-center justify-center">
                          <video
                            ref={videoRef}
                            src={currentPreview.generatedVideo}
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            onClick={togglePlay}
                          />
                          
                          {/* Play overlay overlay */}
                          {!isPlaying && (
                            <button
                              type="button"
                              onClick={togglePlay}
                              className="absolute w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl z-20 cursor-pointer"
                            >
                              <Play size={18} className="ml-0.5 fill-white" />
                            </button>
                          )}

                          {/* UGC Mock details overlay overlay */}
                          <div className="absolute bottom-4 left-3 right-3 bg-black/45 backdrop-blur-xs p-2.5 rounded-xl border border-white/5 space-y-1 text-left z-10 pointer-events-none">
                            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">@aiugcadmaker</span>
                            <h4 className="text-[10px] font-bold truncate text-white">{currentPreview.productName}</h4>
                            <p className="text-[9px] text-slate-300 line-clamp-2">
                              {currentPreview.script ? currentPreview.script.hook : currentPreview.hook}
                            </p>
                          </div>

                          {/* Sound badge */}
                          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[8px] font-semibold flex items-center gap-1">
                            <Volume2 size={10} /> Voice Sync
                          </div>
                        </div>

                      </div>
                    )}

                    {/* IMAGE TAB CONTENT */}
                    {activeTab === "image" && (
                      <div className="flex-1 flex flex-col justify-between relative overflow-hidden h-full">
                        <div className="absolute inset-0 rounded-2xl bg-black overflow-hidden">
                          <img
                            src={currentPreview.generatedImage}
                            alt="Mock UGC mockup"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-emerald-500 text-white font-bold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                            AI Mockup Render
                          </div>
                          
                          <div className="absolute bottom-4 left-3 right-3 bg-black/50 backdrop-blur-xs p-2.5 rounded-xl border border-white/5 text-left">
                            <h4 className="text-[10px] font-bold text-white mb-0.5">UGC Photo Template</h4>
                            <p className="text-[9px] text-slate-300 leading-normal">
                              Seamlessly overlays product shots in modern lifestyle scenarios.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>
            
            {/* Viewport footer description */}
            <div className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 mt-4 text-center">
              Mobile aspect ratio template simulated in real-time.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Generator;