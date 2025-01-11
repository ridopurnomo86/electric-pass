import { Icon } from "@iconify/react";
import formatPrice from "~/modules/formatPrice";

type PricesPropsType = {
  subTotalPrice: number;
  totalFees: number;
  totalPrice: number;
  totalOrder: number;
};

const Prices = ({ subTotalPrice, totalFees, totalPrice, totalOrder }: PricesPropsType) => (
  <>
    <div className="border-y px-6 py-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium tracking-tight text-neutral-600">Subtotal</p>
        <p className="text-sm font-medium tracking-tight text-neutral-600">
          {formatPrice(subTotalPrice)}
        </p>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center">
          <p className="mr-1 text-sm font-medium tracking-tight text-neutral-600">Fees</p>
          <Icon icon="tabler:info-circle" width="18" height="18" className="text-neutral-600" />
        </div>
        <p className="text-sm font-medium tracking-tight text-neutral-600">
          {formatPrice(totalFees)}
        </p>
      </div>
    </div>
    <div className="flex items-center justify-between px-6 py-2">
      <p className="text-sm font-medium tracking-tight text-neutral-900">
        Total ({totalOrder} items)
      </p>
      <p className="text-sm font-medium tracking-tight text-neutral-900">
        {formatPrice(totalPrice)}
      </p>
    </div>
  </>
);

export default Prices;
