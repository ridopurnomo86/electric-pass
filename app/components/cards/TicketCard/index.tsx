import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import formatPrice from "~/modules/formatPrice";

type TicketCardPropsType = {
  title: string;
  description: string;
  expiredDate: string;
  price: number;
  isSoldOut: boolean;
};

const renderTag = ({ date, soldOut }: { date: string; soldOut: boolean }) => {
  if (dayjs(date).isBefore(dayjs().format()))
    return <p className="font-bold text-red-600">SALE ENDED</p>;
  if (soldOut) return <p className="font-bold text-red-600">SOLD OUT</p>;
  return null;
};

const TicketCard = ({
  title,
  description,
  expiredDate,
  price,
  isSoldOut = false,
}: TicketCardPropsType) => (
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
    <div className="my-4 border-b-2 border-dashed">
      <div className="absolute -left-4 -mt-3 size-8 rounded-full border-r-[1px] bg-[#F8FAFC]"></div>
      <div className="absolute -right-4 -mt-3 size-8 rounded-full border-l-[1px] bg-[#F8FAFC]"></div>
    </div>
    <div className="flex items-center justify-between">
      <p className="font-bold">{formatPrice(price)}</p>
      {renderTag({ date: expiredDate, soldOut: isSoldOut })}
    </div>
  </article>
);

export default TicketCard;
