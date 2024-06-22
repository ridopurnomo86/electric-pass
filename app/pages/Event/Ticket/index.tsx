import TicketCardList from "~/components/data-display/TicketCardList";
import TICKET_DATA from "~/data/test-data/ticket";

const Ticket = () => (
  <div className="relative mt-8 gap-4">
    <TicketCardList data={TICKET_DATA} />
  </div>
);

export default Ticket;
