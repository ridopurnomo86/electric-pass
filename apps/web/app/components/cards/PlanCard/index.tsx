import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { Button } from "~/components/ui/Button";

type PlanCardPropsType = {
  eventName: string;
  totalOrder: number;
  eventStartDate: string;
  country: string;
  planName: string;
  isDisabledDeleteItem: boolean;
  isShowDelete?: boolean;
  onClickDelete?: () => void;
};

const PlanCard = ({
  eventName,
  totalOrder = 0,
  eventStartDate,
  country,
  planName,
  isDisabledDeleteItem,
  isShowDelete = false,
  onClickDelete,
}: PlanCardPropsType) => (
  <article className="flex justify-between">
    <div className="flex">
      <div className="mr-3 flex max-h-[60px] w-min max-w-[60px] items-center justify-center rounded border border-dashed border-blue-600 bg-blue-50 p-4">
        <Icon icon="tabler:ticket" width="24" height="24" className="text-blue-600" />
      </div>
      <div>
        <div className="flex">
          <p className="text-sm font-medium tracking-tight text-neutral-900">{planName}&nbsp;</p>
          <p className="ml-1 text-sm font-medium text-neutral-500">{totalOrder}x</p>
        </div>
        <p className="text-sm font-medium tracking-tight text-neutral-900">{eventName}</p>
        <p className="text-sm font-medium text-neutral-500">
          {dayjs(eventStartDate).format("ddd")},&nbsp;
          {dayjs(eventStartDate).format("MMM D YYYY")}&nbsp;
          {dayjs(eventStartDate).format("HH:mm A")} - {country}
        </p>
      </div>
    </div>
    {isShowDelete && (
      <Button disabled={isDisabledDeleteItem} variant="ghost" onClick={onClickDelete}>
        <Icon
          icon="solar:trash-bin-trash-outline"
          width="24"
          height="24"
          className="text-neutral-600"
        />
      </Button>
    )}
  </article>
);

export default PlanCard;
