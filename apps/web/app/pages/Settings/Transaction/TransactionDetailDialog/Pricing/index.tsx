import formatPrice from "~/modules/formatPrice";

type PricingPropsType = {
  subTotal: number;
  discount: number;
  fee: number;
  totalPrice: number;
};

const Pricing = ({ subTotal, discount, fee, totalPrice }: PricingPropsType) => (
  <div className="py-4">
    <p className="mb-2 text-sm font-medium text-neutral-900">Payment</p>
    <div className="mb-1 flex justify-between">
      <p className="text-sm font-medium text-neutral-500">Subtotal:</p>
      <p className="text-sm font-medium text-neutral-500">{formatPrice(subTotal)}</p>
    </div>
    <div className="mb-1 flex justify-between">
      <p className="text-sm font-medium text-neutral-500">Discount:</p>
      <p className="text-sm font-medium text-neutral-500">{formatPrice(discount)}</p>
    </div>
    <div className="flex justify-between">
      <p className="text-sm font-medium text-neutral-500">Fee:</p>
      <p className="text-sm font-medium text-neutral-500">{formatPrice(fee)}</p>
    </div>
    <div className="mt-2 flex justify-between border-t py-2">
      <p className="text-sm font-semibold text-neutral-900">Total:</p>
      <p className="text-sm font-semibold text-neutral-900">{formatPrice(totalPrice)}</p>
    </div>
  </div>
);

export default Pricing;
