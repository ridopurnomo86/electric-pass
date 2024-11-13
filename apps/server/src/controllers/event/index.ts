import fs from "fs";
import { Request, Response } from "express";
import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_RESTRICTED_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_RESTRICTED_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

const purgeCacheImage = ({ imageUrl }: { imageUrl: string }) => imageKit.purgeCache(imageUrl);

export class EventController {
  public async uploadImage(req: Request, res: Response) {
    const { user_id, event_name } = req.body;

    if (!req.file?.path)
      return res.status(422).json({
        type: "error",
        message: "Cannot find file path",
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
