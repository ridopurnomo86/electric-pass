import TabsNavigation from "~/components/core/TabsNavigation";
import { Suspense, useEffect, useState } from "react";
import { EventDetailAction, EventDetailLoader } from "services/main/event/event-detail";
import { Await, useActionData, useLocation, useNavigation, useSubmit } from "@remix-run/react";
import { useToast } from "~/components/ui/Toaster/useToast";
import { useCachedLoaderData } from "remix-client-cache";
import Description from "./content/Description";
import Ticket from "./content/Ticket";
import Header from "./Header";
import Information from "./Information";
import OrganizerInfo from "./OrganizerInfo";
import BottomNavigation from "./BottomNavigation";
import EventLoading from "./loading";

const Event = () => {
  const { toast } = useToast();
  const { state } = useNavigation();
  const [type, setType] = useState<"description" | "ticket">("description");
  const submit = useSubmit();
  const location = useLocation();

  const { eventDetail } = useCachedLoaderData<typeof EventDetailLoader>();

  const actionData = useActionData<typeof EventDetailAction>();

  useEffect(() => {
    if (actionData?.message) {
      toast({
        title: actionData?.status,
        description: actionData?.message,
        variant: actionData?.type === "success" ? "default" : "destructive",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("data", JSON.stringify({ event_id: eventDetail.id }));

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      replace: true,
      preventScrollReset: true,
    });
  };

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
                  <Ticket plans={resolve.EventPlan} eventDate={resolve.start_date} />
                )}
              </div>
              <Information
                organizerImageUrl={resolve.User?.image_profile?.image_url}
                organizerName={resolve.User?.name}
                eventDate={resolve.start_date}
                city={resolve.city}
                country={resolve.country}
                onSubmit={onSubmit}
                isLoading={state === "submitting"}
              />
            </section>
            <BottomNavigation
              isLoading={state === "submitting"}
              onBuyTicket={onSubmit}
              startedPrice={0}
            />
          </main>
        )}
      </Await>
    </Suspense>
  );
};

export default Event;
