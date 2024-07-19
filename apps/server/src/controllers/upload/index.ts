import { Request, Response } from "express";
import ImageKit from "imagekit";
import fs from "fs";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_RESTRICTED_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_RESTRICTED_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export class UploadController {
  public async uploadImage(req: Request, res: Response) {
    return fs.readFile(req.file?.path as string, (err, data) => {
      if (err) throw err;
      if (data) {
        imageKit.upload(
          {
            file: data,
            fileName: "my_file_name.jpg",
            folder: "/users",
            overwriteFile: true,
            useUniqueFileName: false,
          },
          function (_, result) {
            if (result) {
              fs.unlinkSync(req.file?.path as string);
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
