type InputDataType = {
  id: string;
  label: string;
  name: "password" | "newPassword" | "repeatNewPassword";
  placeholder?: string;
  type: string;
  description?: string;
};

const INPUT_DATA: InputDataType[] = [
  {
    id: "password",
    label: "Your Password",
    name: "password",
    placeholder: "Your Password",
    type: "password",
  },
  {
    id: "newPassword",
    label: "New Password",
    name: "newPassword",
    type: "password",
    placeholder: "New Password",
    description: "You new password must be 8 - 12 characters long",
  },
  {
    id: "repeatNewPassword",
    label: "Re-enter your new Password",
    name: "repeatNewPassword",
    placeholder: "Repeat New Password",
    type: "password",
  },
];

export default INPUT_DATA;
