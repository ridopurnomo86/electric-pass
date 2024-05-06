type InputDataType = {
  id: string;
  label: string;
  name: "name" | "email" | "bio";
  placeholder?: string;
  type: string;
  description?: string;
};

const INPUT_DATA: InputDataType[] = [
  {
    id: "name",
    label: "Name / Company Name",
    name: "name",
    placeholder: "shadcn",
    type: "text",
    description: "This is your public display name. It can be your real name or a pseudonym.",
  },
  {
    id: "email",
    label: "Email",
    name: "email",
    placeholder: "zed@email.com",
    type: "email",
    description: "You can manage verified email addresses in your email settings.",
  },
  {
    id: "bio",
    label: "Bio",
    name: "bio",
    placeholder: "Tell us a little bit about yourself",
    type: "textarea",
    description: "You can @mention other users and organizations.",
  },
];

export default INPUT_DATA;
