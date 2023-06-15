import { Request, Response } from "express";
import Comment from "../database/models/comment.module";
import User from "../database/models/user.model";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../database/AWSBUCKET/awsbucket";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
const bucketName = process.env.BUCKET as string;

export async function addComment(req: Request, res: Response) {
  try {
    const { userId, postId, body, username } = req.body;
    console.log(req.body);
    const comment = new Comment({
      userId,
      username,
      postId,
      body,
      Date: Date(),
    });
    comment
      .save()
      .then((result) => {
        res.status(201).send({ result, Message: "comment successful" });
      })
      .catch((error) => {
        console.error(error);
        console.log({ userId, postId, body, username });
        res.status(500).send({ error, err: "comment failed" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error");
  }
}

export async function getComments(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    Comment.find({ postId, isBlocked: false })
      .sort({ Date: -1 })
      .then(async (result) => {
        const commentPromise = result.map(async (doc) => {
          const user = await User.findById(doc.userId);
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
          return doc;
        });
        const data = await Promise.all(commentPromise);
        res.status(201).send(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(404).send({ error, err: "Comments not found" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

export async function deteleComments(req: Request, res: Response) {
  try {
    const { commentId } = req.body;

    Comment.findByIdAndUpdate(
      { _id: commentId },
      {
        $set: { isBlocked: true },
      }
    )
      .then(() => {
        res.status(201).send("comment deleted");
      })
      .catch((error) => {
        console.error(error);
        res.status(404).send({ error, err: "comments not found" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error");
  }
}
