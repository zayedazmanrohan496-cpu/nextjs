import React from 'react';
import BannerImage from '@/assets/banner.png';
import Image from 'next/image';

const Banner = () => {
    return (
        <section className="bg-black min-h-[85vh] flex items-center justify-center p-4 md:p-8 font-sans">
            <div className="w-full max-w-[92rem] bg-[#141721] border border-[#212636] rounded-2xl py-8 px-8 md:py-12 md:px-16 lg:py-16 lg:px-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
                
                {/* Left Content */}
                <div className="max-w-2xl z-10 mb-8 md:mb-0">
                    <h3 className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
                        WORKOUT LIBRARY
                    </h3>
                    
                    <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] uppercase mb-4">
                        TRAIN WITH INTENT. <span className="block md:inline">LOG EVERY SET.</span>
                    </h2>
                    
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
                    </p>
                    
                    <button className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold px-6 py-3.5 rounded-lg text-sm tracking-wide transition-colors duration-200 shadow-lg cursor-pointer">
                        BROWSE WORKOUTS
                    </button>
                </div>

                {/* Right Image Content */}
                <div className="z-10 flex justify-center items-center">
                    <Image 
                        src={BannerImage} 
                        alt="Workout Library Banner" 
                        className="w-72 md:w-[400px] lg:w-[480px] object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;