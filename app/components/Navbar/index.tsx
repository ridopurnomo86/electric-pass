import Logo from "~/assets/elastic-pass-logo.svg";
import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/Button";

const Navbar = () => (
  <header className="border-b-[1px]">
    <div className="flex w-full items-center justify-between bg-transparent px-10 py-4">
      <div className="flex items-center">
        <Link to="/" className="mr-8">
          <div className="w-full">
            <img src={Logo} alt="elastic-pass-logo" className="w-[200px]" />
          </div>
        </Link>
        <div className="flex gap-8">
          <Link to="/dashboard">
            <p className="text-sm font-medium text-neutral-600 antialiased">Dashboard</p>
          </Link>
          <Link to="/reporting">
            <p className="text-sm font-medium text-neutral-600 antialiased">Reporting</p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/create-event">
          <div className="flex items-center">
            <Icon icon="mdi:event-add" className="mr-1 text-neutral-600" />
            <p className="text-sm font-medium text-neutral-600 antialiased">Create Event</p>
          </div>
        </Link>
        <span className="h-8 w-[1px] bg-neutral-600"></span>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link to="/create-account">
            <Button>Create Account</Button>
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
