import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";

type OrganizerInfoPropsType = {
  eventDate: string;
  city: string;
  country: string;
  organizerImageUrl: string;
  organizerName: string;
};

const OrganizerInfo = ({ organizerImageUrl, organizerName, eventDate }: OrganizerInfoPropsType) => (
  <div className="min-[1024px]:hidden">
    <div className="mb-4 flex gap-4 rounded-md border bg-white px-6 py-4 max-[570px]:flex-col">
      <div className="flex">
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
      <div className="flex">
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
    </div>
  </div>
);

export default OrganizerInfo;
