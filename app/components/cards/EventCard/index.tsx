import { AspectRatio } from "~/components/ui/AspectRatio";
import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";

type EventCardPropsType = {
  imgUrl: string;
  type: string;
  title: string;
  location: string;
  startDate: string;
  startTime: string;
  navigateTo?: string;
};

const EventCard = ({
  imgUrl,
  type,
  title,
  location,
  startDate,
  startTime,
  navigateTo = "#",
}: EventCardPropsType) => (
  <Link to={navigateTo}>
    <article className="size-full overflow-hidden rounded border p-4">
      <div>
        <AspectRatio ratio={16 / 10}>
          <img
            src={imgUrl}
            alt={`alt-${imgUrl}`}
            className="h-[200px] w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div>
        <p className="mt-4 text-sm font-medium leading-5 text-neutral-600">{type}</p>
        <p className="scroll-m-20 font-semibold tracking-tight">{title}</p>
        <div className="mb-1 mt-2 flex items-center">
          <Icon icon="material-symbols:location-on-rounded" className="mr-1 text-neutral-600" />
          <p className="text-sm font-medium text-neutral-600 antialiased">{location}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon icon="ic:round-calendar-month" className="mr-1 text-neutral-600" />
            <p className="text-sm font-medium text-neutral-600 antialiased">{startDate}</p>
          </div>
          <div className="flex items-center">
            <Icon icon="ic:round-access-time-filled" className="mr-1 text-neutral-600" />
            <p className="text-sm font-medium text-neutral-600 antialiased">{startTime}</p>
          </div>
        </div>
      </div>
    </article>
  </Link>
);

export default EventCard;
