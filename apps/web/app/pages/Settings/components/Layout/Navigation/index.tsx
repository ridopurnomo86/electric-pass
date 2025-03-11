import { Toggle } from "~/components/ui/Toggle";
import { Link, useLocation, useNavigation } from "@remix-run/react";
import CircularLoading from "~/components/core/CircularLoading";
import { useState } from "react";
import DATA from "./data";

const Navigation = ({ role }: { role: "user" | "organizer" }) => {
  const { state } = useNavigation();
  const location = useLocation();
  const [navigateTo, setNavigateTo] = useState("");

  return (
    <nav className="flex items-start gap-2 overflow-x-scroll md:flex-col md:gap-1 md:overflow-x-hidden">
      {DATA.map((item) => (
        <Link to={item.link} key={item.id} className="inline min-w-fit md:block md:w-full">
          <Toggle
            key={item.id}
            onClick={() => setNavigateTo(item.name)}
            className="flex w-full items-center justify-between"
            defaultPressed={location.pathname === item.link && item.name !== navigateTo}
          >
            {item.name}
            {navigateTo === item.name && state === "loading" && (
              <CircularLoading className="ml-2 md:ml-0" size={4} />
            )}
          </Toggle>
        </Link>
      ))}
      {role === "organizer" && (
        <Link to="/settings/project" className="inline min-w-fit md:block md:w-full">
          <Toggle
            onClick={() => setNavigateTo("Project")}
            className="flex w-full items-center justify-between"
            defaultPressed={location.pathname === "/settings/project" && "Project" !== navigateTo}
          >
            Projects
            {navigateTo === "Project" && state === "loading" && (
              <CircularLoading className="ml-2 md:ml-0" size={4} />
            )}
          </Toggle>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
