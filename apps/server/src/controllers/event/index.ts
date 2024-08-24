import fs from "fs";
import { Request, Response } from "express";
import ImageKit from "imagekit";
import { db } from "../../config/prisma";
import CreateEventSchema from "../../validation/events";
import generateSlug from "../../modules/slug";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_RESTRICTED_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_RESTRICTED_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

const purgeCacheImage = ({ imageUrl }: { imageUrl: string }) => imageKit.purgeCache(imageUrl);

const checkingUser = async ({ userId }: { userId: number }) => {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
};

export class EventController {
  public async createEvent(req: Request, res: Response) {
    const body = req.body;
    const image = req.file;

    const { error } = CreateEventSchema.validate(body);

    if (error || !image?.path)
      return res.status(422).json({
        type: "error",
        message: error ? error.details : "Cannot find file path",
      });

    const user = await checkingUser({ userId: Number(body.user_id) });

    if (!user || user.role === "USER")
      return res.status(401).json({ message: "Unauthorized", type: "Error" });

    return fs.readFile(req.file?.path as string, (err, data) => {
      if (err) throw err;
      if (data) {
        imageKit.upload(
          {
            file: data,
            fileName: `${user.id}-${generateSlug(body.event_name)}`,
            folder: "/events",
            overwriteFile: true,
            useUniqueFileName: false,
          },
          async (_, result) => {
            if (result) {
              fs.unlinkSync(req.file?.path as string);
              purgeCacheImage({ imageUrl: result.url });
              await db.event.create({
                data: {
                  slug: generateSlug(body.event_name),
                  city: body.city,
                  country: body.country,
                  description: body.description,
                  name: body.event_name,
                  price: body.price,
                  start_date: body.start_date,
                  ended_date: body.ended_date,
                  category_id: Number(body.category_type),
                  type_id: Number(body.topic_type),
                  user_id: user.id,
                  updated_at: new Date().toISOString(),
                  image_url: result.url,
                },
              });

              return res.json({
                message: "Success create event",
                type: "success",
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
