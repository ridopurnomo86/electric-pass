import { Toggle } from "~/components/ui/Toggle";
import { Link, useLocation } from "@remix-run/react";

const DATA = [
  { id: 1, name: "Profile", link: "/profile" },
  { id: 2, name: "Account", link: "/profile/account" },
  { id: 3, name: "Security", link: "/profile/security" },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col items-start">
      {DATA.map((item) => (
        <Link to={item.link} key={item.id} className="block w-full">
          <Toggle
            className="flex w-full items-center justify-start"
            defaultPressed={location.pathname === item.link}
          >
            {item.name}
          </Toggle>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
