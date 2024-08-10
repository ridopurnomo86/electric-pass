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

const CategoryCardList = ({ title, subtitle, data, className }: CategoryCardListPropsType) => (
  <section className={className}>
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h3>
    <p className="text-sm text-neutral-600">{subtitle}</p>
    <div className="flex gap-4 overflow-x-scroll py-4">
      {data.map((item) => (
        <Link to={`/events?category=${item.name.toLocaleLowerCase()}`} key={item.id}>
          <div className="min-w-[200px]">
            <CategoryCard title={item?.name} totalEvent={10} icon={item?.icon} />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryCardList;
