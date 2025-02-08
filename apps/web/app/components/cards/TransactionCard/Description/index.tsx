import dayjs from "dayjs";

type DescriptionPropsType = {
  customerName: string;
  paymentMethod: string;
  orderDate: string;
};

const Description = ({ orderDate, customerName, paymentMethod }: DescriptionPropsType) => (
  <div className="flex justify-between">
    <div>
      <p className="text-sm font-medium text-neutral-500">Order Date</p>
      <p className="text-sm font-medium text-neutral-900">
        {dayjs(orderDate).format("MMM D YYYY")}
      </p>
    </div>
    <div>
      <p className="text-sm font-medium text-neutral-500">Customer</p>
      <p className="text-sm font-medium text-neutral-900">{customerName}</p>
    </div>
    <div>
      <p className="text-sm font-medium text-neutral-500">Payment</p>
      <p className="text-sm font-medium text-neutral-900">{paymentMethod}</p>
    </div>
  </div>
);

export default Description;
