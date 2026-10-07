import Image from 'next/image';
import React from 'react';
import FooterIcon from "@/assets/SVG.png";

const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 py-12 px-8 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 relative flex items-center justify-center">
                        <Image 
                            src={FooterIcon} 
                            alt="FitLog Logo" 
                            width={24} 
                            height={24}
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-white font-bold tracking-wider text-lg">FITLOG</h2>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        © 2026 FitLog — Workout Library. Train hard, log honest.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;