type InputDataType = {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  description?: string;
  name: "country" | "address";
};

const INPUT_DATA: InputDataType[] = [
  {
    id: "address",
    label: "Addresses",
    name: "address",
    type: "text",
    placeholder: "Your Address",
  },
];

export default INPUT_DATA;
