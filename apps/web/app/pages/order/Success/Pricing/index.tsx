import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/Button";
import formatPrice from "~/modules/formatPrice";

type PricingPropsType = {
  subTotal: number;
  fees: number;
  totalPrice: number;
  totalItems: number;
};

const Pricing = ({ subTotal, fees, totalPrice, totalItems }: PricingPropsType) => (
  <div>
    <div className="border-y px-6 py-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium tracking-tight text-neutral-600 md:text-base">Subtotal</p>
        <p className="text-sm font-medium tracking-tight text-neutral-600 md:text-base">
          {formatPrice(subTotal)}
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
          {formatPrice(Number(fees))}
        </p>
      </div>
    </div>
    <div className="flex items-center justify-between px-6 py-2">
      <p className="text-sm font-medium tracking-tight text-neutral-900 md:text-base">
        Grand Total ({totalItems} items)
      </p>
      <p className="text-sm font-medium tracking-tight text-neutral-900 md:text-lg">
        {formatPrice(Number(totalPrice))}
      </p>
    </div>
    <div className="p-4">
      <Link to="/events">
        <Button className="w-full">Continue Shopping</Button>
      </Link>
    </div>
  </div>
);

export default Pricing;
