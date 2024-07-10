import { TypedResponse } from "@remix-run/node";

type SuccessResponseType = {
  type: "success" | "error";
  status: "Success" | "Error";
  message: string;
};

export type CreateAccountResponseType = TypedResponse<SuccessResponseType>;
