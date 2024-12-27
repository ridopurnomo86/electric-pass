/* eslint-disable @typescript-eslint/no-explicit-any */

type InputDataType = {
  eventTypeData: any[];
};

const INPUT_DATA = ({ eventTypeData }: InputDataType) => [
  {
    id: "event_name",
    label: "Event Name",
    name: "event_name",
    placeholder: "Improvement Profit",
    type: "text",
  },
  {
    id: "topic_type",
    label: "Topic",
    name: "topic_type",
    placeholder: "Business",
    icon: "bxs:category",
    type: "text",
    description: "Is a classification derived from the Topic of events presented.",
  },
  {
    id: "event_type",
    label: "Event Type",
    name: "event_type",
    type: "select",
    placeholder: "Workshop",
    icon: "bxs:category",
    data: eventTypeData,
  },
];

export default INPUT_DATA;
