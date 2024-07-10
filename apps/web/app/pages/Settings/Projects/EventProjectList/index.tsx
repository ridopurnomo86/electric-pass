import EventCard from "~/components/cards/EventCard";
import { EventDataType } from "~/data/test-data/event";
import TabsNavigation from "~/components/core/TabsNavigation";
import { useNavigate } from "@remix-run/react";

type EventProjectListPropsType = {
  data: Array<EventDataType>;
  type: "ongoing" | "finished";
};

const EventProjectList = ({ data, type }: EventProjectListPropsType) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <TabsNavigation
        tabs={[
          {
            id: "ongoing",
            isActive: type === "ongoing",
            label: "Ongoing",
            onClick: () => navigate("/settings/projects?type=ongoing"),
          },
          {
            id: "finished",
            isActive: type === "finished",
            label: "Finished",
            onClick: () => navigate("/settings/projects?type=finished"),
          },
        ]}
      />
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {data.map((item) => (
          <EventCard
            key={item.id}
            imgUrl={item.imgUrl}
            location={item.location}
            title={item.title}
            type={item.type}
            price={item.price}
            datetime={item.datetime}
            navigateTo="#"
          />
        ))}
      </div>
    </div>
  );
};

export default EventProjectList;
