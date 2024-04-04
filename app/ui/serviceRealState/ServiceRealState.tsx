'use client';
import { useState } from "react";
import SelectPlan from "../uploadpost/Plan/SelectPlan";
import SelectPlanDay from "../uploadpost/Plan/SelectPlanDay";
import { Plan, PlanDay } from "@/app/lib/InterfacerLib";

export default function ServiceRealState() {
    const [plan, setPlan] = useState<Plan>();
    const [planDay, setPlanDay] = useState<PlanDay>();
    return (
        <div className="flex flex-col sm:ml-20 sm:mr-20 ml-10 mr-10 mb-10">
            <div className="pt-5">
                <strong>Các gói loại tin hiện có</strong>
                <SelectPlan onSelect={setPlan} />
            </div>
            <div className="pt-5">
                <strong className="pt-2">Các gói ngày</strong>
                <p className="pt-2">Số ngày đăng</p>
                <SelectPlanDay onSelect={setPlanDay} plan={plan} />
            </div>
        </div>
    )
}