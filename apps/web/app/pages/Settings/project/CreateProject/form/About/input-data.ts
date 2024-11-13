/* eslint-disable @typescript-eslint/no-explicit-any */

type InputDataType = {
  categoryData: any[];
};

const INPUT_DATA = ({ categoryData }: InputDataType) => [
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
    id: "category_type",
    label: "Category",
    name: "category_type",
    type: "select",
    placeholder: "Workshop",
    icon: "bxs:category",
    data: categoryData,
  },
];

export default INPUT_DATA;
