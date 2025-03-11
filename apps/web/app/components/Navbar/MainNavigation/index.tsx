import { Link } from "@remix-run/react";
import Logo from "~/assets/electric-pass-logo.svg";

type MainNavigationPropsType = {
  hasHideNavigation: boolean;
};

const MainNavigation = ({ hasHideNavigation = false }: MainNavigationPropsType) => (
  <div className="flex h-9 items-center">
    <Link to="/" className="mr-8" replace>
      <div className="w-full">
        <img src={Logo} alt="electric-pass-logo" className="w-[200px]" />
      </div>
    </Link>
    {!hasHideNavigation && (
      <div className="flex gap-8 max-[894px]:hidden">
        <Link to="/dashboard">
          <p className="text-sm font-medium text-neutral-600 antialiased">Dashboard</p>
        </Link>
        <Link to="/reporting">
          <p className="text-sm font-medium text-neutral-600 antialiased">Reporting</p>
        </Link>
      </div>
    )}
  </div>
);

export default MainNavigation;
