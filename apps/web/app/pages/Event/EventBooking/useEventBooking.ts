import { useState } from "react";
import { EventPlanDataType } from "~/data/test-data/types";

const useEventBooking = () => {
  const [selectedPlans, setSelectedPlans] = useState<{ [key: string]: EventPlanDataType }>({});

  const subTotalPrice =
    selectedPlans &&
    Object.keys(selectedPlans)
      .map((item) => Number(selectedPlans[item].price))
      .reduce((accumulator, current) => accumulator + current, 0);

  const totalFees = 0;

  return { selectedPlans, subTotalPrice, totalFees, onSelectedPlans: setSelectedPlans };
};

export default useEventBooking;
