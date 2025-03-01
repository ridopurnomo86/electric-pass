import dayjs from "dayjs";
import PlanList from "~/components/cards/TransactionCard/PlanList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
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
  totalItems: 1;
};

const TransactionDetailDialog = ({
  orderDate,
  isOpen = false,
  paymentMethod,
  subTotal,
  discount,
  fee,
  totalPrice,
  onOpen,
  totalItems,
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
          <p className="text-sm font-medium text-neutral-900 antialiased">#4772927</p>
          <p className="text-sm font-medium text-neutral-600 antialiased">Order Details</p>
        </div>
      </DialogHeader>
      <div
        className="px-6 py-4"
        aria-describedby="transaction-detail-dialog-description"
        id="transaction-detail-dialog-description"
      >
        <Description orderDate={orderDate} paymentMethod={paymentMethod} paymentStatus="success" />
        <Customer
          email="johnsmith@gmail.com"
          fullName="John Smith"
          phoneNumber={5559898}
          phoneCode={1}
        />
        <div className="border-b py-4">
          <div className="mb-2 flex items-center">
            <p className="mr-2 text-sm font-medium text-neutral-900">Items:</p>
            <p className="rounded bg-neutral-200 px-2 text-sm font-medium text-neutral-900">
              {totalItems}
            </p>
          </div>
          <PlanList
            country={"indonesia"}
            eventName={"Asking Alexandria"}
            eventStartDate={dayjs().format()}
            plans={[
              {
                amount: 1,
                id: 1,
                name: "Regular",
              },
            ]}
          />
        </div>
        <Pricing discount={discount} fee={fee} subTotal={subTotal} totalPrice={totalPrice} />
      </div>
    </DialogContent>
  </Dialog>
);

export default TransactionDetailDialog;
