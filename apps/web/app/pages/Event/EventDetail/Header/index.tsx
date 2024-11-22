import { Icon } from "@iconify/react";

type HeaderPropsType = {
  title: string;
  location: string;
  topic: string;
  imageUrl: string;
  slug: string;
};

const Header = ({ title, location, topic, imageUrl, slug }: HeaderPropsType) => (
  <div>
    <h2 className="mb-4 mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {title}
    </h2>
    <div className="mb-4 flex gap-4">
      <div className="flex items-center">
        <Icon icon="clarity:world-solid" className="mr-1 text-neutral-600" />
        <p className="text-sm font-medium text-neutral-600 antialiased">{location}</p>
      </div>
      <div className="flex items-center">
        <Icon icon="bxs:category" className="mr-1 text-neutral-600" />
        <p className="text-sm font-medium text-neutral-600 antialiased">{topic}</p>
      </div>
    </div>
    <div>
      <img
        src={
          imageUrl
            ? imageUrl
            : "https://images.unsplash.com/photo-1718471472310-77a63c5fad95?w=800&dpr=2&q=80"
        }
        alt={`image-${slug}`}
        className="mb-4 aspect-square max-h-[350px] w-full rounded object-cover"
      />
    </div>
  </div>
);

export default Header;
