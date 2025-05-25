import EventCard from "~/components/cards/EventCard";
import { EventDataType } from "~/data/test-data/types";

type EventGridPropsType = {
  events: EventDataType[];
};

const EventGrid = ({ events }: EventGridPropsType) => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4 px-10 py-4">
    {events?.map((item: EventDataType) => (
      <div key={item.id}>
        <EventCard
          imgUrl={item.image_url}
          location={`${item.city}, ${item.country}`}
          title={item.name}
          type={item.EventType?.name}
          // price={item.price}
          datetime={item.start_date}
          navigateTo={`/event/${item.slug}`}
        />
      </div>
    ))}
  </div>
);

export default EventGrid;
