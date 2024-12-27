import { EventPlanDataType } from "~/data/test-data/types";
import { useBlocker, useSubmit } from "@remix-run/react";
import Overview from "./Overview";
import EventBookingDialog from "./Dialog";

const PLANS: EventPlanDataType[] = [
  {
    id: 1,
    event_id: 1,
    name: "Regular",
    created_at: "2024-11-14T08:19:56.253Z",
    updated_at: "2024-11-14T08:19:56.253Z",
    amount: 100,
    description: "Access for 2 days.",
    ended_date: "2025-11-08T17:00:00.000Z",
    price: "20",
  },
];

const EventBooking = () => {
  const submit = useSubmit();

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname
  );

  const handleContinueBlocking = () => {
    const formData = new FormData();
    formData.append("dialog", "reset");

    submit(formData, { method: "POST" });
  };

  return (
    <main>
      <section className="grid size-full min-h-screen min-[1024px]:grid-cols-[70%_30%]">
        <Overview plans={PLANS} />
        <div className="h-full border-x bg-[#F8FAFC]">
          <div className="border-b px-10 py-4">
            <p className="text-lg font-semibold tracking-tight text-neutral-900">Your Items</p>
          </div>
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
