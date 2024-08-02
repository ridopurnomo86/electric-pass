import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import dayjs from "dayjs";
import { Button } from "~/components/ui/Button";

type InformationPropsType = {
  eventDate: string;
};

const Information = ({ eventDate }: InformationPropsType) => (
  <div>
    <div className="rounded-md border bg-white px-6 py-4">
      <div className="mb-4 flex border-b pb-4">
        <Icon icon="fluent:calendar-48-filled" className="size-[35px] text-neutral-600" />
        <div className="ml-3">
          <p className="mb-1 text-sm font-medium text-neutral-600 antialiased">Date & Time</p>
          <p className="text-sm font-medium text-neutral-600 antialiased">
            {dayjs(eventDate).format("MMMM D, YYYY")}
          </p>
          <p className="text-sm font-medium text-neutral-600 antialiased">
            {dayjs(eventDate).format("HH:mm A")} Pacific Time
          </p>
        </div>
      </div>
      <div className="mb-4 flex border-b pb-4">
        <div>
          <img
            src={`https://images.unsplash.com/photo-1535074049622-26a855b904c2?w=800&dpr=2&q=80`}
            alt={`alt`}
            className="size-[35px] rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="mb-1 text-sm font-medium text-neutral-600 antialiased">
            Community Organizer
          </p>
          <p className="text-sm font-medium antialiased">Yoga Studio</p>
          <Link to="#">
            <p className="text-sm font-medium text-indigo-600 antialiased">See More.</p>
          </Link>
        </div>
      </div>
      <div className="mb-4 flex border-b pb-4">
        <Icon icon="hugeicons:location-08" className="size-[35px] text-neutral-600" />
        <div className="ml-3">
          <p className="mb-1 text-sm font-medium text-neutral-600 antialiased">Location</p>
          <p className="text-sm font-medium text-neutral-600 antialiased">
            {dayjs(eventDate).format("MMMM D, YYYY")}
          </p>
          <p className="text-sm font-medium text-neutral-600 antialiased">
            {dayjs(eventDate).format("HH:mm A")} Pacific Time
          </p>
        </div>
      </div>
      <div>
        <p className="mb-4 text-sm font-medium antialiased">
          Sorry this event has ended, please find other interesting events.
        </p>
        <Link to="/events">
          <Button className="w-full">Find Event</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Information;
