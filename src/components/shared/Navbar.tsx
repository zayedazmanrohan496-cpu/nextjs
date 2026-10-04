import Image from 'next/image';
import Logo from '@/assets/logo.png';

const Navbar = () => {
    return (
        <div className="bg-black text-white w-full">
            <nav className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center py-4">

                <div className="flex items-center gap-3">
                    <Image src={Logo} alt="FITLOG Logo" />
                    <span className="font-bold tracking-wider text-base">FITLOG</span>
                </div>

                <div className="flex items-center gap-2">
                    <a 
                        href="#" 
                        className="px-5 py-2 rounded-full bg-[#1c240d] text-[#b4ff00] text-sm font-medium"
                    >
                        Workouts
                    </a>
                    <a 
                        href="#" 
                        className="px-5 py-2 text-zinc-500 text-sm font-medium"
                    >
                        My Plan
                    </a>
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

