import fs from "fs";
import { Request, Response } from "express";
import { db } from "@monorepo/database";
import settingsAccountUploadSchema from "../../validation/upload";
import imageKit from "../../config/imagekit";

const purgeCacheImage = ({ imageUrl }: { imageUrl: string }) => imageKit.purgeCache(imageUrl);

const deleteImage = ({ fileId }: { fileId: string }) => imageKit.deleteFile(fileId);

export class SettingsAccountController {
  public async uploadImage(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { name } = req.body;

    const { error } = settingsAccountUploadSchema.validate({ user_id: userId, name });

    const userImageProfile = await db.userImageProfile.findFirst({
      where: {
        userId: Number(userId),
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
            fileName: `${userId}-${name}`,
            folder: "/users",
            overwriteFile: true,
            useUniqueFileName: false,
          },
          async (_, result) => {
            if (result) {
              fs.unlinkSync(req.file?.path as string);
              purgeCacheImage({ imageUrl: result.url });
              await db.userImageProfile.upsert({
                where: {
                  userId: Number(userId),
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
                  userId: Number(userId),
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

  public async deleteImage(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { name } = req.body;

    const { error } = settingsAccountUploadSchema.validate({ user_id: userId, name });

    if (error)
      return res.status(422).json({
        message: "Invalid request",
        type: "error",
        data: error ? error.details : "Something gone wrong",
      });

    try {
      const deleteUserImage = await db.userImageProfile.delete({
        where: {
          userId: Number(userId),
        },
      });

      const removeImage = await imageKit.deleteFile(deleteUserImage.file_id);

      if (deleteUserImage && removeImage)
        return res.status(200).json({
          message: "Success",
          type: "success",
        });

      return null;
    } catch (err) {
      if (err)
        return res.status(500).json({
          message: "Something gone wrong",
          type: "error",
        });
    }
  }
}
