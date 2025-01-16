import dayjs from "dayjs";

type OverviewPropsType = {
  title: string;
  location: string;
  datetime: string;
};

const Overview = ({ title, location, datetime }: OverviewPropsType) => (
  <div className="border-b p-4 md:px-10">
    <div>
      <p className="text-lg font-semibold tracking-tight text-neutral-900">{title}</p>
      <p className="text-sm font-medium text-neutral-500">
        {dayjs(datetime).format("ddd")},&nbsp;{dayjs(datetime).format("MMM D, YYYY")}&nbsp;
        {dayjs(datetime).format("HH:mmA")} - {location}
      </p>
    </div>
  </div>
);

export default Overview;
