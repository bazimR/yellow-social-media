import { Request, Response, response } from "express";
import sharp from "sharp";
import crypto from "crypto";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, bucketName } from "../database/AWSBUCKET/awsbucket";
import Post from "../database/models/post.module";
import User from "../database/models/user.model";

const generateFileName = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};

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
            Date: Date(),
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

export async function homePosts(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const friendList = await User.findOne({ _id: userId }).select("friends");
    friendList?.friends.push(userId);
    const data = await Post.find({ $all: friendList?.friends });
    if (!data) {
      res.status(404).send({ error: "cannot get posts" });
    } else {
      const signingPromises = data.map(async (doc) => {
        const imageUrl = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Key: doc.image,
            Bucket: bucketName,
          }),
          { expiresIn: 60 * 10 }
        );
        doc.imageUrl=imageUrl
        return doc;
      });
      const signedData = await Promise.all(signingPromises);
      console.log(signedData);
      res.status(201).send(signedData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error, err: "internal server error" });
  }
}

export async function likePost(req: Request, res: Response) {
  try {
    const { userId, postId } = req.body;
    const isLiked = Post.findOne({_id:postId})
  } catch (error) {
    console.error(error);
    res.status(500).send({ error, err: "internal server error" });
  }
}
