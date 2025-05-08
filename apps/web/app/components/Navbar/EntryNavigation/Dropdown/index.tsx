import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import Cookies from "js-cookie";
import { Link, useSubmit } from "@remix-run/react";

type DropdownPropsType = {
  name: string;
};

const Dropdown = ({ name }: DropdownPropsType) => {
  const submit = useSubmit();

  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    Cookies.remove("ep-tkn");
    submit(event.currentTarget as HTMLButtonElement, {
      method: "post",
      action: "/logout",
    });
  };

  return (
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
            <form action="/">
              <button onClick={onSubmit} type="submit">
                <p className="text-sm font-medium text-red-600 antialiased">Logout</p>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
