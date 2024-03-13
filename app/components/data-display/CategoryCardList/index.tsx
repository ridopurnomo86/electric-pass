import CategoryCard from "~/components/cards/CategoryCard";
import { IconifyIcon } from "@iconify/react";
import { Link } from "@remix-run/react";

type CategoryType = {
  id: number;
  title: string;
  totalEvent: number;
  icon: IconifyIcon | string;
  navigateTo: string;
};

type CategoryCardListPropsType = {
  title?: string;
  subtitle?: string;
  data: Array<CategoryType>;
};

const CategoryCardList = ({ title, subtitle, data }: CategoryCardListPropsType) => (
  <section className="container mx-auto mt-12">
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h3>
    <p className="text-xs text-neutral-600">{subtitle}</p>
    <div className="flex gap-4 overflow-x-scroll py-4">
      {data.map((item) => (
        <Link to={item.navigateTo} key={item.id}>
          <div className="min-w-[180px]">
            <CategoryCard title={item.title} totalEvent={item.totalEvent} icon={item.icon} />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryCardList;
