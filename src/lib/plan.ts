import { ICard } from '@/types/apps.types';

export const getCard = async (): Promise<ICard[]> => {
    const res = await fetch("http://localhost:3000/data.json", {
        cache: 'no-store'
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    
    const data: ICard[] = await res.json();
    return data;
};