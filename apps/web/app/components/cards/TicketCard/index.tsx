import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import formatPrice from "~/modules/formatPrice";

type TicketCardPropsType = {
  title: string;
  description: string;
  expiredDate: string;
  price: number;
  isSoldOut: boolean;
  endedDate: string;
  onClick?: () => void;
};

const renderTag = ({
  date,
  soldOut,
  endedDate,
}: {
  date: string;
  soldOut: boolean;
  endedDate: string;
}) => {
  const isEventEnded = dayjs().isAfter(dayjs(endedDate).format());

  if (isEventEnded) return <p className="font-bold text-red-600">EVENT ENDED</p>;
  if (dayjs(date).isBefore(dayjs().format()))
    return <p className="font-bold text-red-600">SALE ENDED</p>;
  if (soldOut) return <p className="font-bold text-red-600">SOLD OUT</p>;

  return null;
};

const TicketCard = ({
  title,
  description,
  expiredDate,
  endedDate,
  price,
  isSoldOut = false,
  onClick,
}: TicketCardPropsType) => (
  <button
    onClick={onClick}
    className="block w-full text-left 
    before:absolute before:-bottom-1 before:-left-5 before:top-[43%] before:size-8 before:rounded-full before:border before:border-y-0 before:border-l-0 before:bg-[#F8FAFC] before:content-['']
    after:absolute after:-bottom-1 after:-right-5 after:top-[43%] after:size-8 after:rounded-full after:border after:border-y-0 after:border-r-0 after:bg-[#F8FAFC] after:content-['']"
  >
    <article className="overflow-hidden rounded-md border bg-white px-8 py-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
        {title}
      </h2>
      <p className="text-sm leading-normal [&:not(:first-child)]:mt-2">{description}</p>
      <div className="mt-3">
        <div className="flex items-center">
          <Icon icon="ic:round-access-time-filled" className="mr-1 text-neutral-600" />
          <p className="mt-1 text-sm leading-normal text-indigo-600">
            Ends on {dayjs(expiredDate).format("MMM D YYYY, HH:mm A")}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-bold">{formatPrice(price)}</p>
        {renderTag({ date: expiredDate, soldOut: isSoldOut, endedDate })}
      </div>
    </article>
  </button>
);

export default TicketCard;
