import React, { MutableRefObject } from "react";
import Tickets from "./Tickets";
import BillingForm from "./BillingForm";
import Confirmation from "./Confirmation";
import { EventPlanDataType } from "~/data/test-data/types";

type StepType = "ticket" | "billing" | "confirmation";

type BillingDataType = {
  first_name: string;
  last_name: string;
  email: string;
  dialing_code: string;
  phone_number: string;
};

type EventBookingViewsPropstype = {
  step: StepType;
  totalOrder: number;
  plans: EventPlanDataType[];
  onSelectedPlans: (prev: EventPlanDataType) => void;
  onStep: (prev: StepType) => void;
  subTotalPrice: number;
  selectedPlans: {
    [key: string]: EventPlanDataType;
  };
  userRef: MutableRefObject<BillingDataType>;
};

const EventBookingViews = ({
  step,
  totalOrder,
  plans,
  onSelectedPlans,
  onStep,
  subTotalPrice,
  selectedPlans,
  userRef,
}: EventBookingViewsPropstype) => {
  if (step === "ticket")
    return (
      <Tickets
        isDisabled={totalOrder <= 0}
        onContinue={() => onStep("billing")}
        plans={plans}
        onSelectedTicket={(item) => onSelectedPlans(item)}
      />
    );

  if (step === "billing")
    return (
      <BillingForm
        callback={(res) => {
          onStep("confirmation");
          if (res) userRef.current = res;
        }}
      />
    );

  return (
    <Confirmation
      billingData={userRef.current}
      amount={subTotalPrice}
      selectedPlans={selectedPlans}
    />
  );
};

export default EventBookingViews;
