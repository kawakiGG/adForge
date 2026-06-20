import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/Buttons';
import { Mail, Lock, User, ArrowRight, Chrome, Apple } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('user_session', JSON.stringify({
        email,
        name: isLogin ? 'Alex Rivera' : name,
        tier: 'Pro Member',
        credits: 45
      }));
      navigate('/dashboard');
    }, 1200);
  };

  const handleSocialAuth = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('user_session', JSON.stringify({
        email: `${provider.toLowerCase()}user@ugcmaker.ai`,
        name: 'Alex Rivera',
        tier: 'Pro Member',
        credits: 45
      }));
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 dark:bg-indigo-600/10 light:bg-indigo-600/5 rounded-full blur-3xl -z-10" />
      
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-transparent blur-xl" />

        {/* Tab Toggle */}
        <div className="flex bg-slate-900/50 dark:bg-slate-900/50 light:bg-slate-200/50 p-1 rounded-xl mb-8 border border-white/5 dark:border-white/5 light:border-slate-200">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-all duration-300 ${
              isLogin 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-all duration-300 ${
              !isLogin 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Title Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900">
            {isLogin ? 'Welcome Back!' : 'Start Creating UGC'}
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 mt-2">
            {isLogin ? 'Access your dashboard and start generating.' : 'Generate your first video & image variations in seconds.'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (Only Signup) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-all"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">
                Password
              </label>
              {isLogin && (
                <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <PrimaryButton
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-6 relative overflow-hidden justify-center text-sm font-semibold rounded-xl"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={16} />
              </span>
            )}
          </PrimaryButton>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-slate-800 dark:border-slate-800 light:border-slate-200" />
          <span className="flex-shrink mx-4 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-medium">Or continue with</span>
          <div className="flex-grow border-t border-slate-800 dark:border-slate-800 light:border-slate-200" />
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSocialAuth('Google')}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/20 dark:bg-slate-900/20 light:bg-white text-sm font-medium hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-50 active:scale-97 transition-all text-slate-300 dark:text-slate-300 light:text-slate-700"
          >
            <Chrome size={16} />
            Google
          </button>
          <button
            onClick={() => handleSocialAuth('Apple')}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/20 dark:bg-slate-900/20 light:bg-white text-sm font-medium hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-50 active:scale-97 transition-all text-slate-300 dark:text-slate-300 light:text-slate-700"
          >
            <Apple size={16} />
            Apple
          </button>
        </div>

        {/* Footer Terms */}
        <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 text-center mt-6 leading-relaxed">
          By signing up, you agree to our Terms of Service and Privacy Policy. All payments are processed securely.
        </p>
      </div>
    </div>
  );
}
