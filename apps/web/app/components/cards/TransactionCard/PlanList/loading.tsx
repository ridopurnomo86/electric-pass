import { Skeleton } from "~/components/ui/Skeleton";

const PlanListLoading = () => (
  <div className="flex">
    <div className="mr-3">
      <Skeleton className="size-[60px] rounded" />
    </div>
    <div>
      <div className="flex">
        <Skeleton className="h-[16px] w-[40px] rounded" />
      </div>
      <Skeleton className="mt-1 h-[12px] w-[90px] rounded" />
      <Skeleton className="mt-2 h-[16px] w-[80px] rounded" />
    </div>
  </div>
);

export default PlanListLoading;
