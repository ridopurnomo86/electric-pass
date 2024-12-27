import TicketCardList from "~/components/data-display/TicketCardList";
import { EventPlanDataType } from "~/data/test-data/types";

type OverviewPropsType = {
  plans: EventPlanDataType[];
};

const Overview = ({ plans }: OverviewPropsType) => (
  <div>
    <div className="border-b px-10 py-4">
      <p className="text-lg font-semibold tracking-tight text-neutral-900">
        The Phantom of the Opera
      </p>
      <p className="text-sm font-medium text-neutral-500">Fri, Jan 20 7:00pm - Majestic Theatre</p>
    </div>
    <div className="size-full px-10 py-4">
      <p className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">Select a tickets</p>
      <TicketCardList data={plans} onClick={() => {}} />
    </div>
  </div>
);

export default Overview;
