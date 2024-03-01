import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default function PriceUnitSelect({ instanceId, onChange, className, placeholder="Chọn" }: { instanceId: string, onChange: (selectedOption: any) => void, className: string, placeholder?: string}) {
    async function getOption() {
        try {
            const response = await fetch('https://localhost:7149/PriceUnit/GetListPriceUnit');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const options = data.map((item: { priceUnitId: string, name: string }) => {
                return {
                    value: item.priceUnitId,
                    label: item.name
                }
            });
            return options;
        } catch (error) {
            console.error('Failed to fetch price units:', error);
            return [];
        }
    }
    const [options, setOptions] = useState([]);

    useEffect(() => {
        getOption().then(setOptions);
    }, []);

    const handleChange = (selectedOption: any) => {
        onChange(selectedOption ? selectedOption.value : null);
    };

    return (
        <Select
            instanceId={instanceId}
            onChange={handleChange}
            options={options}
            className={className}
            placeholder={placeholder}
        />
    );
}


