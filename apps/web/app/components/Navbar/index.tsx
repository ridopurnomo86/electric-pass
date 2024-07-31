import { useLocation } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import MainNavigation from "./MainNavigation";
import EntryNavigation from "./EntryNavigation";
import Drawer from "./Drawer";

type NavbarPropsType = {
  isAuthenticated: boolean;
  name: string;
};

const Navbar = ({ isAuthenticated, name }: NavbarPropsType) => {
  const location = useLocation();

  return (
    <header className="relative border-b">
      <div className="flex w-full items-center justify-between bg-transparent px-10 py-4 max-[894px]:px-8">
        <MainNavigation />
        <EntryNavigation isAuthenticated={isAuthenticated} name={name} />
        <ClientOnly fallback={null} key={location.pathname}>
          {() => <Drawer isAuthenticated={isAuthenticated} name={name} />}
        </ClientOnly>
      </div>
    </header>
  );
};

export default Navbar;
