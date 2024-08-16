import { Skeleton } from "~/components/ui/Skeleton";

const CreateProjectLoading = () => (
  <section className="mb-8 space-y-4">
    <div className="mb-6 space-y-2">
      <Skeleton className="mb-3 h-[16px] w-1/5" />
      <Skeleton className="h-[32px] w-full" />
    </div>
    <div className="mb-6 space-y-2">
      <Skeleton className="mb-3 h-[16px] w-[50px]" />
      <Skeleton className="h-[32px] w-full" />
    </div>
    <div className="mb-6 space-y-2">
      <Skeleton className="mb-3 h-[16px] w-1/5" />
      <Skeleton className="h-[32px] w-full" />
    </div>
    <div className="mb-6 space-y-2">
      <Skeleton className="mb-3 h-[16px] w-[50px]" />
      <Skeleton className="h-[32px] w-full" />
    </div>
  </section>
);

export default CreateProjectLoading;
