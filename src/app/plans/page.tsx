import React from 'react';

interface ICard {
    id: number;
    title: string;
}

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

const PlansPage = async () => {
    const data = await getCard();

    return (
        <div className="p-6">
            <h2 className='text-white text-2xl font-bold mb-6'>Our Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.map((card) => (
                    <div key={card.id} className="p-4 bg-gray-800 rounded-lg shadow border border-gray-700">
                        <h3 className="text-white text-lg font-semibold">{card.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlansPage;