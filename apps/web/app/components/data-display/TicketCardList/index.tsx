import TicketCard from "~/components/cards/TicketCard";
import { TicketDataType } from "~/data/test-data/ticket";

type TicketCardListPropsType = {
  className?: string;
  data: Array<TicketDataType>;
  eventDate: string;
};

const TicketCardList = ({ data = [], className, eventDate }: TicketCardListPropsType) => (
  <div className={className}>
    <div className="gap-4 py-4">
      {data.map((item, idx) => (
        <div key={item.id}>
          <TicketCard
            description={item.description}
            expiredDate={item.expiredDate}
            isSoldOut={item.stock <= 0}
            price={item.price}
            title={item.title}
            eventDate={eventDate}
          />
          {idx + 1 !== data.length && <div className="mb-4" />}
        </div>
      ))}
    </div>
  </div>
);

export default TicketCardList;
