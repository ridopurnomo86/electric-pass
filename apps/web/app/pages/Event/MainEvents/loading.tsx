import EventCardLoading from "~/components/cards/EventCard/loading";
import { Skeleton } from "~/components/ui/Skeleton";

const MainEventsLoading = () => (
  <div>
    <div className="border-b px-10 py-4">
      <Skeleton className="mb-1 h-[32px] w-1/5 rounded" />
      <Skeleton className="h-[16px] w-[10%] rounded" />
    </div>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4 px-10 py-4">
      {[...Array(4).keys()].map((_, idx) => (
        <div className="min-w-[450px]" key={idx}>
          <EventCardLoading />
        </div>
      ))}
    </div>
  </div>
);

export default MainEventsLoading;
