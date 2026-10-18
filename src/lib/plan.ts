import { ICard } from '@/types/apps.types';

export const getCard = async (): Promise<ICard[]> => {
    const baseUrl = process.env.SERVER_BASE_URL || process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/data.json`, { cache: 'no-store' });
    
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    
    const data: ICard[] = await res.json();
    return data;
};