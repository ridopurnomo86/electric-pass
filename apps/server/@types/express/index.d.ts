// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        isValid: boolean;
        id: number;
        name: string;
        email: string;
        role: "ORGANIZER" | "USER";
      };
    }
  }
}
