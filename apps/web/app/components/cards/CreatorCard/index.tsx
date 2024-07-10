import { Link } from "@remix-run/react";

type CreatorCardPropsType = {
  title: string;
  imgUrl: string;
  description: string;
  navigateTo: string;
};

const CreatorCard = ({ title, imgUrl, description, navigateTo }: CreatorCardPropsType) => (
  <Link to={navigateTo}>
    <article className="flex size-full flex-col rounded-md border bg-transparent p-4 transition-all hover:bg-slate-100">
      <div className="max-w-[60px]">
        <img
          src={imgUrl}
          alt={`alt-${imgUrl}`}
          className="h-[60px] w-full rounded-full object-cover"
        />
      </div>
      <p className="mt-4 text-wrap text-base font-semibold leading-4 text-neutral-900 antialiased">
        {title}
      </p>
      <p className="mt-2 text-sm font-medium text-neutral-600 antialiased">{description}</p>
    </article>
  </Link>
);

export default CreatorCard;
