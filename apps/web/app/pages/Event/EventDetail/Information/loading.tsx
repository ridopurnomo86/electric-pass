import { Skeleton } from "~/components/ui/Skeleton";

const InformationLoading = () => (
  <div className="mr-4 max-h-min rounded-md border bg-white px-6 py-4 max-[1024px]:hidden">
    <div className="mb-4 flex border-b pb-4">
      <Skeleton className="size-[35px] rounded-full" />
      <div className="ml-3">
        <Skeleton className="mb-1 h-[20px] w-[150px] rounded-md" />
        <Skeleton className="mb-1 h-[14px] w-[70px] rounded-md" />
        <Skeleton className="mb-1 h-[14px] w-[50px] rounded-md" />
      </div>
    </div>
    <div className="mb-4 flex border-b pb-4">
      <Skeleton className="size-[35px] rounded-full" />
      <div className="ml-3">
        <Skeleton className="mb-1 h-[20px] w-[150px] rounded-md" />
        <Skeleton className="mb-1 h-[14px] w-[70px] rounded-md" />
        <Skeleton className="mb-1 h-[14px] w-[50px] rounded-md" />
      </div>
    </div>
    <div className="mb-4 flex border-b pb-4">
      <Skeleton className="size-[35px] rounded-full" />
      <div className="ml-3">
        <Skeleton className="mb-1 h-[20px] w-[150px] rounded-md" />
        <Skeleton className="mb-1 h-[14px] w-[70px] rounded-md" />
        <Skeleton className="mb-1 h-[14px] w-[50px] rounded-md" />
      </div>
    </div>
    <div>
      <Skeleton className="mb-2 h-[14px] w-full rounded-md" />
      <Skeleton className="h-[36px] w-full rounded-md" />
    </div>
  </div>
);

export default InformationLoading;
