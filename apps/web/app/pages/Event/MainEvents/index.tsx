import { useLoaderData } from "@remix-run/react";
import { MainEventLoader } from "services/main/event/main-event";
import Mainlayout from "~/components/layout/MainLayout";
import Header from "./Header";
import EventGrid from "./EventGrid";

const MainEvents = () => {
  const { serverData } = useLoaderData<typeof MainEventLoader>();

  return (
    <Mainlayout>
      <main className="min-h-screen">
        <section>
          <Header totalEvent={serverData.events.length} />
          <EventGrid events={serverData.events} />
        </section>
      </main>
    </Mainlayout>
  );
};

export default MainEvents;
