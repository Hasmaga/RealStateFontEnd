import { useEffect, useState } from "react";

interface TypeRealEstate {
    id: string;
    name: string;
}

interface TypeRealEstateSelectProps {
    onSelect: (typeRealEstateId: string) => void;
}

export default function TypeRealEstateSelect({ onSelect }: TypeRealEstateSelectProps) {    
    const [listTypeRealEstate, setListTypeRealEstate] = useState<TypeRealEstate[]>([]);
    const [selectedTypeRealEstateId, setSelectedTypeRealEstateId] = useState<string | null>(null);
    
    async function getListTypeRealEstate() {
        try{
            const response = await fetch('https://localhost:7149/TypeRealEstateApi/GetListTypeRealEstate');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);            
            }
            const data = await response.json();
            setListTypeRealEstate(data);
            if (data.length > 0) {
                setSelectedTypeRealEstateId(data[0].id);
                onSelect(data[0].id);
            }
        } catch (error) {
            console.error("Failed to fetch type real estate:", error);
        }
    }

    useEffect(() => {
        getListTypeRealEstate();
    }, []);

    const handleTypeChange = (typeRealEstate: TypeRealEstate) => {
        setSelectedTypeRealEstateId(typeRealEstate.id);
        onSelect(typeRealEstate.id);
    }

    return (
        <div className="flex flex-row w-full pt-6 space-x-1">
            {listTypeRealEstate.map((typeRealEstate) => (
                <div
                    key={typeRealEstate.id}
                    className={`w-1/2 text-center border-2 rounded-md p-1 ${typeRealEstate.id === selectedTypeRealEstateId ? 'bg-[#A1EEBD] text-white' : ''}`}
                    onClick={() => handleTypeChange(typeRealEstate)}
                >
                    {typeRealEstate.name}
                </div>
            ))}
        </div>
    )
}