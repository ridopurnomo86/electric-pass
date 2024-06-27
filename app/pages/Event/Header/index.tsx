import { Icon } from "@iconify/react";

const Header = () => (
  <div>
    <h2 className="mb-4 mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      Manufacture AI
    </h2>
    <div className="mb-4 flex gap-4">
      <div className="flex items-center">
        <Icon icon="clarity:world-solid" className="mr-1 text-neutral-600" />
        <p className="text-sm font-medium text-neutral-600 antialiased">Jakarta, Indonesia</p>
      </div>
      <div className="flex items-center">
        <Icon icon="bxs:category" className="mr-1 text-neutral-600" />
        <p className="text-sm font-medium text-neutral-600 antialiased">IT & Development</p>
      </div>
    </div>
    <div>
      <img
        src="https://images.unsplash.com/photo-1718471472310-77a63c5fad95?w=800&dpr=2&q=80"
        alt=""
        className="mb-4 aspect-square max-h-[350px] w-full rounded object-cover"
      />
    </div>
  </div>
);

export default Header;
