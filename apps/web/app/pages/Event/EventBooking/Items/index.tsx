import { Icon } from "@iconify/react";
import { EventDataType, EventPlanDataType } from "~/data/test-data/types";
import formatPrice from "~/modules/formatPrice";
import Plans from "./Plans";

type ItemsPropsType = {
  selectedPlans: {
    [key: string]: EventPlanDataType;
  };
  event: EventDataType;
  onDeleteItem: (value: EventPlanDataType) => void;
  subTotalPrice: number;
  totalFees: number;
  totalPrice: number;
};

const Items = ({
  selectedPlans,
  event,
  onDeleteItem,
  subTotalPrice,
  totalPrice,
  totalFees,
}: ItemsPropsType) => (
  <div className="h-full border-x bg-[#F8FAFC]">
    <div className="border-b px-10 py-4">
      <p className="text-lg font-semibold tracking-tight text-neutral-900">Your Items</p>
    </div>
    <Plans event={event} onDeleteItem={onDeleteItem} selectedPlans={selectedPlans} />
    <div className="border-y px-6 py-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium tracking-tight text-neutral-600">Subtotal</p>
        <p className="text-sm font-medium tracking-tight text-neutral-600">
          {formatPrice(subTotalPrice)}
        </p>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center">
          <p className="mr-1 text-sm font-medium tracking-tight text-neutral-600">Fees</p>
          <Icon icon="tabler:info-circle" width="18" height="18" className="text-neutral-600" />
        </div>
        <p className="text-sm font-medium tracking-tight text-neutral-600">
          {formatPrice(totalFees)}
        </p>
      </div>
    </div>
    <div className="flex items-center justify-between px-6 py-2">
      <p className="text-sm font-medium tracking-tight text-neutral-900">Total</p>
      <p className="text-sm font-medium tracking-tight text-neutral-900">
        {formatPrice(totalPrice)}
      </p>
    </div>
  </div>
);

export default Items;
