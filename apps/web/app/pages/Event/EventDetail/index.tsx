import TabsNavigation from "~/components/core/TabsNavigation";
import { Suspense, useState } from "react";
import { EventDetailLoader } from "services/main/event/event-detail";
import { Await, useLocation } from "@remix-run/react";
import { useCachedLoaderData } from "remix-client-cache";
import Description from "./content/Description";
import Ticket from "./content/Ticket";
import Header from "./Header";
import Information from "./Information";
import OrganizerInfo from "./OrganizerInfo";
import BottomNavigation from "./BottomNavigation";
import EventLoading from "./loading";

const Event = () => {
  const location = useLocation();
  const { eventDetail } = useCachedLoaderData<typeof EventDetailLoader>();
  const [type, setType] = useState<"description" | "ticket">("description");

  return (
    <Suspense key={location.key} fallback={<EventLoading />}>
      <Await resolve={eventDetail} errorElement={<p>Error Fetch Data</p>}>
        {(resolve) => (
          <main className="min-h-screen bg-[#F8FAFC]">
            <section className="container mx-auto grid size-full gap-8 py-4 md:py-10 min-[1024px]:grid-cols-[70%_30%]">
              <div>
                <Header
                  imageUrl={resolve.image_url}
                  location={`${resolve.city}, ${resolve.country}`}
                  slug={resolve.slug}
                  title={resolve.name}
                  topic={resolve.EventType?.name}
                />
                <OrganizerInfo
                  organizerImageUrl={resolve.User?.image_profile?.image_url}
                  organizerName={resolve.User?.name}
                  eventDate={resolve.start_date}
                  city={resolve.city}
                  country={resolve.country}
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
                  <Description description={resolve.description} />
                ) : (
                  <Ticket plans={resolve.Plan} eventDate={resolve.start_date} />
                )}
              </div>
              <Information
                organizerImageUrl={resolve.User?.image_profile?.image_url}
                organizerName={resolve.User?.name}
                eventDate={resolve.start_date}
                city={resolve.city}
                country={resolve.country}
              />
            </section>
            <BottomNavigation onBuyTicket={() => {}} startedPrice={resolve.Plan[0]?.price} />
          </main>
        )}
      </Await>
    </Suspense>
  );
};

export default Event;
