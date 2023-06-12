import { Request, Response, response } from "express";
import sharp from "sharp";
import crypto from "crypto";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../database/AWSBUCKET/awsbucket";
import Post from "../database/models/post.module";
import User from "../database/models/user.model";
import dotenv from "dotenv";
dotenv.config();

const bucketName = process.env.BUCKET as string;
const generateFileName = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};

export async function newPost(req: Request, res: Response) {
  try {
    const file = req.file;
    const { caption, userId, username } = req.body;
    sharp(file?.buffer)
      .resize({ height: 1000, width: 1000, fit: "cover" }) // Resize to desired dimensions
      .extend({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: { r: 255, g: 255, b: 255, alpha: 0.5 }, // Set the background color to white
      })
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
            username,
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
    const userId = req.params.userId;
    const page = req.query.page?parseInt(req.query.page.toString()):1
    console.log(page);
    const friendList = await User.findOne({ _id: userId }).select("friends");
    friendList?.friends.push(userId);
    const data = await Post.find({ userId: { $in: friendList?.friends } }).sort(
      { Date: -1 }
    ).skip(page-1);
    console.log(data);
    if (!data) {
      res.status(404).send({ error: "no pages" ,data});
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
        // here
        doc.imageUrl = imageUrl;
        const user = await User.findById(doc?.userId);
        if (user?.profile) {
          const profileImg = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Key: user.profile,
              Bucket: bucketName,
            }),
            { expiresIn: 60 * 10 }
          );
          doc.set("profileUrl", profileImg, { strict: false });
        }
        return doc;
      });
      const signedData = await Promise.all(signingPromises);
      res.status(201).send(signedData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error, err: "internal server error" });
  }
}

export async function likePost(req: Request, res: Response) {
  try {
    const postId = req.params.postId;
    const { userId } = req.body;
    await Post.findOne({ _id: postId }).then(async (post) => {
      console.log(userId);
      console.log(post?.likes.includes(userId));
      if (post?.likes.includes(userId)) {
        await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
        console.log("removed");
        res.status(201).send({ Message: "like removed" });
      } else {
        await Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { likes: userId } }
        );
        console.log("added");
        res.status(201).send({ Message: "like added" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error, err: "internal server error" });
  }
}
