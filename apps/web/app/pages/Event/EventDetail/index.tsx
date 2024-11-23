import TabsNavigation from "~/components/core/TabsNavigation";
import { useState } from "react";
import { EventDetailLoader } from "services/main/event/event-detail";
import { useCachedLoaderData } from "remix-client-cache";
import Description from "./content/Description";
import Ticket from "./content/Ticket";
import Header from "./Header";
import Information from "./Information";
import OrganizerInfo from "./OrganizerInfo";

const Event = () => {
  const { eventDetail } = useCachedLoaderData<typeof EventDetailLoader>();
  const [type, setType] = useState<"description" | "ticket">("description");

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="container mx-auto grid size-full gap-8 py-4 md:py-10 min-[1024px]:grid-cols-[70%_30%]">
        <div>
          <Header
            imageUrl={eventDetail.image_url}
            location={`${eventDetail.city}, ${eventDetail.country}`}
            slug={eventDetail.slug}
            title={eventDetail.name}
            topic={eventDetail.EventType?.name}
          />
          <OrganizerInfo
            organizerImageUrl={eventDetail.User?.image_profile?.image_url}
            organizerName={eventDetail.User?.name}
            eventDate={eventDetail.start_date}
            city={eventDetail.city}
            country={eventDetail.country}
          />
          <TabsNavigation
            tabs={[
              {
                id: "description",
                label: "Description",
                isActive: type === "description",
                onClick: () => setType("description"),
              },
              {
                id: "ticket",
                isActive: type === "ticket",
                label: "Ticket",
                onClick: () => setType("ticket"),
              },
            ]}
          />
          {type === "description" ? (
            <Description description={eventDetail.description} />
          ) : (
            <Ticket plans={eventDetail.Plan} eventDate={eventDetail.start_date} />
          )}
        </div>
        <Information
          organizerImageUrl={eventDetail.User?.image_profile?.image_url}
          organizerName={eventDetail.User?.name}
          eventDate={eventDetail.start_date}
          city={eventDetail.city}
          country={eventDetail.country}
        />
      </section>
    </main>
  );
};

export default Event;
