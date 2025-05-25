import { Icon } from "@iconify/react";
import { Card as CoreCard, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";

const Card = ({
  title,
  description,
  subtitle,
  icon,
}: {
  title: string;
  description: string;
  subtitle: string;
  icon: string;
}) => (
  <CoreCard className="shadow-none">
    <CardHeader className="relative p-4">
      <CardDescription className="text-sm font-medium tracking-tight text-neutral-900">
        {description}
      </CardDescription>
      <CardTitle className="text-2xl font-bold text-neutral-900">{title}</CardTitle>
      <div className="absolute right-4 top-4">
        <Icon icon={icon} width="16" height="16" className="text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-xs">{subtitle}</p>
    </CardHeader>
  </CoreCard>
);

const SectionCard = ({
  totalRevenue,
  totalSales,
}: {
  totalRevenue: number;
  totalSales: number;
}) => (
  <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4">
    <Card
      title={`$${totalRevenue}`}
      description="Total Revenue"
      subtitle="+20.1% from last month"
      icon="ri:money-dollar-circle-line"
    />
    <Card
      title={`+${totalSales}`}
      description="Total Sales"
      icon="tabler:credit-card"
      subtitle="+120.1% from last month"
    />
  </div>
);

export default SectionCard;
