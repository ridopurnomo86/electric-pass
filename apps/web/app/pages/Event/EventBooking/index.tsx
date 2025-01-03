import { useCachedLoaderData } from "remix-client-cache";
import { EventBookingLoader } from "services/main/event/event-booking";
import { useBlocker, useSubmit } from "@remix-run/react";
import Overview from "./Overview";
import EventBookingDialog from "./Dialog";
import Items from "./Items";
import Tickets from "./Tickets";
import useEventBooking from "./useEventBooking";

const EventBooking = () => {
  const { selectedPlans, onSelectedPlans, subTotalPrice, totalFees } = useEventBooking();

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
      <section className="grid size-full min-h-screen min-[1024px]:grid-cols-[70%_30%]">
        <div>
          <Overview datetime={event.start_date} location={event.country} title={event.name} />
          <Tickets
            plans={event.Plan}
            onSelectedTicket={(item) =>
              onSelectedPlans((prev) => ({ ...prev, [item.id]: { ...item, total_order: 1 } }))
            }
          />
        </div>
        <div>
          <Items
            event={event}
            selectedPlans={selectedPlans}
            onDeleteItem={(value) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { [value.id]: tmp, ...rest } = selectedPlans;
              onSelectedPlans(rest);
            }}
            totalFees={totalFees}
            totalPrice={subTotalPrice + totalFees}
            subTotalPrice={subTotalPrice}
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
