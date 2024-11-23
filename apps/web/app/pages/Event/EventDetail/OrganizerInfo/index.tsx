import { Link } from "@remix-run/react";

type OrganizerInfoPropsType = {
  eventDate: string;
  city: string;
  country: string;
  organizerImageUrl: string;
  organizerName: string;
};

const OrganizerInfo = ({ organizerImageUrl, organizerName }: OrganizerInfoPropsType) => (
  <div className="min-[1024px]:hidden">
    <div className="mb-4 rounded-md border bg-white px-6 py-4">
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
    </div>
  </div>
);

export default OrganizerInfo;
