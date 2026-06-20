import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  History, 
  CreditCard, 
  Settings, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  LogOut, 
  Zap 
} from 'lucide-react';
import { assets } from '../assets/assets';

interface DashboardLayoutProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  credits?: number;
}

export default function DashboardLayout({ theme, setTheme, credits = 45 }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Generate Ad', path: '/generate', icon: Video },
    { name: 'My Campaigns', path: '/my-campaigns', icon: History },
    { name: 'Billing', path: '/billing', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleSignOut = () => {
    localStorage.removeItem('user_session');
    navigate('/');
  };

  // Determine page title
  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.name : 'Workspace';
  };

  return (
    <div className="min-h-screen flex bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors duration-300">
      
      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white backdrop-blur-md transition-all duration-300
          ${collapsed ? 'w-20' : 'w-64'} 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* LOGO AREA */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src={assets.logo} alt="logo" className="h-8 min-w-8 object-contain" />
            {!collapsed && (
              <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400 whitespace-nowrap">
                UGC Ads Maker
              </span>
            )}
          </div>
          <button 
            onClick={() => setMobileOpen(false)} 
            className="p-1 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 md:hidden text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-indigo-600/15 dark:bg-indigo-600/15 light:bg-indigo-50 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border-l-2 border-indigo-500' 
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-100 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900'
                  }
                `}
              >
                <Icon size={20} className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-indigo-400 dark:text-indigo-400 light:text-indigo-600' : ''}`} />
                {!collapsed && <span>{item.name}</span>}
                
                {/* TOOLTIP ON COLLAPSED */}
                {collapsed && (
                  <div className="absolute left-20 pl-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block z-50">
                    <div className="bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-md py-1 px-2.5 whitespace-nowrap shadow-xl">
                      {item.name}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* PROFILE WIDGET / COLLAPSE BUTTON */}
        <div className="p-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 space-y-4">
          
          {/* Collapsed Collapse button */}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex items-center justify-center w-full py-1.5 rounded-lg hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-100 text-slate-400 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 border border-slate-800/50 dark:border-slate-800/50 light:border-slate-200"
          >
            {collapsed ? <ChevronRight size={18} /> : <div className="flex items-center gap-2 text-xs"><ChevronLeft size={16} /> Minimize</div>}
          </button>

          {/* Premium Widget Profile */}
          <div className={`p-3 rounded-xl bg-gradient-to-br from-indigo-950/40 via-violet-950/20 to-slate-900 border border-indigo-500/20 flex items-center ${collapsed ? 'justify-center p-2' : 'gap-3'}`}>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border border-indigo-400/30">
                AR
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold truncate block text-slate-100 dark:text-slate-100 light:text-slate-800">Alex Rivera</span>
                  <span className="bg-indigo-600/20 dark:bg-indigo-600/20 light:bg-indigo-100 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0">
                    Pro
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 truncate block">alex@ugcmaker.ai</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'md:pl-20' : 'md:pl-64'}`}>
        
        {/* HEADER TOP BAR */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/80 backdrop-blur-md sticky top-0 z-30">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileOpen(true)}
              className="p-1.5 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 text-slate-400 md:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-semibold text-lg md:text-xl text-slate-100 dark:text-slate-100 light:text-slate-900">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            
            {/* CREDITS DISPLAY */}
            <Link 
              to="/billing"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 light:bg-indigo-50 border border-indigo-500/20 text-xs font-semibold text-indigo-400 dark:text-indigo-400 light:text-indigo-600 hover:bg-indigo-500/15 dark:hover:bg-indigo-500/15 transition-all"
            >
              <Zap size={14} className="fill-indigo-400/20 text-indigo-400" />
              <span>{credits}/100 Credits</span>
            </Link>

            {/* LIGHT/DARK TOGGLE */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 text-slate-400 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* PROFILE MENU */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border border-slate-800 dark:border-slate-800 light:border-slate-200 cursor-pointer"
              >
                AR
              </button>

              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setProfileDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 dark:bg-slate-900 dark:border-slate-800 light:bg-white light:border-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 p-1.5 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700"
                    >
                      <User size={16} />
                      Profile Settings
                    </Link>
                    <Link
                      to="/billing"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700"
                    >
                      <CreditCard size={16} />
                      Billing & Plans
                    </Link>
                    <div className="h-px bg-slate-800 dark:bg-slate-800 light:bg-slate-200 my-1" />
                    <button
                      onClick={() => { setProfileDropdownOpen(false); handleSignOut(); }}
                      className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 dark:hover:bg-red-500/10 light:hover:bg-red-50 text-red-400 dark:text-red-400 light:text-red-600 font-medium"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* CONTAINER CONTENT */}
        <main className="flex-1 p-6 md:p-8 bg-slate-950/20 dark:bg-slate-950/20 light:bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
