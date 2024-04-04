import { URL } from '@/app/lib/Url';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

async function getOptions() {
    try {
        const response = await fetch(`https://${URL}/locationapi/getallcity`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const options = data.map((item: { id: number; full_name: string; }) => {
            return {
                value: item.id,
                label: item.full_name
            }
        });
        return options;
    } catch (error) {
        console.error('Failed to fetch cities:', error);
        return [];
    }
}

const CitySelect = ({ instanceId, onChange, className, placeholder = "Chọn"  }: { instanceId: string, onChange: (selectedOption: any) => void, className: string, placeholder?: string }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        getOptions().then(setOptions);
    }, []);

    const handleChange = (selectedOption : any) => {
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
};

export default CitySelect;