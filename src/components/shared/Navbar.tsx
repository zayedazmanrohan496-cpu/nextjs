'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/assets/logo.png';

const Navbar = () => {
    const pathname = usePathname();

    const isWorkoutsActive = pathname === '/';
    const isPlanActive = pathname === '/plans';

    return (
        <div className="bg-black text-white w-full">
            <nav className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center py-4">

                <Link href="/" className="flex items-center gap-3">
                    <Image src={Logo} alt="FITLOG Logo" />
                    <span className="font-bold tracking-wider text-base">FITLOG</span>
                </Link>

                <div className="flex items-center gap-2">
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

                <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-zinc-300">Plan</span>
                        <span className="w-6 h-6 rounded-full bg-[#b4ff00] text-black font-bold flex items-center justify-center text-xs">
                            0
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-zinc-300">Saved</span>
                        <span className="w-6 h-6 rounded-full border border-zinc-800 text-zinc-500 font-bold flex items-center justify-center text-xs">
                            0
                        </span>
                    </div>
                </div>

            </nav>

            <div className="w-full border-b border-zinc-900"></div>
        </div>
    );
};

export default Navbar;  