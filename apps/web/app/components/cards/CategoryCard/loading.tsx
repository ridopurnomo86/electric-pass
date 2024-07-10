import { Skeleton } from "~/components/ui/Skeleton";

const CategoryCardLoading = () => (
  <div className="flex size-full items-center rounded bg-neutral-200 p-4">
    <div className="mr-3">
      <Skeleton className="size-[40px] rounded" />
    </div>
    <div className="w-full">
      <Skeleton className="mb-1 h-[14px] w-[50%] rounded" />
      <Skeleton className="h-[14px] w-full rounded" />
    </div>
  </div>
);

export default CategoryCardLoading;
