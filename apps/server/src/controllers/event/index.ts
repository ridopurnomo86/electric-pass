import fs from "fs";
import { Request, Response } from "express";
import ImageKit from "imagekit";
import { db } from "../../config/prisma";
import EventsUploadSchema from "../../validation/events/upload";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_RESTRICTED_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_RESTRICTED_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

const purgeCacheImage = ({ imageUrl }: { imageUrl: string }) => imageKit.purgeCache(imageUrl);

const deleteImage = ({ fileId }: { fileId: string }) => imageKit.deleteFile(fileId);

export class EventController {
  public async uploadImage(req: Request, res: Response) {
    const { user_id, event_name } = req.body;

    const { error } = EventsUploadSchema.validate({ user_id, event_name });

    const userImageProfile = await db.userImageProfile.findFirst({
      where: {
        userId: Number(user_id),
      },
    });

    if (userImageProfile) {
      purgeCacheImage({ imageUrl: userImageProfile.image_url });
      deleteImage({ fileId: userImageProfile.file_id });
    }

    if (error || !req.file?.path)
      return res.status(422).json({
        type: "error",
        message: error ? error.details : "Cannot find file path",
      });

    return fs.readFile(req.file?.path as string, (err, data) => {
      if (err) throw err;
      if (data) {
        imageKit.upload(
          {
            file: data,
            fileName: `${user_id}-${event_name}`,
            folder: "/events",
            overwriteFile: true,
            useUniqueFileName: false,
          },
          async (_, result) => {
            if (result) {
              fs.unlinkSync(req.file?.path as string);
              purgeCacheImage({ imageUrl: result.url });
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
