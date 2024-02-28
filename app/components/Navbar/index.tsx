import Logo from "~/assets/elastic-pass-logo.svg";
import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/Button";

const Navbar = () => (
  <header className="border-b-[1px] mb-8">
    <div className="py-4 px-10 w-full flex items-center justify-between bg-transparent">
      <div className="flex items-center">
        <Link to="/" className="mr-8">
          <div className="w-full">
            <img src={Logo} alt="elastic-pass-logo" className="w-[200px]" />
          </div>
        </Link>
        <div className="gap-8 flex">
          <Link to="/dashboard">
            <p className="text-neutral-600 font-medium antialiased text-sm">Dashboard</p>
          </Link>
          <Link to="/reporting">
            <p className="text-neutral-600 font-medium antialiased text-sm">Reporting</p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/create-event">
          <div className="flex items-center">
            <Icon icon="mdi:event-add" className="text-md text-neutral-600 mr-1" />
            <p className="text-neutral-600 font-medium antialiased text-sm">Create Event</p>
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
