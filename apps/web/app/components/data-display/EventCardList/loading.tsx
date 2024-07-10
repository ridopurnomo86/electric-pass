import EventCardLoading from "~/components/cards/EventCard/loading";
import { Skeleton } from "~/components/ui/Skeleton";

type EventCardListLoadingPropsType = {
  className?: string;
  count?: number;
};

<<<<<<< HEAD:app/components/data-display/EventCardList/loading.tsx
const EventCardListLoading = ({ className, count = 3 }: EventCardListLoadingPropsType) => (
  <div className={className}>
    <Skeleton className="mb-1 h-[32px] w-[20%] rounded" />
=======
const EventCardListLoading = ({
  className,
  count = 3,
}: EventCardListLoadingPropsType) => (
  <div className={className}>
    <Skeleton className="mb-1 h-[32px] w-1/5 rounded" />
>>>>>>> 4119967f4fd90070dabbb09e6375abaca5c4daeb:apps/web/app/components/data-display/EventCardList/loading.tsx
    <Skeleton className="h-[16px] w-[10%] rounded" />
    <div className="flex gap-4 overflow-x-scroll py-4">
      {[...Array(count).keys()].map((_, idx) => (
        <div className="min-w-[450px]" key={idx}>
          <EventCardLoading />
        </div>
      ))}
    </div>
  </div>
);

export default EventCardListLoading;
