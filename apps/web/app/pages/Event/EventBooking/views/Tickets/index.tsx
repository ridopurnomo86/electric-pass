import TicketCardList from "~/components/data-display/TicketCardList";
import { Button } from "~/components/ui/Button";
import { EventPlanDataType } from "~/data/test-data/types";

type TicketsPropsType = {
  plans: EventPlanDataType[];
  onSelectedTicket: (item: EventPlanDataType) => void;
  isDisabled: boolean;
  onSubmitTicket: () => void;
};

const Tickets = ({
  plans,
  onSelectedTicket,
  isDisabled = true,
  onSubmitTicket: onContinue,
}: TicketsPropsType) => (
  <div className="size-full p-4 md:px-10">
    <p className="text-lg font-semibold tracking-tight text-neutral-900">Select a tickets</p>
    <p className="mb-4 text-sm font-medium text-neutral-500">
      You can select the type of ticket you need, which may include entry to the event. <br></br>
      It&apos;s advisable to book your tickets inadvance, to avoid long lines at the ticket
      counters.
    </p>
    <TicketCardList data={plans} onClick={onSelectedTicket} isShowAdd />
    <div className="flex w-full items-center justify-end border-t px-6 py-4 text-center">
      <p className="mr-2 text-xs font-medium text-neutral-500">Please select a ticket first.</p>
      <Button
        className="w-min bg-blue-500 hover:bg-blue-500 hover:opacity-60"
        disabled={isDisabled}
        onClick={onContinue}
      >
        Continue
      </Button>
    </div>
  </div>
);

export default Tickets;
