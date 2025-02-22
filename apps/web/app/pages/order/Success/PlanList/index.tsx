import PlanCard from "~/components/cards/PlanCard";
import { EventDataType, EventPlanDataType } from "~/data/test-data/types";

type PlanListPropsType = {
  plans: EventPlanDataType[];
  event: EventDataType;
};

const PlanList = ({ plans, event }: PlanListPropsType) => (
  <div className="border-t p-4 md:px-8 md:py-4">
    {plans.map((plan, idx) => (
      <div key={idx}>
        <PlanCard
          country={event.country}
          planName={plan.name}
          totalOrder={Number(plan.order?.total_order)}
          eventName={event.name}
          eventStartDate={event.start_date}
          isDisabledDeleteItem
        />
      </div>
    ))}
  </div>
);

export default PlanList;
