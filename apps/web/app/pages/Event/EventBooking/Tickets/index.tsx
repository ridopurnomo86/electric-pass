import TicketCardList from "~/components/data-display/TicketCardList";
import { EventPlanDataType } from "~/data/test-data/types";

type TicketsPropsType = {
  plans: EventPlanDataType[];
  onSelectedTicket: (item: EventPlanDataType) => void;
};

const Tickets = ({ plans, onSelectedTicket }: TicketsPropsType) => (
  <div className="size-full p-4 md:px-10">
    <p className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">Select a tickets</p>
    <TicketCardList data={plans} onClick={onSelectedTicket} />
  </div>
);

export default Tickets;
