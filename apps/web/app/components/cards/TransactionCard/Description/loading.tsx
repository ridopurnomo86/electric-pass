import { Skeleton } from "~/components/ui/Skeleton";

const DescriptionLoading = () => (
  <div className="flex justify-between">
    <div>
      <Skeleton className="h-[12px] w-[40px] rounded" />
      <Skeleton className="mt-1 h-[12px] w-[60px] rounded" />
    </div>
  </div>
);

export default DescriptionLoading;
