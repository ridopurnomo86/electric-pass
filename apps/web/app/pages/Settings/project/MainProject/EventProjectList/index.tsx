import EventCard from "~/components/cards/EventCard";
import TabsNavigation from "~/components/core/TabsNavigation";
import { useNavigate } from "@remix-run/react";
import EventProjectListEmpty from "./empty";

type EventProjectListPropsType = {
  data: Array<EventDataType>;
  type: "ongoing" | "finished";
};

const EventProjectList = ({ data, type }: EventProjectListPropsType) => {
  const navigate = useNavigate();

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
            isActive: type === "ongoing",
            label: "Ongoing",
            onClick: () => navigate("/settings/project?type=ongoing"),
          },
          {
            id: "finished",
            isActive: type === "finished",
            label: "Finished",
            onClick: () => navigate("/settings/project?type=finished"),
          },
        ]}
      />
      {renderContent()}
    </div>
  );
};

export default EventProjectList;
