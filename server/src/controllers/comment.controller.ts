import { Request, Response } from "express";
import Comment from "../database/models/comment.module";

export async function addComment(req: Request, res: Response) {
  try {
    const { userId, postId, body } = req.body;
    const comment = new Comment({
      userId,
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
    Comment.find({ postId, body: { $ne: "" } })
      .then((result) => {
        res.status(201).send(result);
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
    const { commentId } = req.query;
    Comment.findByIdAndUpdate(
      { commentId },
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
