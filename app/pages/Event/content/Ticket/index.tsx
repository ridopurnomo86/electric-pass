import TicketCardList from "~/components/data-display/TicketCardList";
import TICKET_DATA from "~/data/test-data/ticket";

type TicketPropsType = {
  eventDate: string;
};

const Ticket = ({ eventDate }: TicketPropsType) => (
  <div className="relative mt-8 gap-4">
    <TicketCardList data={TICKET_DATA} eventDate={eventDate} />
  </div>
);

export default Ticket;
