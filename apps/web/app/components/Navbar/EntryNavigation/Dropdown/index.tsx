import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { Link, useSubmit } from "@remix-run/react";
import useHttpRequest from "~/hooks/useHttpRequest";
import { useToast } from "~/components/ui/Toaster/useToast";

type DropdownPropsType = {
  name: string;
};

const Dropdown = ({ name }: DropdownPropsType) => {
  const { toast } = useToast();

  const submit = useSubmit();

  const { request } = useHttpRequest({
    path: "/auth/logout",
    method: "POST",
  });

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    const { data, error } = await request();

    if (data)
      return submit(event.currentTarget as HTMLButtonElement, {
        method: "post",
        action: "/logout",
      });

    if (!data || error) {
      const { message } = error.response.data;

      return toast({
        title: "Warning",
        description: message,
        variant: "destructive",
      });
    }

    return toast({
      title: "Warning",
      description: "Something gone wrong",
      variant: "destructive",
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
            <button onClick={onSubmit}>
              <p className="text-sm font-medium text-red-600 antialiased">Logout</p>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
