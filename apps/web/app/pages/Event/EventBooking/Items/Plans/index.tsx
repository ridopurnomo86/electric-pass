import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { Button } from "~/components/ui/Button";
import { Skeleton } from "~/components/ui/Skeleton";
import { EventDataType, EventPlanDataType } from "~/data/test-data/types";

type PlansPropsType = {
  selectedPlans: {
    [key: string]: EventPlanDataType;
  };
  event: EventDataType;
  onDeleteItem: (value: EventPlanDataType) => void;
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

const Plans = ({ selectedPlans, event, onDeleteItem }: PlansPropsType) => {
  if (Object.keys(selectedPlans).length === 0) return <EmptyPlans />;

  return (
    <div>
      {Object.keys(selectedPlans).length > 0 &&
        Object.keys(selectedPlans).map((plan, idx) => (
          <div className="px-6 py-4" key={idx}>
            <div className="flex justify-between">
              <div className="flex">
                <div className="mr-3 flex max-h-[60px] w-min max-w-[60px] items-center justify-center rounded border border-dashed border-blue-600 bg-blue-50 p-4">
                  <Icon icon="tabler:ticket" width="24" height="24" className="text-blue-600" />
                </div>
                <div>
                  <div className="flex">
                    <p className="text-sm font-medium tracking-tight text-neutral-900">
                      {selectedPlans[plan].name}&nbsp;
                    </p>
                    <p className="ml-1 text-sm font-medium text-neutral-500">
                      {selectedPlans[plan].order?.total_order}x
                    </p>
                  </div>
                  <p className="text-sm font-medium tracking-tight text-neutral-900">
                    {event.name}
                  </p>
                  <p className="text-sm font-medium text-neutral-500">
                    {dayjs(event.start_date).format("ddd")},&nbsp;
                    {dayjs(event.start_date).format("MMM D YYYY")}&nbsp;
                    {dayjs(event.start_date).format("HH:mm A")} - {event.country}
                  </p>
                </div>
              </div>
              <Button variant="ghost" onClick={() => onDeleteItem(selectedPlans[plan])}>
                <Icon
                  icon="solar:trash-bin-trash-outline"
                  width="24"
                  height="24"
                  className="text-neutral-600"
                />
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Plans;
