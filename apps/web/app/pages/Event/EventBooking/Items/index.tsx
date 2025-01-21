import { EventDataType, EventPlanDataType } from "~/data/test-data/types";
import Plans from "./Plans";
import Prices from "./Prices";

type ItemsPropsType = {
  selectedPlans: {
    [key: string]: EventPlanDataType;
  };
  event: EventDataType;
  onDeleteItem: (value: EventPlanDataType) => void;
  subTotalPrice: number;
  totalFees: number;
  totalPrice: number;
  totalOrder: number;
  isDisabledDeleteItem?: boolean;
};

const Items = ({
  selectedPlans,
  event,
  onDeleteItem,
  subTotalPrice,
  totalPrice,
  totalFees,
  totalOrder = 0,
  isDisabledDeleteItem,
}: ItemsPropsType) => (
  <div className="h-full border-x bg-[#F8FAFC]">
    <div className="border-b px-10 py-4">
      <p className="text-lg font-semibold tracking-tight text-neutral-900">Your Order</p>
    </div>
    <Plans
      isDisabledDeleteItem={isDisabledDeleteItem}
      event={event}
      onDeleteItem={onDeleteItem}
      selectedPlans={selectedPlans}
    />
    <Prices
      subTotalPrice={subTotalPrice}
      totalFees={totalFees}
      totalOrder={totalOrder}
      totalPrice={totalPrice}
    />
  </div>
);

export default Items;
