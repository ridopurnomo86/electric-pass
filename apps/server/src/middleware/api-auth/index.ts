/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from "express";
import TheAuthAPI from "theauthapi";

const theAuthAPI = new TheAuthAPI(process.env.AUTH_API_ACCESS_API_KEY as string, {
  retryCount: 2,
});

const apiAuthHandler = (req: any, res: Response, next: NextFunction) => {
  if (req.headers["x-api-key"]) {
    theAuthAPI.apiKeys
      .authenticateKey(req.headers["x-api-key"] as string)
      .then((key) => {
        if (!key) {
          res.status(401).send({ message: "Invalid API key" });
        }
        req.key = key;
        next();
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(401).send({
      message: "No API key, be sure to set it as the 'x-api-key' header",
    });
  }
};

export default apiAuthHandler;
