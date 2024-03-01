import { useState, useEffect } from "react";

interface Furniture {
    furnitureId: string;
    name: string;
}

interface FurnitureSelectProps {
    onSelect: (furnitureId: string) => void;
}

export default function FurnitureSelect({ onSelect }: FurnitureSelectProps) {
    const [listFurniture, setListFurniture] = useState<Furniture[]>([]);
    const [selectedFurnitureId, setSelectedFurnitureId] = useState<string | null>(null);

    async function getListFurniture() {
        try {
            const response = await fetch('https://localhost:7149/FurnitureApi/getallfurniture');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setListFurniture(data);
            if (data.length > 0) {
                setSelectedFurnitureId(data[0].furnitureId);
                onSelect(data[0].furnitureId);
            }
        } catch (error) {
            console.error("Failed to fetch furniture:", error);
        }
    }

    useEffect(() => {
        getListFurniture();
    }, []);

    const handleFurnitureChange = (furniture: Furniture) => {
        setSelectedFurnitureId(furniture.furnitureId);
        onSelect(furniture.furnitureId);
    }

    return (
        <div className="flex flex-row space-x-5">
            {listFurniture.map((furniture) => (
                <div className="p-1" key={furniture.furnitureId}>
                    <input 
                        type="radio" 
                        id={furniture.furnitureId} 
                        name="furniture" 
                        className="hidden" 
                        onChange={() => handleFurnitureChange(furniture)} 
                    />
                    <label 
                        htmlFor={furniture.furnitureId} 
                        className={`p-2 border-2 rounded-lg block cursor-pointer ${furniture.furnitureId === selectedFurnitureId ? 'bg-green-500' : 'bg-slate-100'}`}
                    >
                        {furniture.name}
                    </label>
                </div>
            ))}
        </div>
    )
}