import HeaderLoading from "./Header/loading";
import InformationLoading from "./Information/loading";
import OrganizerInfoLoading from "./OrganizerInfo/loading";

const EventLoading = () => (
  <main className="min-h-screen bg-[#F8FAFC]">
    <section className="container mx-auto grid size-full gap-8 py-4 md:py-10 min-[1024px]:grid-cols-[70%_30%]">
      <div>
        <HeaderLoading />
        <OrganizerInfoLoading />
      </div>
      <InformationLoading />
    </section>
  </main>
);

export default EventLoading;
