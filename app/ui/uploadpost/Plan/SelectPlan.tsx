import { useEffect, useState } from 'react';
import { Plan } from '@/app/lib/InterfacerLib';

interface SelectPlanProps {
    onSelect: (plan : Plan) => void;
}

export default function SelectPlan({ onSelect }: SelectPlanProps) {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

    useEffect(() => {
        getListPlan();
    }, []);

    async function getListPlan() {
        try {
            const response = await fetch(`https://localhost:7149/PlanAPI/GetListPlanPriceResDto`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPlans(data);
            if (data.length > 0) {
                setSelectedPlanId(data[0].planId);
                onSelect(data[0].planId);
            }
        } catch (error) {
            console.error("Failed to fetch plans:", error);
        }
    }

    const handleSelect = (plan: Plan) => {
        setSelectedPlanId(plan.planId);
        onSelect(plan);
    }

    return (
        <div className="w-full flex flex-row space-x-5 pt-2">
            {plans.map((plan) => (
                <div
                    key={plan.planId}
                    onClick={() => handleSelect(plan)}
                    className={`flex-grow border-2 shadow-lg p-2 flex flex-col items-center rounded-lg ${plan.planId === selectedPlanId ? 'bg-green-500' : ''}`}
                >
                    <h2>Plan: {plan.planName}</h2>
                    <h2>Price: {plan.price.toLocaleString('it-IT')} vnđ</h2>
                </div>
            ))}
        </div>
    );
}