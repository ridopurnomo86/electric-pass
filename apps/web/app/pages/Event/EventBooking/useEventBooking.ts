import { useState } from "react";
import { EventPlanDataType } from "~/data/test-data/types";

const useEventBooking = () => {
  const [selectedPlans, setSelectedPlans] = useState<{ [key: string]: EventPlanDataType }>({});

  const subTotalPrice =
    selectedPlans &&
    Object.keys(selectedPlans)
      .map((item) => Number(selectedPlans[item].order?.total_price))
      .reduce((accumulator, current) => accumulator + current, 0);

  const totalOrder =
    selectedPlans &&
    Object.keys(selectedPlans)
      .map((item) => Number(selectedPlans[item].order?.total_order))
      .reduce((accumulator, current) => accumulator + current, 0);

  const totalFees = 0;

  const onSelectedPlans = (item: EventPlanDataType) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        order: {
          total_order: Number(prev[item.id]?.order?.total_order)
            ? Number(prev[item.id]?.order?.total_order) + 1
            : 1,
          total_price: Number(prev[item.id]?.order?.total_price)
            ? Number(prev[item.id]?.order?.total_price) + Number(prev[item.id]?.order?.total_price)
            : Number(item.price),
        },
      },
    }));
  };

  const onRemovePlans = (item: EventPlanDataType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [item.id]: tmp, ...rest } = selectedPlans;
    setSelectedPlans(rest);
  };

  return { selectedPlans, subTotalPrice, totalFees, onSelectedPlans, onRemovePlans, totalOrder };
};

export default useEventBooking;
