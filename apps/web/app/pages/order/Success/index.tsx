import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import dayjs from "dayjs";
import Mainlayout from "~/components/layout/MainLayout";
import { Button } from "~/components/ui/Button";
import formatPrice from "~/modules/formatPrice";

type OrderSuccessPropsType = {
  transactionId?: string;
  paymentMethod?: string;
  transactionDate?: string;
  subtotal?: number;
  fees?: number;
  totalItems?: number;
  totalPrice?: number;
};

const OrderSuccess = ({
  transactionId,
  paymentMethod,
  transactionDate,
  subtotal = 0,
  fees = 0,
  totalItems = 0,
  totalPrice = 0,
}: OrderSuccessPropsType) => (
  <Mainlayout hasHideNavigation>
    <main className="container mx-auto flex items-center justify-center py-8">
      <section className="max-w-[600px] rounded-md border">
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
        <div className="border-t p-4 md:px-8 md:py-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex">
                <div className="mr-3 flex max-h-[60px] w-min max-w-[60px] items-center justify-center rounded border border-dashed border-blue-600 bg-blue-50 p-4">
                  <Icon icon="tabler:ticket" width="24" height="24" className="text-blue-600" />
                </div>
                <div>
                  <div className="flex">
                    <p className="text-sm font-medium tracking-tight text-neutral-900">VIP&nbsp;</p>
                    <p className="ml-1 text-sm font-medium text-neutral-500">1x</p>
                  </div>
                  <p className="text-sm font-medium tracking-tight text-neutral-900">
                    Asking Alexandria Medan Fest
                  </p>
                  <p className="text-xs font-medium text-neutral-500 md:text-sm">
                    {dayjs().format("ddd")},&nbsp;
                    {dayjs().format("MMM D YYYY")}&nbsp;
                    {dayjs().format("HH:mm A")} - Medan, Indonesia
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium tracking-tight text-neutral-600 md:text-base">
                  {formatPrice(100)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-y px-6 py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium tracking-tight text-neutral-600 md:text-base">
              Subtotal
            </p>
            <p className="text-sm font-medium tracking-tight text-neutral-600 md:text-base">
              {formatPrice(subtotal)}
            </p>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center">
              <p className="mr-1 text-sm font-medium tracking-tight text-neutral-600 md:text-base">
                Fees
              </p>
              <Icon icon="tabler:info-circle" width="18" height="18" className="text-neutral-600" />
            </div>
            <p className="text-sm font-medium tracking-tight text-neutral-600 md:text-base">
              {formatPrice(fees)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-2">
          <p className="text-sm font-medium tracking-tight text-neutral-900 md:text-base">
            Grand Total ({totalItems} items)
          </p>
          <p className="text-sm font-medium tracking-tight text-neutral-900 md:text-lg">
            {formatPrice(totalPrice)}
          </p>
        </div>
        <div className="p-4">
          <Link to="/events">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </section>
    </main>
  </Mainlayout>
);

export default OrderSuccess;
