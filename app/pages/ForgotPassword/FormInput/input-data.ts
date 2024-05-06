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
    label: "Your Email",
    name: "email",
    placeholder: "zed@email.com",
    type: "email",
  },
];

export default INPUT_DATA;
