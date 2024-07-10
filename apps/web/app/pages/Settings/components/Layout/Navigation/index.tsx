import { Toggle } from "~/components/ui/Toggle";
import { Link, useLocation } from "@remix-run/react";

const DATA = [
  { id: 1, name: "Basic Info", link: "/settings" },
  { id: 2, name: "Account", link: "/settings/account" },
  { id: 3, name: "Security", link: "/settings/security" },
  { id: 4, name: "Transaction", link: "/settings/transaction" },
];

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
        <Link to="/settings/projects" className="inline min-w-fit md:block md:w-full">
          <Toggle
            className="flex w-full items-center justify-start"
            defaultPressed={location.pathname === "/settings/projects"}
          >
            Projects
          </Toggle>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
