export type GetUserType = {
  id: number;
  response?: {
    [key: string]: string | number | boolean;
  };
  select?: {
    [key: string]: boolean;
  };
};

export type UpdateUserType = {
  id: number;
  data?: {
    [key: string]: string | number | boolean;
  };
};

export type AuthorizeUserType = {
  email?: string;
  id?: number;
  password?: string;
};

export type AuthorizeUserResponseType = Promise<{
  id: number;
  name: string;
  role: string | undefined;
  email: string;
}>;

export type RegisterUserType = {
  data: {
    [key: string]: string;
  };
  encryptPassword: string;
  salt: string;
};
