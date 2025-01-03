import TicketCard from "~/components/cards/TicketCard";
import { EventPlanDataType } from "~/data/test-data/types";

type TicketCardListPropsType = {
  className?: string;
  data: Array<EventPlanDataType>;
  onClick?: (item: EventPlanDataType) => void;
  isActive?: boolean;
};

const TicketCardList = ({
  data = [],
  className,
  onClick = () => {},
  isActive,
}: TicketCardListPropsType) => (
  <div className={className}>
    <div className="gap-4 py-4">
      {data.map((item, idx) => (
        <div key={item.id}>
          <TicketCard
            isActive={isActive}
            onClick={() => onClick(item)}
            description={item.description}
            expiredDate={item.ended_date}
            isSoldOut={item.amount <= 0}
            price={Number(item.price)}
            title={item.name}
            endedDate={item.ended_date}
          />
          {idx + 1 !== data.length && <div className="mb-4" />}
        </div>
      ))}
    </div>
  </div>
);

export default TicketCardList;
