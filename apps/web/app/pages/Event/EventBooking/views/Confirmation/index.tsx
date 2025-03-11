import { EventDataType, EventPlanDataType } from "~/data/test-data/types";
import CheckoutForm from "./CheckoutForm";

type ConfirmationPropsType = {
  amount: number;
  billingData: {
    first_name: string;
    last_name: string;
    email: string;
    dialing_code: string;
    phone_number: string;
  };
  event: EventDataType;
  selectedPlans: {
    [key: number]: EventPlanDataType;
  };
};

const Confirmation = ({ amount, billingData, selectedPlans, event }: ConfirmationPropsType) => (
  <div className="size-full p-4 md:px-10">
    <p className="text-lg font-semibold tracking-tight text-neutral-900">Payment Confirmation</p>
    <p className="mb-4 text-sm font-medium text-neutral-500">
      Please fill out the form below. Enter your payment detail.
    </p>
    <CheckoutForm
      event={event}
      amount={amount}
      billingData={billingData}
      selectedPlans={selectedPlans}
    />
  </div>
);

export default Confirmation;
