import { Skeleton } from "~/components/ui/Skeleton";
import PlanListLoading from "./PlanList/loading";
import DescriptionLoading from "./Description/loading";

const TransactionCardLoading = () => (
  <div className="size-full overflow-hidden rounded-md border px-6 py-4">
    <div className="flex items-center justify-between border-b border-dotted pb-3">
      <div className="flex items-center">
        <Skeleton className="h-[14px] w-[90px] rounded" />
      </div>
    </div>
    <div className="py-4">
      <PlanListLoading />
    </div>
    <DescriptionLoading />
  </div>
);

export default TransactionCardLoading;
