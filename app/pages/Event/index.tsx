import TabsNavigation from "~/components/core/TabsNavigation";
import { useState } from "react";
import Description from "./Description";
import Ticket from "./Ticket";
import Header from "./Header";

const Event = () => {
  const [type, setType] = useState<"description" | "ticket">("description");

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="container mx-auto grid size-full py-4 md:grid-cols-[60%_40%] md:py-10">
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
          {type === "description" ? <Description /> : <Ticket />}
        </div>
      </section>
    </main>
  );
};

export default Event;
