import { Skeleton } from "~/components/ui/Skeleton";

const HeaderLoading = () => (
  <div className="w-full">
    <Skeleton className="mb-4 h-[36px] w-3/5 rounded-md md:w-2/5" />
    <div className="mb-4 flex gap-4">
      <Skeleton className="mb-4 h-[20px] w-2/5 rounded-md md:w-1/5" />
    </div>
    <div>
      <Skeleton className="mb-4 h-[350px] w-full rounded-md" />
    </div>
  </div>
);

export default HeaderLoading;
