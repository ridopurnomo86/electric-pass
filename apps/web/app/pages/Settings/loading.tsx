import { Skeleton } from "~/components/ui/Skeleton";

const ProfileLoading = () => (
  <section>
    <div className="mb-4 border-b pb-4">
      <Skeleton className="mb-1 h-[24px] w-1/5" />
      <Skeleton className="h-[20px] w-[10%]" />
    </div>
    <div>
      <Skeleton className="mb-1 h-[24px] w-[30%]" />
      <Skeleton className="h-[20px] w-[10%]" />
    </div>
    <div className="my-4">
      <Skeleton className="mb-1 h-[20px] w-[10%]" />
      <Skeleton className=" h-[24px] w-[30%]" />
    </div>
    <div className="my-4">
      <Skeleton className="mb-1 h-[20px] w-[10%]" />
      <Skeleton className=" h-[24px] w-2/5" />
    </div>
    <div className="my-4">
      <Skeleton className="mb-1 h-[20px] w-[10%]" />
      <Skeleton className=" h-[24px] w-1/4" />
    </div>
  </section>
);

export default ProfileLoading;
