import PlanCard from "~/components/cards/PlanCard";
import { Skeleton } from "~/components/ui/Skeleton";
import { EventDataType, EventPlanDataType } from "~/data/test-data/types";

type PlansPropsType = {
  selectedPlans: {
    [key: string]: EventPlanDataType;
  };
  event: EventDataType;
  onDeleteItem: (value: EventPlanDataType) => void;
  isDisabledDeleteItem?: boolean;
};

const EmptyPlans = () => (
  <div className="flex flex-col items-center justify-center px-6 py-4 text-center">
    <div className="mx-4 mb-4 flex w-full rounded bg-white p-4 shadow-lg md:w-[300px]">
      <Skeleton className="size-10 rounded" />
      <div className="ml-2">
        <Skeleton className="mb-1 h-[10px] w-[100px] rounded" />
        <Skeleton className="h-[12px] w-[60px] rounded" />
      </div>
    </div>
    <p className="text-sm font-medium tracking-tight text-neutral-900">No Plans</p>
    <p className="text-sm font-medium tracking-tight text-neutral-500">
      No data here yet. We will notify you when there&apos;s an update.
    </p>
  </div>
);

const Plans = ({
  selectedPlans,
  event,
  onDeleteItem,
  isDisabledDeleteItem = false,
}: PlansPropsType) => {
  if (Object.keys(selectedPlans).length === 0) return <EmptyPlans />;

  return (
    <div>
      {Object.keys(selectedPlans).length > 0 &&
        Object.keys(selectedPlans).map((plan, idx) => (
          <div className="px-6 py-4" key={idx}>
            <PlanCard
              country={event.country}
              planName={selectedPlans[plan].name}
              totalOrder={Number(selectedPlans[plan].order?.total_order)}
              eventName={event.name}
              eventStartDate={event.start_date}
              isDisabledDeleteItem={isDisabledDeleteItem}
              isShowDelete={!isDisabledDeleteItem}
              onClickDelete={() => onDeleteItem(selectedPlans[plan])}
            />
          </div>
        ))}
    </div>
  );
};

export default Plans;
