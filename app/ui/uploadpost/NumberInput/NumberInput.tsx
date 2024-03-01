import React from 'react';

const NumberInput = ({value, onChange, placeholder=0}: {value: number, onChange: (value: number) => void, placeholder?:Number}) => {
    const onDecrement = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    }

    const onIncrement = () => {
        if (value < 99) {
            onChange(value + 1);
        }
    }    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        if (newValue >= 0 && newValue <= 99) {
            onChange(newValue);
        }
    }

    return (
        <div>
            <button type="button" onClick={onDecrement} className="border-2 rounded-md w-10 mt-2 p-1">-</button>
            <input type="number" placeholder={String(placeholder)} min="0" max="99" value={value} className="border-2 rounded-md w-12 p-1 text-center" onChange={handleInputChange}/>
            <button type="button" onClick={onIncrement} className="border-2 rounded-md w-10 mt-2 p-1">+</button>
        </div>
    );
};

export default NumberInput;