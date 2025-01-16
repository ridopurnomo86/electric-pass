import { Forms } from "~/components/core/Form/types";

const INPUT_DATA: Forms[] = [
  {
    id: "first_name",
    label: "First Name",
    name: "first_name",
    placeholder: "",
    type: "text",
  },
  {
    id: "last_name",
    label: "Last Name",
    name: "last_name",
    placeholder: "",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    name: "email",
    placeholder: "zed@email.com",
    type: "email",
  },
  {
    id: "id_number",
    label: "ID Number (Driver License/Identity Card/Passport,etc)",
    name: "id_number",
    placeholder: "",
    type: "text",
  },
];

export default INPUT_DATA;
