const INPUT_DATA = [
  {
    id: "event_name",
    label: "Event Name",
    name: "event_name",
    placeholder: "Improvement Profit",
    type: "text",
  },
  {
    id: "event_type",
    label: "Type",
    name: "event_type",
    placeholder: "Business",
    icon: "bxs:category",
    type: "text",
    description:
      "Is a classification derived from the type of events presented.",
  },
  {
    id: "price",
    label: "Price",
    name: "price",
    placeholder: "100",
    icon: "f7:money-dollar-circle",
    type: "text",
    description:
      "Order amount to access this event, we use dollar as a international currency.",
  },
  {
    id: "datetime",
    label: "Date",
    name: "datetime",
    type: "date",
  },
  {
    id: "description",
    label: "Description",
    name: "description",
    placeholder: "Add Description",
    type: "textarea",
  },
];

export default INPUT_DATA;
