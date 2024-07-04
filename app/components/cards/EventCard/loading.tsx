import { Skeleton } from "~/components/ui/Skeleton";

const EventCardLoading = () => (
  <article className="size-full overflow-hidden rounded border p-4">
    <Skeleton className="h-[200px] w-full rounded-md" />
    <div>
      <div className="mt-4 flex items-center">
        <Skeleton className="h-[20px] w-full rounded-md" />
      </div>
      <Skeleton className="mt-2 h-[20px]" />
      <Skeleton className="h-[24px]" />
      <div className="mt-2 flex items-center justify-between">
        <Skeleton className="h-[20px] w-full rounded-md" />
      </div>
    </div>
  </article>
);

export default EventCardLoading;
