import EventCard from "~/components/cards/EventCard";
import { EventDataType } from "~/data/test-data/event";

type EventCardListPropsType = {
  title: string;
  subtitle: string;
  className?: string;
  data: Array<EventDataType>;
};

const EventCardList = ({ data, subtitle, title, className }: EventCardListPropsType) => (
  <div className={className}>
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h3>
    <p className="text-sm text-neutral-600">{subtitle}</p>
    <div className="flex gap-4 overflow-x-scroll py-4">
      {data.map((item) => (
        <div className="min-w-[450px]" key={item.id}>
          <EventCard
            imgUrl={item.imgUrl}
            location={item.location}
            title={item.title}
            type={item.type}
            price={item.price}
            datetime={item.datetime}
            navigateTo={`/event/${item.slug}`}
          />
        </div>
      ))}
    </div>
  </div>
);

export default EventCardList;
