import UserImageProfileData from "../user-image-profile";

type UserOrganizerDataType = {
  id: number;
  name: string;
  email: string;
  username: string;
  address: string;
  country: string;
  bio: string;
  birth_date: string;
  phone_number: number;
  dialing_code: string;
  city: string;
  UserImageProfile: UserImageProfileData;
};

export default UserOrganizerDataType;
