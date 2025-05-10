import { useLoaderData } from "@remix-run/react";
import { MainEventLoader } from "services/main/event/main-event";
import EventCard from "~/components/cards/EventCard";
import Mainlayout from "~/components/layout/MainLayout";
import { EventDataType } from "~/data/test-data/types";

const MainEvents = () => {
  const { serverData } = useLoaderData<typeof MainEventLoader>();

  return (
    <Mainlayout>
      <main className="min-h-screen">
        <section className="">
          <div className="border-b px-10 py-4">
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Events List</h1>
            <p className="text-sm text-neutral-600">Book your next availability event.</p>
          </div>
          <div className="flex flex-wrap gap-6 px-10 py-4">
            {serverData.events?.map((item: EventDataType) => (
              <div className="w-[439px]" key={item.id}>
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
        </section>
      </main>
    </Mainlayout>
  );
};

export default MainEvents;
