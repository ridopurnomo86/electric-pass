import { Icon } from "@iconify/react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "~/components/ui/Menubar";
import Badge from "./Badge";
import PlanList from "./PlanList";
import Description from "./Description";

type TransactionCardPropsType = {
  eventStartDate: string;
  orderId: string;
  eventName: string;
  country: string;
  paymentMethod: string;
  paymentStatus: "success" | "failed";
  plans: Array<{ amount: number; name: string; id: number }>;
  orderDate: string;
  onMoreDetail: () => void;
  onShowTicket: () => void;
};

const TransactionCard = ({
  eventStartDate,
  orderId,
  eventName,
  country,
  paymentMethod,
  paymentStatus,
  plans = [],
  orderDate,
  onMoreDetail,
  onShowTicket,
}: TransactionCardPropsType) => (
  <article className="size-full overflow-hidden rounded-md border px-6 py-4">
    <div className="flex items-center justify-between border-b border-dotted pb-3">
      <div className="flex items-center">
        <p className="text-sm font-medium text-neutral-600">Order:</p>
        <p className="ml-1 w-[100px] truncate text-sm font-medium text-indigo-600">{orderId}</p>
      </div>
      <div className="flex items-center">
        <Badge paymentStatus={paymentStatus} />
        <Menubar className="ml-2 cursor-pointer border-none shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer border-0 p-0">
              <Icon icon="solar:menu-dots-bold" width="20" height="20" className="rotate-90" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="gap-2 py-2" onClick={onMoreDetail}>
                <Icon icon="ic:round-remove-red-eye" width="20" height="20" />
                More Detail
              </MenubarItem>
              <MenubarItem className="gap-2 py-2" onClick={onShowTicket}>
                <Icon icon="mdi:ticket-confirmation-outline" width="20" height="20" />
                Show Ticket
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
    <div className="py-4">
      <PlanList
        country={country}
        eventName={eventName}
        eventStartDate={eventStartDate}
        plans={plans}
      />
    </div>
    <Description orderDate={orderDate} paymentMethod={paymentMethod} />
  </article>
);

export default TransactionCard;
