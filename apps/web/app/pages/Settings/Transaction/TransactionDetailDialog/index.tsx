import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import { EventPlanDataType } from "~/data/test-data/types";
import Pricing from "./Pricing";
import Customer from "./Customer";
import Description from "./Description";

type TransactionDetailDialogPropsType = {
  isOpen: boolean;
  orderDate: string;
  paymentMethod: string;
  subTotal: number;
  discount: number;
  fee: number;
  totalPrice: number;
  onOpen: () => void;
  totalItems: number;
  paymentStatus: "success" | "failed";
  orderId: number;
  customerEmail: string;
  customerFullName: string;
  customerPhoneNumber: number;
  customerPhoneCode: number;
  plans: EventPlanDataType[];
  eventCountry: string;
  eventName: string;
  eventStartDate: string;
};

const PlanCard = ({
  planName,
  planAmount,
  eventName,
  country,
  eventStartDate,
}: {
  planName: string;
  planAmount: number;
  eventName: string;
  country: string;
  eventStartDate: string;
}) => (
  <div className="flex">
    <div className="mr-3 flex max-h-[60px] w-min max-w-[60px] items-center justify-center rounded border border-dashed border-blue-600 bg-blue-50 p-4">
      <Icon icon="tabler:ticket" width="24" height="24" className="text-blue-600" />
    </div>
    <div>
      <div className="flex">
        <p className="text-sm font-medium tracking-tight text-neutral-900">{planName}&nbsp;</p>
        <p className="ml-1 text-sm font-medium text-neutral-500">{planAmount}x</p>
      </div>
      <p className="text-sm font-medium tracking-tight text-neutral-900">{eventName}</p>
      <p className="text-sm font-medium text-neutral-500">
        {dayjs(eventStartDate).format("ddd")},&nbsp;
        {dayjs(eventStartDate).format("MMM D YYYY")}&nbsp;
        {dayjs(eventStartDate).format("HH:mm A")} - {country}
      </p>
    </div>
  </div>
);

const TransactionDetailDialog = ({
  orderDate,
  orderId = 0,
  isOpen = false,
  paymentMethod,
  subTotal,
  discount,
  fee,
  totalPrice,
  onOpen,
  totalItems,
  paymentStatus,
  customerEmail,
  customerFullName,
  customerPhoneCode,
  customerPhoneNumber,
  eventCountry,
  eventName,
  eventStartDate,
  plans = [],
}: TransactionDetailDialogPropsType) => (
  <Dialog open={isOpen} onOpenChange={onOpen}>
    <DialogContent
      className="m-0 gap-0 overflow-hidden p-0"
      aria-describedby="transaction-detail-dialog-content"
    >
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="border-b bg-neutral-50 p-6">
          <p className="text-sm font-medium text-neutral-900 antialiased">#{orderId}</p>
          <p className="text-sm font-medium text-neutral-600 antialiased">Order Details</p>
        </div>
      </DialogHeader>
      <div
        className="px-6 py-4"
        aria-describedby="transaction-detail-dialog-description"
        id="transaction-detail-dialog-description"
      >
        <Description
          orderDate={orderDate}
          paymentMethod={paymentMethod}
          paymentStatus={paymentStatus}
        />
        <Customer
          email={customerEmail}
          fullName={customerFullName}
          phoneNumber={customerPhoneNumber}
          phoneCode={customerPhoneCode}
        />
        <div className="border-b py-4">
          <div className="mb-2 flex items-center">
            <p className="mr-2 text-sm font-medium text-neutral-900">Items:</p>
            <p className="rounded bg-neutral-200 px-2 text-sm font-medium text-neutral-900">
              {totalItems}
            </p>
          </div>
          <div className="py-2">
            {plans.map((item: EventPlanDataType, idx) => (
              <div key={item.id}>
                <PlanCard
                  country={eventCountry}
                  eventName={eventName}
                  eventStartDate={eventStartDate}
                  planAmount={item.amount}
                  planName={item.name}
                />
                {idx !== plans.length - 1 && <div className="my-2" />}
              </div>
            ))}
          </div>
        </div>
        <Pricing discount={discount} fee={fee} subTotal={subTotal} totalPrice={totalPrice} />
      </div>
    </DialogContent>
  </Dialog>
);

export default TransactionDetailDialog;
