import { Skeleton } from "~/components/ui/Skeleton";

const OrganizerInfoLoading = () => (
  <div className="min-[1024px]:hidden">
    <div className="mb-4 flex gap-4 rounded-md border bg-white px-6 py-4 max-[570px]:flex-col">
      <div className="flex">
        <div>
          <Skeleton className="size-[35px] rounded-full" />
        </div>
        <div className="ml-3 w-full">
          <Skeleton className="mb-1 h-[20px] w-[150px] rounded-md" />
          <Skeleton className="mb-1 h-[14px] w-[70px] rounded-md" />
          <Skeleton className="mb-1 h-[14px] w-[50px] rounded-md" />
        </div>
      </div>
      <div className="flex">
        <div>
          <Skeleton className="size-[35px] rounded-full" />
        </div>
        <div className="ml-3 w-full">
          <Skeleton className="mb-1 h-[20px] w-[150px] rounded-md" />
          <Skeleton className="mb-1 h-[14px] w-[70px] rounded-md" />
          <Skeleton className="mb-1 h-[14px] w-[50px] rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

export default OrganizerInfoLoading;
