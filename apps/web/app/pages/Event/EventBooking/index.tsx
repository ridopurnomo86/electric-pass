import { useCachedLoaderData } from "remix-client-cache";
import { useRef } from "react";
import { EventBookingLoader } from "services/main/event/event-booking";
import { useBlocker, useSubmit } from "@remix-run/react";
import Overview from "./Overview";
import EventBookingDialog from "./Dialog";
import Items from "./Items";
import useEventBooking from "./useEventBooking";
import Stepper from "./Stepper";
import EventBookingViews from "./views";

type BillingDataType = {
  first_name: string;
  last_name: string;
  email: string;
  dialing_code: string;
  phone_number: string;
};

const EventBooking = () => {
  const userRef = useRef<BillingDataType>({} as BillingDataType);

  const {
    selectedPlans,
    onSelectedPlans,
    subTotalPrice,
    totalFees,
    onRemovePlans,
    totalOrder,
    onStep,
    handleTicket,
    step,
    isRequestLoading,
  } = useEventBooking();

  const submit = useSubmit();

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname
  );

  const { event } = useCachedLoaderData<typeof EventBookingLoader>();

  const handleContinueBlocking = () => {
    const formData = new FormData();
    formData.append("dialog", "reset");

    submit(formData, { method: "POST" });
  };

  return (
    <main>
      <section className="grid size-full min-h-screen border-b min-[1024px]:grid-cols-[70%_30%]">
        <div>
          <Overview datetime={event.start_date} location={event.country} title={event.name} />
          <Stepper step={step} onStep={onStep} />
          <EventBookingViews
            isSubmitting={isRequestLoading}
            onSubmitTicket={handleTicket}
            onSelectedPlans={onSelectedPlans}
            onStep={onStep}
            event={event}
            plans={event.EventPlan}
            selectedPlans={selectedPlans}
            step={step}
            subTotalPrice={subTotalPrice}
            totalOrder={totalOrder}
            userRef={userRef}
          />
        </div>
        <div>
          <Items
            event={event}
            selectedPlans={selectedPlans}
            onDeleteItem={(item) => onRemovePlans(item)}
            totalFees={totalFees}
            totalPrice={subTotalPrice + totalFees}
            subTotalPrice={subTotalPrice}
            totalOrder={totalOrder}
            isDisabledDeleteItem={step !== "ticket"}
          />
        </div>
      </section>
      {blocker.state === "blocked" && (
        <form method="POST">
          <EventBookingDialog
            isOpen={blocker.state === "blocked"}
            onCancel={() => blocker.reset()}
            onContinue={handleContinueBlocking}
          />
        </form>
      )}
    </main>
  );
};

export default EventBooking;
