import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
// import formatPrice from "~/modules/formatPrice";
import dayjs from "dayjs";

type EventCardPropsType = {
  imgUrl: string;
  type: string;
  title: string;
  location: string;
  // price: number;
  navigateTo?: string;
  datetime: string;
};

const EventCard = ({
  imgUrl,
  type,
  title,
  location,
  navigateTo = "#",
  datetime,
  // price = 30,
}: EventCardPropsType) => (
  <Link to={navigateTo} preventScrollReset>
    <article className="size-full overflow-hidden rounded border p-4">
      <div>
        <img
          src={imgUrl}
          alt={`alt-${imgUrl}`}
          className="h-[200px] w-full rounded-md object-cover"
        />
      </div>
      <div>
        <div className="mt-4 flex items-center">
          <Icon icon="ic:round-access-time-filled" className="mr-1 text-neutral-600" />
          <p className="text-sm font-medium text-neutral-600 antialiased">
            {dayjs(datetime).format("MMM D, YYYY")}&nbsp;-
          </p>
          <p className="text-sm font-medium text-neutral-600 antialiased">
            &nbsp;{dayjs(datetime).format("HH:mmA")}
          </p>
        </div>
        <p className="mt-2 text-sm font-medium leading-5 text-neutral-600">{type}</p>
        <p className="scroll-m-20 font-semibold tracking-tight">{title}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <Icon icon="material-symbols:location-on-rounded" className="mr-1 text-neutral-600" />
            <p className="text-sm font-medium text-neutral-600 antialiased">{location}</p>
          </div>
          {/* <div className="rounded bg-indigo-100 px-2 py-1">
            <p className="text-sm font-semibold text-indigo-600 antialiased">
              {price > 0 ? formatPrice(price) : "Free"}
            </p>
          </div> */}
        </div>
      </div>
    </article>
  </Link>
);

export default EventCard;
