import { Button } from "~/components/ui/Button";
import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";

const Header = () => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-xl font-semibold tracking-tight text-neutral-900">Projects</p>
      <p className="text-sm font-medium text-neutral-500">Some of projects.</p>
    </div>
    <div>
      <Link to="/settings/project/create">
        <Button>
          <Icon icon="fluent:add-16-filled" className="mr-2" />
          <p>Create</p>
        </Button>
      </Link>
    </div>
  </div>
);

export default Header;
