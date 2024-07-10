import { Link } from "@remix-run/react";
import Logo from "~/assets/elastic-pass-logo.svg";

const MainNavigation = () => (
  <div className="flex items-center">
    <Link to="/" className="mr-8">
      <div className="w-full">
        <img src={Logo} alt="elastic-pass-logo" className="w-[200px]" />
      </div>
    </Link>
    <div className="flex gap-8 max-[894px]:hidden">
      <Link to="/dashboard">
        <p className="text-sm font-medium text-neutral-600 antialiased">
          Dashboard
        </p>
      </Link>
      <Link to="/reporting">
        <p className="text-sm font-medium text-neutral-600 antialiased">
          Reporting
        </p>
      </Link>
    </div>
  </div>
);

export default MainNavigation;
