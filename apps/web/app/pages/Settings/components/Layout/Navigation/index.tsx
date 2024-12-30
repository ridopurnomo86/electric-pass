import { Toggle } from "~/components/ui/Toggle";
import { Link, useLocation } from "@remix-run/react";
import DATA from "./data";

const Navigation = ({ role }: { role: "user" | "organizer" }) => {
  const location = useLocation();

  return (
    <nav className="flex items-start gap-2 overflow-x-scroll md:flex-col md:gap-1 md:overflow-x-hidden">
      {DATA.map((item) => (
        <Link to={item.link} key={item.id} className="inline min-w-fit md:block md:w-full">
          <Toggle
            className="flex w-full items-center justify-start"
            defaultPressed={location.pathname === item.link}
          >
            {item.name}
          </Toggle>
        </Link>
      ))}
      {role === "organizer" && (
        <Link to="/settings/project" className="inline min-w-fit md:block md:w-full">
          <Toggle
            className="flex w-full items-center justify-start"
            defaultPressed={location.pathname.includes("/settings/project")}
          >
            Projects
          </Toggle>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
