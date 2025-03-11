import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { Button } from "~/components/ui/Button";

type PlanListPropsType = {
  eventStartDate: string;
  eventName: string;
  country: string;
  plans: Array<{ amount: number; name: string; id: number }>;
};

const PlanList = ({ plans, country, eventName, eventStartDate }: PlanListPropsType) => (
  <div className="flex">
    <div className="mr-3 flex max-h-[60px] w-min max-w-[60px] items-center justify-center rounded border border-dashed border-blue-600 bg-blue-50 p-4">
      <Icon icon="tabler:ticket" width="24" height="24" className="text-blue-600" />
    </div>
    <div>
      <div className="flex">
        <p className="text-sm font-medium tracking-tight text-neutral-900">{plans[0].name}&nbsp;</p>
        <p className="ml-1 text-sm font-medium text-neutral-500">{plans[0].amount}x</p>
      </div>
      <p className="text-sm font-medium tracking-tight text-neutral-900">{eventName}</p>
      <p className="text-sm font-medium text-neutral-500">
        {dayjs(eventStartDate).format("ddd")},&nbsp;
        {dayjs(eventStartDate).format("MMM D YYYY")}&nbsp;
        {dayjs(eventStartDate).format("HH:mm A")} - {country}
      </p>
      <Button variant="ghost" className="h-0 cursor-auto p-0">
        <p className="mt-1 text-xs font-medium text-neutral-500">
          {plans.length > 1 ? `+${plans.length - 1} Other Plan` : "Only Plan"}
        </p>
      </Button>
    </div>
  </div>
);

export default PlanList;
