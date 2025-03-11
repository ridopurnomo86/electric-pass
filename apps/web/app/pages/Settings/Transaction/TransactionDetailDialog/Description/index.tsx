import dayjs from "dayjs";
import Badge from "~/components/cards/TransactionCard/Badge";

type DescriptionPropsType = {
  orderDate: string;
  paymentMethod: string;
  paymentStatus: "success" | "failed";
};

const Description = ({ orderDate, paymentMethod, paymentStatus }: DescriptionPropsType) => (
  <div className="flex justify-between border-b pb-4">
    <div>
      <p className="mb-1 text-sm font-medium text-neutral-500">Order Date</p>
      <p className="text-sm font-medium text-neutral-900">
        {dayjs(orderDate).format("MMM D YYYY")}
      </p>
    </div>
    <div>
      <p className="mb-1 text-sm font-medium text-neutral-500">Payment</p>
      <Badge paymentStatus={paymentStatus} />
    </div>
    <div>
      <p className="mb-1 text-sm font-medium text-neutral-500">Method</p>
      <p className="text-sm font-medium text-neutral-900">{paymentMethod}</p>
    </div>
  </div>
);

export default Description;
