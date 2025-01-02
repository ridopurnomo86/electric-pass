import EventCard from "~/components/cards/EventCard";
import TabsNavigation from "~/components/core/TabsNavigation";
import { EventDataType } from "~/data/test-data/types";
import EventProjectListEmpty from "./empty";

type EventProjectListPropsType = {
  data: Array<EventDataType>;
  typeProject: "ongoing" | "finished";
  onTypeProject: (value: "ongoing" | "finished") => void;
};

const EventProjectList = ({ data, typeProject, onTypeProject }: EventProjectListPropsType) => {
  const renderContent = () => {
    if (!data.length || data.length < 0) return <EventProjectListEmpty />;

    return (
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {data.map((item) => (
          <EventCard
            key={item.id}
            imgUrl={item.image_url}
            location={`${item.city}, ${item.country}`}
            title={item.name}
            type={item.EventType.name}
            // price={item.price}
            datetime={item.start_date}
            navigateTo={`/event/${item.slug}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-8 mt-4">
      <TabsNavigation
        tabs={[
          {
            id: "ongoing",
            isActive: typeProject === "ongoing",
            label: "Ongoing",
            onClick: () => onTypeProject("ongoing"),
          },
          {
            id: "finished",
            isActive: typeProject === "finished",
            label: "Finished",
            onClick: () => onTypeProject("finished"),
          },
        ]}
      />
      {renderContent()}
    </div>
  );
};

export default EventProjectList;
