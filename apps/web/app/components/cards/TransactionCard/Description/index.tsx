import dayjs from "dayjs";

type DescriptionPropsType = {
  paymentMethod: string;
  orderDate: string;
};

const Description = ({ orderDate, paymentMethod }: DescriptionPropsType) => (
  <div className="flex gap-4">
    <div>
      <p className="text-sm font-medium text-neutral-500">Order Date</p>
      <p className="text-sm font-medium text-neutral-900">
        {dayjs(orderDate).format("MMM D YYYY")}
      </p>
    </div>
    <div>
      <p className="text-sm font-medium text-neutral-500">Payment</p>
      <p className="text-sm font-medium text-neutral-900">{paymentMethod}</p>
    </div>
  </div>
);

export default Description;
