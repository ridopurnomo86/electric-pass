type InputDataType = {
  id: string;
  label: string;
  name: "email" | "password";
  placeholder?: string;
  type: string;
  description?: string;
};

const INPUT_DATA: InputDataType[] = [
  {
    id: "email",
    label: "Email",
    name: "email",
    placeholder: "zed@email.com",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    name: "password",
    placeholder: "********",
    type: "password",
  },
];

export default INPUT_DATA;
