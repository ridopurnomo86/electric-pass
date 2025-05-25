import { useOutletContext } from "@remix-run/react";
import OrganizerDashboard from "./OrganizerDashboard";
import UserTransaction from "./User";

type ContextPropsType = {
  user: { name: string; role: "organizer" | "user"; email: string };
};

const Transaction = () => {
  const { user } = useOutletContext<ContextPropsType>();

  if (user.role === "organizer") return <OrganizerDashboard />;

  return <UserTransaction />;
};

export default Transaction;
