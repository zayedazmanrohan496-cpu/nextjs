import { ICard } from '@/types/apps.types';
import { getCard } from '@/lib/plan';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Cards = async () => {
    const data: ICard[] = await getCard();

    return (
        <div className='bg-black min-h-screen py-10 px-4'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='mb-8'>
                    <h2 className='text-white font-bold text-5xl'>THE LIBRARY</h2>
                    <p className='text-[#9CA3AF] ml-2 mt-1'>Twelve lifts covering every major muscle group.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-2'>
                    {data.map((app: ICard, ind: number) => {
                    
                    
                        const slug = app.name.toLowerCase().replace(/\s+/g, '-');

                        return (
                            <Link 
                                key={ind} 
                                href={`/plans/${slug}`} 
                                className='bg-[#121316] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#ccff00] transition group cursor-pointer'
                            >
                                <div>
                                    <div className='relative h-56 w-full p-3 pb-0'>
                                        <div className='relative h-full w-full rounded-xl overflow-hidden bg-neutral-900'>
                                            <Image 
                                                src={app.image} 
                                                alt={app.name} 
                                                fill 
                                                className='object-cover group-hover:scale-105 transition duration-300'
                                            />
                                        </div>
                                    </div>

                                    <div className='p-5 pt-4'>
                                        <div className='flex flex-wrap gap-2 mb-3'>
                                            {app.muscleGroups.map((muscle: string, i: number) => (
                                                <span key={i} className='bg-[#ccff00] text-black font-extrabold text-[11px] tracking-wider px-3 py-1 rounded-full uppercase'>
                                                    {muscle}
                                                </span>
                                            ))}
                                        </div>
                                        <h2 className='text-white text-2xl font-extrabold tracking-wide uppercase mb-1 group-hover:text-[#ccff00] transition'>
                                            {app.name}
                                        </h2>
                                        <p className='text-neutral-400 text-sm font-medium'>
                                            {app.equipment}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className='px-5'>
                                        <div className='border-t border-neutral-800 w-full'></div>
                                    </div>
                                    <div className='px-5 py-4 flex items-center justify-between text-xs text-neutral-400 font-medium'>
                                        <span>⏱️ {app.duration} min</span>
                                        <span>🔥 {app.caloriesBurned} kcal</span>
                                        <span>⭐ {app.rating}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Cards;