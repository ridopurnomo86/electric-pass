import { Icon } from "@iconify/react";
import dayjs from "dayjs";

type InfoTransactionPropsType = {
  transactionId?: string;
  paymentMethod?: string;
  transactionDate?: string;
};

const InfoTransaction = ({
  transactionId,
  paymentMethod,
  transactionDate,
}: InfoTransactionPropsType) => (
  <div>
    <div className="flex flex-col items-center justify-center text-center">
      <Icon
        icon="hugeicons:checkmark-circle-02"
        width="64"
        height="64"
        className="my-8 text-green-600"
      />
      <h3 className="text-2xl font-semibold tracking-tight">Thanks for your order!</h3>
      <p className="mt-2 text-sm text-neutral-600 md:text-base">
        The order confirmation has been sent to your Email.
      </p>
    </div>
    <div className="mt-8 border-t p-4 md:px-8 md:py-4">
      <p className="text-sm font-semibold tracking-tight md:text-lg">Transaction ID</p>
      <p className="text-sm font-medium text-neutral-500">{transactionId}</p>
    </div>
    <div className="border-t p-4 md:px-8 md:py-4">
      <p className="text-sm font-semibold tracking-tight md:text-lg">Transaction Date</p>
      <p className="text-sm font-medium text-neutral-500">
        {dayjs(transactionDate).format("dddd, MMMM D, YYYY")}
      </p>
    </div>
    <div className="border-t p-4 md:px-8 md:py-4">
      <p className="text-sm font-semibold tracking-tight md:text-lg">Payment Method</p>
      <p className="text-sm font-medium text-neutral-500">{paymentMethod}</p>
    </div>
  </div>
);

export default InfoTransaction;
