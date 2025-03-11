import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { Button } from "~/components/ui/Button";
import Dropdown from "./Dropdown";

type EntryNavigationPropsType = {
  isAuthenticated: boolean;
  name: string;
};

const EntryNavigation = ({ isAuthenticated, name }: EntryNavigationPropsType) => {
  if (isAuthenticated) return <Dropdown name={name} />;

  return (
    <div className="flex items-center gap-4 max-[894px]:hidden">
      <Link to="/settings/project/create">
        <div className="flex items-center">
          <Icon icon="mdi:event-add" className="mr-1 text-neutral-600" />
          <p className="text-sm font-medium text-neutral-600 antialiased">Create Event</p>
        </div>
      </Link>
      <span className="h-8 w-px bg-neutral-600"></span>
      <div className="flex gap-4">
        <Link to="/login">
          <Button variant="outline">Log in</Button>
        </Link>
        <Link to="/create-account">
          <Button>Create Account</Button>
        </Link>
      </div>
    </div>
  );
};

export default EntryNavigation;
