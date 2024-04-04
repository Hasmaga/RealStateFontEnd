import { useEffect, useState } from "react";
import { PlanDay, Plan } from "@/app/lib/InterfacerLib";
import { URL } from "@/app/lib/Url";

interface SelectPlanDayProps {
    onSelect: (planDay: PlanDay) => void;
}

export default function SelectPlanDay({ onSelect, plan }: SelectPlanDayProps & { plan: Plan | undefined }) {
    const [planDays, setPlanDays] = useState<PlanDay[]>([]);
    const [selectPlanDayId, setSelectPlanDayId] = useState<string | null>(null);

    async function getListPlanDay() {
        if (!plan?.planId) return; // If planId is not set, don't fetch data

        try {
            const response = await fetch(`https://${URL}/PlanAPI/GetPlanPriceOfDayByPlanId?planId=${plan.planId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPlanDays(data);
            if (data.length > 0) {
                setSelectPlanDayId(data[0].planDayId);
                onSelect(data[0].planDayId);
            }
        } catch (error) {
            console.error("Failed to fetch plans:", error)
        }
    }


    useEffect(() => {
        if (plan)
        {
            getListPlanDay();
        }        
    }, [plan?.planId]);


    function handleSelect(planDay: PlanDay) {
        setSelectPlanDayId(planDay.planDayId);
        onSelect(planDay);
    }

    return (
        <div className="w-full flex flex-row space-x-5 pt-2">
            {planDays.map((planDay) => (
                <div
                    key={planDay.planDayId}
                    onClick={() => handleSelect(planDay)}
                    className={`flex-grow border-2 shadow-lg p-2 flex flex-col items-center rounded-lg ${planDay.planDayId === selectPlanDayId ? 'bg-green-500' : ''}`}
                >
                    <h2>{planDay.day} Ngày</h2>
                    <h2 className="line-through">{planDay.priceNonDiscount.toLocaleString('it-IT')} vnđ</h2>
                    <h2>{planDay.priceDiscount.toLocaleString('it-IT')} vnđ</h2>
                </div>
            ))}
        </div>
    )
}