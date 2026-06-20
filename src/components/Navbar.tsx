import { MenuIcon, XIcon, Sun, Moon } from 'lucide-react';
import { PrimaryButton } from './Buttons';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

interface NavbarProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Community', href: '/community' },
        { name: 'Plans', href: '/plans' },
    ];

    return (
        <motion.nav className='fixed top-5 left-0 right-0 z-50 px-4'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
        >
            <div className='max-w-6xl mx-auto flex items-center justify-between bg-black/50 dark:bg-black/50 light:bg-white/80 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-slate-200 rounded-2xl p-3 shadow-lg'>
                
                <Link to='/' onClick={()=>scrollTo(0,0)} className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className="h-8" />
                    <span className="font-bold text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
                        AI UGC Ads Maker
                    </span>
                </Link>

                <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-300 dark:text-slate-300 light:text-slate-600'>
                    {navLinks.map((link) => (
                        <Link onClick={()=>scrollTo(0,0)} to={link.href} key={link.name} className="hover:text-white dark:hover:text-white light:hover:text-slate-900 transition">
                            {link.name}
                        </Link>
                    ))}
                    <Link onClick={()=>scrollTo(0,0)} to="/generate" className="text-indigo-400 hover:text-indigo-300 transition font-semibold">
                        Generate UGC
                    </Link>
                </div>

                <div className='hidden md:flex items-center gap-4'>
                    {/* Theme Switcher */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-100 text-slate-400 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    <Link to="/auth" className='text-sm font-medium text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition'>
                        Sign in
                    </Link>
                    <Link to="/auth">
                        <PrimaryButton className='text-white max-sm:text-xs'>Get Started</PrimaryButton>
                    </Link>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    {/* Theme Switcher */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200 text-slate-400 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 transition-colors mr-2"
                    >
                        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 dark:text-slate-300 light:text-slate-700">
                        <MenuIcon className='size-6' />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-slate-950/95 dark:bg-slate-950/95 light:bg-white/95 backdrop-blur-md z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.href} onClick={() => { setIsOpen(false); scrollTo(0,0); }} className="text-slate-300 dark:text-slate-300 light:text-slate-800">
                        {link.name}
                    </Link>
                ))}
                <Link to="/generate" onClick={() => { setIsOpen(false); scrollTo(0,0); }} className="text-indigo-400 font-semibold">
                    Generate UGC
                </Link>

                <Link to="/auth" onClick={() => setIsOpen(false)} className='font-medium text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition'>
                    Sign in
                </Link>
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <PrimaryButton className="text-white">Get Started</PrimaryButton>
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-indigo-600 text-white p-3 shadow-lg active:scale-95 transition-all mt-6"
                >
                  <XIcon size={20} />
                </button>
            </div>
        </motion.nav>
    );
};