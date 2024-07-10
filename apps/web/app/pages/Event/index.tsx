import TabsNavigation from "~/components/core/TabsNavigation";
import { useState } from "react";
import Description from "./content/Description";
import Ticket from "./content/Ticket";
import Header from "./Header";
import Information from "./Information";

const EVENT_DATE = "2025-04-20T14:31:37+07:00";

const Event = () => {
  const [type, setType] = useState<"description" | "ticket">("description");

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="container mx-auto grid size-full gap-8 py-4 md:grid-cols-[70%_30%] md:py-10">
        <div>
          <Header />
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
            <Description />
          ) : (
            <Ticket eventDate={EVENT_DATE} />
          )}
        </div>
        <Information eventDate={EVENT_DATE} />
      </section>
    </main>
  );
};

export default Event;
