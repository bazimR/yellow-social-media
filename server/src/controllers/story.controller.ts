import { Request, Response, response } from "express";
import sharp from "sharp";
import crypto from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, bucketName } from "../database/AWSBUCKET/awsbucket";
import Story from "../database/models/story.module";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export async function newStory(req: Request, res: Response) {
  try {
    const file = req.file;
    const { userId } = req.body;
    sharp(file?.buffer)
      .resize({ height: 1080, width: 1080, fit: "contain" })
      .toBuffer()
      .then((Data) => {
        const fileName = generateFileName();
        const uploadParams = {
          Key: fileName as string,
          Body: Data as Buffer,
          Bucket: bucketName as string,
          ContentType: file?.mimetype as string,
        };
        s3.send(new PutObjectCommand(uploadParams)).then(() => {
          const story = new Story({
            image: fileName,
            userId,
            Date: Date(),
          })
            story.save()
            .then((result) => {
              res.status(201).send({ result, Message: "Task successful" });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send({ error, err: "Task failed" });
            });
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error, err: "internal server error" });
  }
}
