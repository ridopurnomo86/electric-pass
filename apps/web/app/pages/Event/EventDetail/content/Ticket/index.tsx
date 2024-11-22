import TicketCardList from "~/components/data-display/TicketCardList";
import { EventPlanDataType } from "~/data/test-data/types";

type TicketPropsType = {
  eventDate: string;
  plans: EventPlanDataType[];
};

const Ticket = ({ eventDate, plans }: TicketPropsType) => (
  <div className="relative mt-8 gap-4">
    <TicketCardList data={plans} eventDate={eventDate} />
  </div>
);

export default Ticket;
