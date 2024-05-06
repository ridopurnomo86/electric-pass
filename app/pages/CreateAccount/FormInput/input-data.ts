import { Forms } from "~/components/core/Form/types";

const INPUT_DATA: Forms[] = [
  {
    id: "email",
    label: "Name / Company Name",
    name: "email",
    placeholder: "zed@email.com",
    type: "email",
  },
  {
    id: "name",
    label: "Full Name / Company Name",
    name: "name",
    placeholder: "zed",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    name: "password",
    placeholder: "********",
    type: "password",
  },
  {
    id: "account_type",
    label: "Select type of your account.",
    name: "account_type",
    type: "radio",
    items: [
      {
        id: "visitor",
        value: "visitor",
        label: "Visitor",
      },
      {
        id: "event_organizer",
        value: "event_organizer",
        label: "Event Organizer",
      },
    ],
  },
];

export default INPUT_DATA;
