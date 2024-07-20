import MainNavigation from "./MainNavigation";
import EntryNavigation from "./EntryNavigation";
import Drawer from "./Drawer";

type NavbarPropsType = {
  isAuthenticated: boolean;
  name: string;
};

const Navbar = ({ isAuthenticated, name }: NavbarPropsType) => (
  <header className="relative border-b">
    <div className="flex w-full items-center justify-between bg-transparent px-10 py-4 max-[894px]:px-8">
      <MainNavigation />
      <EntryNavigation isAuthenticated={isAuthenticated} name={name} />
      <Drawer isAuthenticated={isAuthenticated} name={name} />
    </div>
  </header>
);

export default Navbar;
