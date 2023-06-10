import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

dotenv.config();

const SECRET_JWT: Secret = process.env.SECRET_JWT as Secret;


export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Invalid Token" });
    }
    jwt.verify(token, SECRET_JWT, (err, user) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid Token" });
      }
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error, err: "Authentication failed" });
  }
};
