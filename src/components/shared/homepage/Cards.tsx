import { ICard } from '@/types/apps.types'; // Path alias (tsconfig.json er @ path onujayi)
import Image from 'next/image';
import React from 'react';

const getCard = async (): Promise<ICard[]> => {
    const res = await fetch("http://localhost:3000/data.json", {
        cache: 'no-store'
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    
    const data: ICard[] = await res.json();
    return data;
}

const Cards = async () => {
    const data: ICard[] = await getCard();
    console.log(data, "data");

    return (
        <div className='bg-black min-h-screen py-10 px-4'>
            <div className='w-full max-w-7xl mx-auto'>

                {/* Header */}
                <div className='mb-8'>
                    <h2 className='text-white font-bold text-5xl'>THE LIBRARY</h2>
                    <p className='text-[#9CA3AF] ml-2 mt-1'>Twelve lifts covering every major muscle group.</p>
                </div>

                {/* Card Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-2'>
                    {
                        data.map((app: ICard, ind: number) => (
                            <div 
                                key={ind} 
                                className='bg-[#121316] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between'
                            >
                                <div>
                                    {/* Card Image */}
                                    <div className='relative h-56 w-full p-3 pb-0'>
                                        <div className='relative h-full w-full rounded-xl overflow-hidden bg-neutral-900'>
                                            <Image 
                                                src={app.image} 
                                                alt={app.name} 
                                                fill 
                                                className='object-cover'
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className='p-5 pt-4'>
                                        {/* Muscle Group Tags */}
                                        <div className='flex flex-wrap gap-2 mb-3'>
                                            {app.muscleGroups.map((muscle: string, i: number) => (
                                                <span 
                                                    key={i} 
                                                    className='bg-[#ccff00] text-black font-extrabold text-[11px] tracking-wider px-3 py-1 rounded-full uppercase'
                                                >
                                                    {muscle}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Name */}
                                        <h2 className='text-white text-2xl font-extrabold tracking-wide uppercase mb-1'>
                                            {app.name}
                                        </h2>

                                        {/* Equipment */}
                                        <p className='text-neutral-400 text-sm font-medium'>
                                            {app.equipment}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    {/* Divider */}
                                    <div className='px-5'>
                                        <div className='border-t border-neutral-800 w-full'></div>
                                    </div>

                                    {/* Footer (Duration, Calories, Rating) */}
                                    <div className='px-5 py-4 flex items-center justify-between text-xs text-neutral-400 font-medium'>
                                        <div className='flex items-center gap-1.5'>
                                            <span>⏱️</span>
                                            <span>{app.duration} min</span>
                                        </div>
                                        <div className='flex items-center gap-1.5'>
                                            <span>🔥</span>
                                            <span>{app.caloriesBurned} kcal</span>
                                        </div>
                                        <div className='flex items-center gap-1.5'>
                                            <span>⭐</span>
                                            <span>{app.rating}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default Cards;