import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/Button";

const DATA = [
  { id: 1, name: "Basic Info", link: "/settings" },
  { id: 2, name: "Account", link: "/settings/account" },
  { id: 3, name: "Security", link: "/settings/security" },
  { id: 4, name: "Transaction", link: "/settings/transaction" },
];

const Navigation = ({ role }: { role: "user" | "organizer" }) => (
  <nav className="flex items-start gap-2 overflow-x-scroll md:flex-col md:gap-1 md:overflow-x-hidden">
    {DATA.map((item) => (
      <Link to={item.link} key={item.id} className="inline min-w-fit md:block md:w-full">
        <Button variant="link" className="flex w-full items-center justify-start">
          {item.name}
        </Button>
      </Link>
    ))}
    {role === "organizer" && (
      <Link to="/settings/project" className="inline min-w-fit md:block md:w-full">
        <Button variant="link" className="flex w-full items-center justify-start">
          Projects
        </Button>
      </Link>
    )}
  </nav>
);

export default Navigation;
