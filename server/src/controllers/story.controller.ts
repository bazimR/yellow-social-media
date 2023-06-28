import { Request, Response } from "express";
import sharp from "sharp";
import crypto from "crypto";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../database/AWSBUCKET/awsbucket";
import Story from "../database/models/story.module";
import User from "../database/models/user.model";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

const bucketName = process.env.BUCKET as string;
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export async function newStory(req: Request, res: Response) {
  try {
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const file = req.file;
    const { userId } = req.body;
    const hasStory = await Story.find({ userId });

    if (hasStory.length > 0) {
      await Story.updateMany(
        { userId, date: { $gte: cutoffTime } },
        { expired: true }
      );
    }
    sharp(file?.buffer)
      .resize({ height: 1000, width: 700, fit: "cover" })
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
          const story = new Story({
            image: fileName,
            userId,
            Date: Date(),
          });
          story
            .save()
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

export async function homeStory(req: Request, res: Response) {
  const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
  try {
    const userId = req.params.userId;
    const friendList = await User.findOne({ _id: userId }).select("following");
    friendList?.following.push(userId);
    const data = await Story.find({
      userId: { $in: friendList?.following },
      Date: { $gte: cutoffTime },
      expired: false,
    }).sort({ date: -1 });
    if (!data) {
      res.status(404).send({ error: "no story", data });
    } else {
      const signingPromises = data.map(async (doc) => {
        const imageUrl = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Key: doc.image,
            Bucket: bucketName,
          }),
          { expiresIn: 60 * 30 }
        );
        // here
        doc.set("imageUrl", imageUrl, { strict: false });
        const user = await User.findById(doc?.userId);
        if (user?.profile) {
          const profileImg = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Key: user.profile,
              Bucket: bucketName,
            }),
            { expiresIn: 60 * 30 }
          );
          doc.set("profileUrl", profileImg, { strict: false });
        }
        if (user?.profileUrl) {
          doc.set("profileUrl", user.profileUrl, { strict: false });
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
