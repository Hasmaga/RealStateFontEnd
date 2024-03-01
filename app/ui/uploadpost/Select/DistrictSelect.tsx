import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default function DistrictSelect({ instanceId, onChange, className, cityId, isDisabled, placeholder = "Chọn"}: { instanceId: string, onChange: (selectedOption: any) => void, className: string, cityId: number, isDisabled: boolean, placeholder?: string}) {
    async function getOptions() {
        try {
            const response = await fetch(`https://localhost:7149/locationapi/getdistricts?cityId=${cityId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const options = data.map((item: { id: number; full_name: string; }) => {
                return {
                    value: item.id,
                    label: item.full_name
                };
            });
            return options;
        }
        catch (error) {
            console.error('Failed to fetch districts:', error);
            return [];
        }
    }

    const [options, setOptions] = useState([]);

    const handleChange = (selectedOption : any) => {
        onChange(selectedOption ? selectedOption.value : null);
    }

    useEffect(() => {
        if (cityId) {
            getOptions().then(setOptions);
        }
    }, [cityId]);

    return (
        <Select
            instanceId={instanceId}
            onChange={handleChange}
            options={options}
            className={className}
            placeholder={placeholder}
            isDisabled={isDisabled}
        />
    );
}