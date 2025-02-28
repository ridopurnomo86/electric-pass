import { Button } from "~/components/ui/Button";
import { Icon } from "@iconify/react";
import Badge from "./Badge";
import PlanList from "./PlanList";
import Description from "./Description";

type TransactionCardPropsType = {
  eventStartDate: string;
  orderId: string;
  eventName: string;
  country: string;
  paymentMethod: string;
  paymentStatus: "success" | "failed";
  plans: Array<{ amount: number; name: string; id: number }>;
  orderDate: string;
  onClickDetail: () => void;
};

const TransactionCard = ({
  eventStartDate,
  orderId,
  eventName,
  country,
  paymentMethod,
  paymentStatus,
  plans = [],
  orderDate,
  onClickDetail,
}: TransactionCardPropsType) => (
  <article className="size-full overflow-hidden rounded-md border px-6 py-4">
    <div className="flex items-center justify-between border-b border-dotted pb-3">
      <div className="flex items-center">
        <p className="text-sm font-medium text-neutral-600">Order:</p>
        <p className="ml-1 w-[100px] truncate text-sm font-medium text-indigo-600">{orderId}</p>
      </div>
      <div className="flex items-center">
        <Badge paymentStatus={paymentStatus} />
        <Button variant="ghost" className="h-0 p-0" onClick={onClickDetail}>
          <Icon icon="solar:menu-dots-bold" width="20" height="20" className="ml-2 rotate-90" />
        </Button>
      </div>
    </div>
    <div className="py-4">
      <PlanList
        country={country}
        eventName={eventName}
        eventStartDate={eventStartDate}
        plans={plans}
      />
    </div>
    <Description orderDate={orderDate} paymentMethod={paymentMethod} />
  </article>
);

export default TransactionCard;
