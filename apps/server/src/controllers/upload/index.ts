import fs from "fs";
import { Request, Response } from "express";
import ImageKit from "imagekit";
import settingsAccountUploadSchema from "../../validation/upload";
import { db } from "../../config/prisma";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_RESTRICTED_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_RESTRICTED_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export class SettingsAccountController {
  public async uploadImage(req: Request, res: Response) {
    const { user_id, name } = req.body;

    const { error } = settingsAccountUploadSchema.validate({ user_id, name });

    if (error || !req.file?.path)
      return res.status(422).json({
        message: "Invalid request",
        type: "error",
        data: error ? error.details : "Cannot find file path",
      });

    return fs.readFile(req.file?.path as string, (err, data) => {
      if (err) throw err;
      if (data) {
        imageKit.upload(
          {
            file: data,
            fileName: `${user_id}-${name}`,
            folder: "/users",
            overwriteFile: true,
            useUniqueFileName: false,
          },
          async (_, result) => {
            if (result) {
              fs.unlinkSync(req.file?.path as string);
              await db.userImageProfile.upsert({
                where: {
                  userId: Number(user_id),
                },
                update: {
                  image_url: result.url,
                  file_id: result.fileId,
                  version: {
                    increment: 1,
                  },
                },
                create: {
                  image_url: result.url,
                  file_id: result.fileId,
                  version: 0,
                  userId: Number(user_id),
                },
              });
              return res.json({
                message: "Success upload",
                type: "success",
                data: { thumnailUrl: result.thumbnailUrl, url: result.url },
              });
            }
            return res.json(
              res.json({
                message: "Error upload",
                type: "error",
              })
            );
          }
        );
      }
    });
  }
}
