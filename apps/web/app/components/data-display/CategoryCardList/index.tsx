import CategoryCard from "~/components/cards/CategoryCard";
import { IconifyIcon } from "@iconify/react";
import { Link } from "@remix-run/react";

type CategoryType = {
  id: number;
  name: string;
  icon: IconifyIcon | string;
};

type CategoryCardListPropsType = {
  title?: string;
  subtitle?: string;
  data: Array<CategoryType>;
  className?: string;
};

<<<<<<< HEAD:app/components/data-display/CategoryCardList/index.tsx
const CategoryCardList = ({ title, subtitle, data, className }: CategoryCardListPropsType) => (
  <section className={className}>
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h3>
=======
const CategoryCardList = ({
  title,
  subtitle,
  data,
  className,
}: CategoryCardListPropsType) => (
  <section className={className}>
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {title}
    </h3>
>>>>>>> 4119967f4fd90070dabbb09e6375abaca5c4daeb:apps/web/app/components/data-display/CategoryCardList/index.tsx
    <p className="text-sm text-neutral-600">{subtitle}</p>
    <div className="flex gap-4 overflow-x-scroll py-4">
      {data.map((item) => (
        <Link to={`/events?category=${item.name}`} key={item.id}>
          <div className="min-w-[180px]">
<<<<<<< HEAD:app/components/data-display/CategoryCardList/index.tsx
            <CategoryCard title={item?.name} totalEvent={10} icon={item?.icon} />
=======
            <CategoryCard
              title={item?.name}
              totalEvent={10}
              icon={item?.icon}
            />
>>>>>>> 4119967f4fd90070dabbb09e6375abaca5c4daeb:apps/web/app/components/data-display/CategoryCardList/index.tsx
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryCardList;
