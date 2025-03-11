import { Badge as CoreBadge } from "~/components/ui/Badge";

type BadgePropsType = {
  paymentStatus: "success" | "failed";
};

const Badge = ({ paymentStatus }: BadgePropsType) => {
  if (paymentStatus === "success")
    return (
      <CoreBadge variant="secondary" className="bg-indigo-100 text-indigo-600">
        Success
      </CoreBadge>
    );

  return (
    <CoreBadge variant="secondary" className="text-neutral-600">
      Canceled
    </CoreBadge>
  );
};

export default Badge;
