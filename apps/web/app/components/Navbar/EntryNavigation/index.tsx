import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { Button } from "~/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";

type EntryNavigationPropsType = {
  isAuthenticated: boolean;
  name: string;
};

const EntryNavigation = ({ isAuthenticated, name }: EntryNavigationPropsType) =>
  isAuthenticated ? (
    <div className="flex items-center gap-4 max-[894px]:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded border px-4 py-1">
          <div className="flex items-center gap-2">
            <Icon icon="ph:user" className="text-sm text-neutral-600" />
            <p className="text-sm font-medium text-neutral-600 antialiased">{name}</p>
            <Icon
              icon="iconamoon:arrow-up-2-bold"
              className="rotate-180 text-sm text-neutral-600"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <form method="POST" action="/logout">
              <button>
                <p className="text-sm font-medium text-red-600 antialiased">Logout</p>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
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

export default EntryNavigation;
