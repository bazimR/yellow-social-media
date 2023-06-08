import { Request, Response, response } from "express";
import sharp from "sharp";
import crypto from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, bucketName } from "../database/AWSBUCKET/awsbucket";
import Post from "../database/models/post.module";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export async function newPost(req: Request, res: Response) {
  try {
    const file = req.file;
    const { caption, userId } = req.body;
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
          const post = new Post({
            image: fileName,
            caption: caption,
            userId,
            Date:Date()
          });
          post
            .save()
            .then((result) => {
              res.status(201).send({ result, Message: "Post successful" });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send({ error, err: "Post failed" });
            });
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send({ error, err: "server error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error, err: "internal server error" });
  }
}


export async function homePosts(req:Request,res:Response) {
  try {
    
  } catch (error) {
    console.error(error);
    res.status(500).send({error,err:'internal server error'})
  }
}