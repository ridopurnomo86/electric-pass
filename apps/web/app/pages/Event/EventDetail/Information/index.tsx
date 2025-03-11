import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import dayjs from "dayjs";
import { Button } from "~/components/ui/Button";

type InformationPropsType = {
  eventDate: string;
  city: string;
  country: string;
  organizerImageUrl: string;
  organizerName: string;
  isLoading: boolean;
  onSubmit: (event: React.FormEvent) => void;
};

const Information = ({
  eventDate,
  city,
  country,
  organizerImageUrl,
  organizerName,
  isLoading = false,
  onSubmit,
}: InformationPropsType) => {
  const isEventEnded = dayjs().isAfter(dayjs(eventDate).format());

  return (
    <div className="mr-4 max-h-min rounded-md border bg-white px-6 py-4 max-[1024px]:hidden">
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
            src={
              organizerImageUrl
                ? organizerImageUrl
                : "https://images.unsplash.com/photo-1535074049622-26a855b904c2?w=800&dpr=2&q=80"
            }
            alt={`organizer ${organizerName}`}
            className="size-[35px] rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="mb-1 text-sm font-medium text-neutral-600 antialiased">
            Community Organizer
          </p>
          <p className="text-sm font-medium antialiased">{organizerName}</p>
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
            {city}, {country}
          </p>
        </div>
      </div>
      {isEventEnded ? (
        <div>
          <p className="mb-4 text-sm font-medium antialiased">
            Sorry this event has ended, please find other interesting events.
          </p>
          <Link to="/events">
            <Button className="w-full">Find Event</Button>
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-sm font-medium antialiased">
            This event not started yet, booked some tickets.
          </p>
          <form method="POST" onSubmit={onSubmit}>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Buy Ticket
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Information;
