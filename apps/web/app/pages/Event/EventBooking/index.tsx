import { useCachedLoaderData } from "remix-client-cache";
import { useState } from "react";
import { EventBookingLoader } from "services/main/event/event-booking";
import { useBlocker, useSubmit } from "@remix-run/react";
import Overview from "./Overview";
import EventBookingDialog from "./Dialog";
import Items from "./Items";
import Tickets from "./Tickets";
import useEventBooking from "./useEventBooking";
import Stepper from "./Stepper";
import BillingForm from "./BillingForm";

const EventBooking = () => {
  const [step, setStep] = useState<"ticket" | "billing" | "summary">("ticket");

  const { selectedPlans, onSelectedPlans, subTotalPrice, totalFees, onRemovePlans, totalOrder } =
    useEventBooking();

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

  const handleContinueStep = () => {
    if (step === "ticket") return setStep("billing");
  };

  return (
    <main>
      <section className="grid size-full min-h-screen border-b min-[1024px]:grid-cols-[70%_30%]">
        <div>
          <Overview datetime={event.start_date} location={event.country} title={event.name} />
          <Stepper step={step} onStep={setStep} />
          {step === "ticket" && (
            <Tickets
              isDisabled={totalOrder <= 0}
              onContinue={handleContinueStep}
              plans={event.Plan}
              onSelectedTicket={(item) => onSelectedPlans(item)}
            />
          )}
          {step === "billing" && <BillingForm callback={() => setStep("summary")} />}
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
