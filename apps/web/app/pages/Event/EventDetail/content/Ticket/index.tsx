import TicketCardList from "~/components/data-display/TicketCardList";
import { EventPlanDataType } from "~/data/test-data/types";

type TicketPropsType = {
  eventDate: string;
  plans: EventPlanDataType[];
};

const Ticket = ({ plans }: TicketPropsType) => (
  <div className="relative mt-8 gap-4">
    <TicketCardList data={plans} />
  </div>
);

export default Ticket;
