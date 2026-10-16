import { ICard } from '@/types/apps.types';
import { getCard } from '@/lib/plan';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PlanActions from '@/components/PlanActions';

interface ICardProps {
    params: Promise<{
        slug: string; 
    }>;
}

const PlanDetails = async ({ params }: ICardProps) => {
    const { slug } = await params; 
    
    const data: ICard[] = await getCard();
    
    const currentPlan = data.find(
        (item) => item.name.toLowerCase().replace(/\s+/g, '-') === slug
    );

    if (!currentPlan) {
        return (
            <div className='bg-[#0b0c0e] min-h-screen text-white flex flex-col items-center justify-center p-6 text-center'>
                <h1 className='text-2xl sm:text-3xl font-bold mb-4'>Plan Not Found</h1>
                <p className='text-neutral-400 mb-6 text-sm sm:text-base'>The workout plan you are looking for does not exist.</p>
                <Link href="/" className='bg-[#ccff00] text-black font-bold px-6 py-3 rounded-xl hover:bg-white transition text-sm'>
                    Back to Library
                </Link>
            </div>
        );
    }

    return (
        <div className='bg-[#0b0c0e] min-h-screen text-white py-6 px-4 sm:py-10 sm:px-6 lg:py-12 flex items-center justify-center'>
            <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start'>
                
                {/* Left Side: Image (Responsive height/aspect ratio for mobile) */}
                <div className='relative w-full aspect-4/3 sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl'>
                    <Image 
                        src={currentPlan.image} 
                        alt={currentPlan.name} 
                        fill 
                        className='object-cover'
                        priority
                    />
                </div>

                {/* Right Side: Details Information */}
                <div className='flex flex-col justify-between h-full space-y-6'>
                    <div>
                        <h1 className='text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-white mb-2 sm:mb-3'>
                            {currentPlan.name}
                        </h1>
                        <p className='text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5'>
                            {currentPlan.description}
                        </p>

                        <div className='flex flex-wrap gap-2 mb-6 sm:mb-8'>
                            {currentPlan.muscleGroups.map((muscle: string, i: number) => (
                                <span 
                                    key={i} 
                                    className='bg-[#ccff00] text-black font-extrabold text-[10px] sm:text-xs tracking-wider px-3 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase'
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>

                        {/* Specs Table */}
                        <div className='bg-[#121418] border border-neutral-800/80 rounded-2xl overflow-hidden mb-6 sm:mb-8'>
                            <div className='divide-y divide-neutral-800/60 text-xs sm:text-sm'>
                                <div className='flex justify-between items-center py-3 px-4 sm:py-3.5 sm:px-5'>
                                    <span className='text-neutral-400 font-medium uppercase text-[10px] sm:text-xs tracking-wider'>Equipment</span>
                                    <span className='text-white font-semibold'>{currentPlan.equipment}</span>
                                </div>
                                <div className='flex justify-between items-center py-3 px-4 sm:py-3.5 sm:px-5'>
                                    <span className='text-neutral-400 font-medium uppercase text-[10px] sm:text-xs tracking-wider'>Difficulty</span>
                                    <span className='text-white font-semibold'>{currentPlan.difficulty}</span>
                                </div>
                                <div className='flex justify-between items-center py-3 px-4 sm:py-3.5 sm:px-5'>
                                    <span className='text-neutral-400 font-medium uppercase text-[10px] sm:text-xs tracking-wider'>Sets</span>
                                    <span className='text-white font-semibold'>{currentPlan.sets}</span>
                                </div>
                                <div className='flex justify-between items-center py-3 px-4 sm:py-3.5 sm:px-5'>
                                    <span className='text-neutral-400 font-medium uppercase text-[10px] sm:text-xs tracking-wider'>Reps</span>
                                    <span className='text-white font-semibold'>{currentPlan.reps}</span>
                                </div>
                                <div className='flex justify-between items-center py-3 px-4 sm:py-3.5 sm:px-5'>
                                    <span className='text-neutral-400 font-medium uppercase text-[10px] sm:text-xs tracking-wider'>Duration</span>
                                    <span className='text-white font-semibold'>{currentPlan.duration} min</span>
                                </div>
                                <div className='flex justify-between items-center py-3 px-4 sm:py-3.5 sm:px-5'>
                                    <span className='text-neutral-400 font-medium uppercase text-[10px] sm:text-xs tracking-wider'>Calories</span>
                                    <span className='text-white font-semibold'>{currentPlan.caloriesBurned} kcal</span>
                                </div>
                                <div className='flex justify-between items-center py-3 px-4 sm:py-3.5 sm:px-5'>
                                    <span className='text-neutral-400 font-medium uppercase text-[10px] sm:text-xs tracking-wider'>Rating</span>
                                    <span className='text-white font-semibold'>{currentPlan.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className='mb-6 sm:mb-8'>
                            <h3 className='text-white text-base sm:text-lg font-bold uppercase tracking-wider mb-3 sm:mb-4'>
                                Instructions
                            </h3>
                            <ol className='space-y-2.5 sm:space-y-3 text-neutral-300 text-xs sm:text-sm leading-relaxed list-decimal list-inside'>
                                {currentPlan.instructions.map((step: string, index: number) => (
                                    <li key={index} className='pl-1'>
                                        <span className='text-neutral-200'>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Dynamic Client Actions */}
                    <PlanActions plan={currentPlan} />

                </div>

            </div>
        </div>
    );
};

export default PlanDetails;