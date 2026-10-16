'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/assets/logo.png';
import { usePlan } from '@/context/PlanContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname();
    const { todaysPlan, savedPlan } = usePlan();
    const [isOpen, setIsOpen] = useState(false);

    const isWorkoutsActive = pathname === '/';
    const isPlanActive = pathname === '/plans';

    return (
        <div className="bg-black text-white w-full">
            <nav className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center py-4">

                {/* Logo (আগের মতোই রাখা হয়েছে) */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src={Logo} alt="FITLOG Logo" />
                    <span className="font-bold tracking-wider text-base">FITLOG</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-2">
                    <Link 
                        href="/" 
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                            isWorkoutsActive 
                                ? "bg-[#1c240d] text-[#b4ff00]" 
                                : "text-zinc-500 hover:text-white"
                        }`}
                    >
                        Workouts
                    </Link>
                    <Link 
                        href="/plans" 
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                            isPlanActive 
                                ? "bg-[#1c240d] text-[#b4ff00]" 
                                : "text-zinc-500 hover:text-white"
                        }`}
                    >
                        My Plan
                    </Link>
                </div>

                {/* Desktop Counters */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                    <Link 
                        href="/plans" 
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <span className="text-zinc-300 group-hover:text-[#b4ff00] transition-colors">Plan</span>
                        <span className="w-6 h-6 rounded-full bg-[#b4ff00] text-black font-bold flex items-center justify-center text-xs">
                            {todaysPlan.length}
                        </span>
                    </Link>

                    <Link 
                        href="/plans" 
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <span className="text-zinc-300 group-hover:text-white transition-colors">Saved</span>
                        <span className="w-6 h-6 rounded-full border border-zinc-800 text-zinc-300 font-bold flex items-center justify-center text-xs group-hover:border-zinc-500 transition-colors">
                            {savedPlan.length}
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu & Counters (শুধু মোবাইলের জন্য) */}
                <div className="flex md:hidden items-center gap-4">
                    <Link href="/plans" className="flex items-center gap-1.5 text-xs">
                        <span className="text-zinc-300">Plan</span>
                        <span className="w-5 h-5 rounded-full bg-[#b4ff00] text-black font-bold flex items-center justify-center">
                            {todaysPlan.length}
                        </span>
                    </Link>

                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-zinc-300 hover:text-white focus:outline-none p-1"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

            </nav>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-black border-b border-zinc-900 px-6 py-4 space-y-3">
                    <Link 
                        href="/" 
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                            isWorkoutsActive ? "bg-[#1c240d] text-[#b4ff00]" : "text-zinc-400"
                        }`}
                    >
                        Workouts
                    </Link>
                    <Link 
                        href="/plans" 
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                            isPlanActive ? "bg-[#1c240d] text-[#b4ff00]" : "text-zinc-400"
                        }`}
                    >
                        My Plan
                    </Link>
                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between px-4 py-2 text-sm text-zinc-300">
                        <span>Saved Items</span>
                        <span className="w-5 h-5 rounded-full border border-zinc-700 text-zinc-300 font-bold flex items-center justify-center text-xs">
                            {savedPlan.length}
                        </span>
                    </div>
                </div>
            )}

            <div className="w-full border-b border-zinc-900"></div>
        </div>
    );
};

export default Navbar;