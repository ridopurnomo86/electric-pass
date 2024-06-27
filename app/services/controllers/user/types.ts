export type GetUserType = {
  id: number;
  response?: {
    [key: string]: string | number | boolean;
  };
  select?: {
    [key: string]: boolean;
  };
};

export type AuthorizeUserType = {
  email: string;
  password: string;
};

export type AuthorizeUserResponseType = Promise<{
  id: number;
  name: string;
  role: string | undefined;
}>;

export type RegisterUserType = {
  data: {
    [key: string]: string;
  };
  encryptPassword: string;
  salt: string;
};
