import fs from "fs";
import { Request, Response } from "express";
import EventsUploadSchema from "../../validation/events/upload";
import convertSlug from "../../modules/slug";
import imageKit from "../../config/imagekit";

const purgeCacheImage = ({ imageUrl }: { imageUrl: string }) => imageKit.purgeCache(imageUrl);

export class EventController {
  public async uploadImage(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { event_name } = req.body;

    const { error } = EventsUploadSchema.validate({ user_id: userId, event_name });

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
            fileName: `${userId}-${convertSlug(event_name)}`,
            folder: "/events",
            overwriteFile: true,
            useUniqueFileName: false,
          },
          async (_, result) => {
            if (result) {
              fs.unlinkSync(req.file?.path as string);
              purgeCacheImage({ imageUrl: result.url });
              return res.json({
                message: "Success upload",
                type: "success",
                data: { thumbnailUrl: result.thumbnailUrl, url: result.url },
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
