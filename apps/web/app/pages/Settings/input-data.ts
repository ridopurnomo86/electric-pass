type InputDataType = {
  id: string;
  label: string;
  name: "name" | "email" | "bio";
  placeholder?: string;
  type: string;
  description?: string;
  isDisabled?: boolean;
};

const INPUT_DATA: InputDataType[] = [
  {
    id: "name",
    label: "Name / Company Name",
    name: "name",
    placeholder: "shadcn",
    type: "text",
    description:
      "This is your public display name. It can be your real name or a pseudonym.",
  },
  {
    id: "email",
    label: "Email",
    name: "email",
    placeholder: "zed@email.com",
    type: "email",
    isDisabled: true,
<<<<<<< HEAD:app/pages/Settings/input-data.ts
    description: "You can manage verified email addresses in your email settings.",
=======
    description:
      "You can manage verified email addresses in your email settings.",
>>>>>>> 4119967f4fd90070dabbb09e6375abaca5c4daeb:apps/web/app/pages/Settings/input-data.ts
  },
  {
    id: "bio",
    label: "Bio",
    name: "bio",
<<<<<<< HEAD:app/pages/Settings/input-data.ts
    placeholder: "Tell us a little bit about yourself or about your organizations",
=======
    placeholder:
      "Tell us a little bit about yourself or about your organizations",
>>>>>>> 4119967f4fd90070dabbb09e6375abaca5c4daeb:apps/web/app/pages/Settings/input-data.ts
    type: "textarea",
    description: "You can @mention other users and organizations.",
  },
];

export default INPUT_DATA;
