import { Skeleton } from "~/components/ui/Skeleton";
import CategoryCardLoading from "~/components/cards/CategoryCard/loading";

type CategoryCardListLoadingPropsType = {
  className?: string;
  count?: number;
};

<<<<<<< HEAD:app/components/data-display/CategoryCardList/loading.tsx
const CategoryCardListLoading = ({ className, count = 4 }: CategoryCardListLoadingPropsType) => (
  <section className={className}>
    <Skeleton className="mb-1 h-[32px] w-[20%] rounded" />
=======
const CategoryCardListLoading = ({
  className,
  count = 4,
}: CategoryCardListLoadingPropsType) => (
  <section className={className}>
    <Skeleton className="mb-1 h-[32px] w-1/5 rounded" />
>>>>>>> 4119967f4fd90070dabbb09e6375abaca5c4daeb:apps/web/app/components/data-display/CategoryCardList/loading.tsx
    <Skeleton className="h-[16px] w-[10%] rounded" />
    <div className="flex gap-4 overflow-x-scroll py-4">
      {[...Array(count).keys()].map((_, idx) => (
        <div className="min-w-[180px]" key={idx}>
          <CategoryCardLoading />
        </div>
      ))}
    </div>
  </section>
);

export default CategoryCardListLoading;
