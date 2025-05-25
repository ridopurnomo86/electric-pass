import { Icon } from "@iconify/react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: <Icon icon="tabler:help-circle" width="16" height="16" />,
  },
  {
    value: "todo",
    label: "Todo",
    icon: <Icon icon="tabler:circle" width="16" height="16" />,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: <Icon icon="tabler:clock" width="16" height="16" />,
  },
  {
    value: "done",
    label: "Done",
    icon: <Icon icon="tabler:circle-check" width="16" height="16" />,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: <Icon icon="tabler:circle-off" width="16" height="16" />,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: <Icon icon="solar:arrow-down-outline" width="16" height="16" />,
  },
  {
    label: "Medium",
    value: "medium",
    icon: <Icon icon="solar:arrow-right-outline" width="16" height="16" />,
  },
  {
    label: "High",
    value: "high",
    icon: <Icon icon="solar:arrow-up-outline" width="16" height="16" />,
  },
];
