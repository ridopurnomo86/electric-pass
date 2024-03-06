import { Icon, IconifyIcon } from "@iconify/react";

type CategoryCardPropsType = {
  title: string;
  totalEvent?: number;
  icon: IconifyIcon | string;
};

const CategoryCard = ({ title, totalEvent = 0, icon }: CategoryCardPropsType) => (
  <article className="flex size-full items-center rounded-md bg-neutral-200 p-4">
    <Icon icon={icon} className="mr-4 text-3xl text-indigo-600" />
    <div>
      <p className="text-base font-medium leading-4 text-neutral-900 antialiased">{title}</p>
      <p className="text-sm font-normal text-neutral-600 antialiased">{totalEvent} Events</p>
    </div>
  </article>
);

export default CategoryCard;
