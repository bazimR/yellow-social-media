import Users from "../database/models/user.model";
import bcrypt, { hash } from "bcrypt";
import { Request, Response } from "express";
import Jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../database/models/user.model";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, s3 } from "../database/AWSBUCKET/awsbucket";
import sharp from "sharp";
import crypto from "crypto";

dotenv.config();
const SECRET_JWT: Secret = process.env.SECRET_JWT as Secret;

const generateFileName = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};
// Post:api/signup
export async function userSignup(req: Request, res: Response) {
  try {
    const { username, password, email } = req.body;

    // checking for existing same username
    const existUsername = new Promise<void>(async (resolve, reject) => {
      try {
        const user = await Users.findOne({ username: username });
        if (user) {
          reject({ error: "Please provide a different username" });
        } else {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
    // checking for existing same email
    const existEmail = new Promise<void>(async (resolve, reject) => {
      const user = await Users.findOne({ email: email });
      if (user) {
        reject({ error: "Please provide a different email" });
      } else {
        resolve();
      }
    });

    Promise.all([existEmail, existUsername])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new Users({
                username,
                email,
                password: hashedPassword,
              });

              user
                .save()
                .then((result) => {
                  res
                    .status(201)
                    .send({ result, Message: "user successfully signed up" });
                })
                .catch((error) => {
                  return res.status(400).send({ error });
                });
            })
            .catch((error) => {
              return res
                .status(400)
                .send({ error, err: "unable to hash password" });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error, err: "Promise all broke" });
      });
  } catch (error) {
    console.error("Error occurred during user signup:", error);
    return res.status(500).json({ error: "Internal server22 error" });
  }
}

// Post api/login
export async function userLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    Users.findOne({ email: email }).then(async (user: any) => {
      const passChecks = await bcrypt.compare(password, user?.password);
      if (passChecks) {
        if (user?.profile) {
          const profileImg = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Key: user.profile,
              Bucket: bucketName,
            }),
            { expiresIn: 60 * 60 * 60 }
          );
          user.set("profileUrl", profileImg, { strict: false });
        }
        if (user?.coverImage) {
          const coverImageUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Key: user.coverImage,
              Bucket: bucketName,
            }),
            { expiresIn: 60 * 60 * 60 }
          );
          user.set("coverImageUrl", coverImageUrl, { strict: false });
        }
        const { password, ...rest } = user.toObject();
        const token = Jwt.sign(
          {
            userId: user._id,
            username: user.username,
          },
          SECRET_JWT,
          { expiresIn: "24h" }
        );
        return res.status(201).send({
          Message: "Login succesful",
          user: rest,
          token,
        });
      } else {
        return res.status(400).send({ err: "Password does not match" });
      }
    });
  } catch (error) {
    console.error("Error occurred during user signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
// get all users from db
export async function getAllUsers(req: Request, res: Response) {
  try {
    const data = await Users.find();
    if (!data) {
      res.status(404).send({ error: "Cannot get users details" });
    } else {
      res.status(201).send(data);
    }
  } catch (error) {
    res.status(404).send({ error, err: "db find failed" });
  }
}

// admin login
export async function adminLogin(req: Request, res: Response) {
  const cred = {
    email: "admin@gmail.com",
    password: "12345@",
  };
  const { email, password } = req.body;
  try {
    if (email === cred.email && password === cred.password) {
      const ADMINTOKEN = Jwt.sign(
        {
          email,
          password,
        },
        SECRET_JWT,
        { expiresIn: "24h" }
      );
      res.status(200).send({
        msg: "admin login successful",
        ADMINTOKEN,
      });
    } else {
      res.status(404).send({ error: "email and password wont match!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function googleSignIn(req: Request, res: Response) {
  try {
    const { email, username, profileUrl } = req.body;
    const password = email + username;
    const existUser = await User.findOne({ email: email, loggedBy: "google" });
    if (existUser) {
      try {
        const token = Jwt.sign(
          {
            email: email,
            username: username,
          },
          SECRET_JWT,
          { expiresIn: "24h" }
        );

        if (existUser.profile) {
          const profileImg = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Key: existUser?.profile,
              Bucket: bucketName,
            }),
            { expiresIn: 60 * 60 * 60 }
          );
          existUser?.set("profileUrl", profileImg, { strict: false });
        }
        if (existUser?.coverImage) {
          const coverImg = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Key: existUser?.coverImage,
              Bucket: bucketName,
            }),
            { expiresIn: 60 * 60 * 60 }
          );
          existUser?.set("coverImageUrl", coverImg, { strict: false });
        }

        return res.status(201).send({
          Message: "Login succesful",
          token,
          user: existUser,
        });
      } catch (error) {
        return res.status(400).send({ error });
      }
    } else {
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const user = new Users({
            username,
            email,
            password: hashedPassword,
            profileUrl: profileUrl,
            loggedBy: "google",
          });
          user
            .save()
            .then((result) => {
              const token = Jwt.sign(
                {
                  email: email,
                  username: username,
                },
                SECRET_JWT,
                { expiresIn: "24h" }
              );
              return res.status(201).send({
                Message: "Login succesful",
                token,
                user: result,
              });
            })
            .catch((error) => {
              return res.status(400).send({ error });
            });
        })
        .catch((error) => {
          return res
            .status(400)
            .send({ error, err: "unable to hash password" });
        });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function editProfile(req: Request, res: Response) {
  try {
    const formData = req.body;
    const file = req.file;
    if (!file) {
      await User.findOneAndUpdate(
        { _id: formData.userId },
        {
          $set: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            biography: formData.biography,
          },
        }
      );

      const user = await User.findOne({ _id: formData.userId });
      if (user?.coverImage) {
        const coverImg = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Key: user?.coverImage,
            Bucket: bucketName,
          }),
          { expiresIn: 60 * 60 * 60 }
        );
        user?.set("coverImageUrl", coverImg, { strict: false });
      }
      if (user?.profile) {
        const profileImg = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Key: user?.profile,
            Bucket: bucketName,
          }),
          { expiresIn: 60 * 60 * 60 }
        );
        user?.set("profileUrl", profileImg, { strict: false });
      }
      res.status(201).send({ user, Message: "edit succesful" });
    } else {
      sharp(file?.buffer)
        .resize({ height: 1080, width: 1080, fit: "cover" }) // Resize to desired dimensions
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
          s3.send(new PutObjectCommand(uploadParams)).then(async () => {
            await User.findOneAndUpdate(
              { _id: formData.userId },
              {
                $set: {
                  firstname: formData.firstname,
                  lastname: formData.lastname,
                  biography: formData.biography,
                  profile: fileName,
                },
              }
            );
            const user = await User.findById({ _id: formData.userId });
            if (user?.coverImage) {
              const coverImg = await getSignedUrl(
                s3,
                new GetObjectCommand({
                  Key: user?.coverImage,
                  Bucket: bucketName,
                }),
                { expiresIn: 60 * 60 * 60 }
              );
              user?.set("coverImageUrl", coverImg, { strict: false });
            }
            const profileImg = await getSignedUrl(
              s3,
              new GetObjectCommand({
                Key: user?.profile,
                Bucket: bucketName,
              }),
              { expiresIn: 60 * 60 * 60 }
            );
            user?.set("profileUrl", profileImg, { strict: false });

            res.status(201).send({ user, Message: "edit succesful" });
          });
        })
        .catch((error) => {
          res.status(500).send({ error, err: "buffering failed" });
        });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function editCover(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const file = req.file;
    sharp(file?.buffer)
      .resize({ height: 1080, width: 1980, fit: "cover" }) // Resize to desired dimensions
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
        s3.send(new PutObjectCommand(uploadParams)).then(async () => {
          await User.findOneAndUpdate(
            { _id: userId },
            {
              $set: {
                coverImage: fileName,
              },
            }
          );
          const user = await User.findById({ _id: userId });
          if (user?.profile) {
            const profileImg = await getSignedUrl(
              s3,
              new GetObjectCommand({
                Key: user?.profile,
                Bucket: bucketName,
              }),
              { expiresIn: 60 * 60 * 60 }
            );
            user?.set("profileUrl", profileImg, { strict: false });
          }
          if (user?.coverImage) {
            const coverImg = await getSignedUrl(
              s3,
              new GetObjectCommand({
                Key: user?.coverImage,
                Bucket: bucketName,
              }),
              { expiresIn: 60 * 60 * 60 }
            );
            user?.set("coverImageUrl", coverImg, { strict: false });
          }

          res.status(201).send({ user, Message: "edit cover succesful" });
        });
      })
      .catch((error) => {
        res.status(500).send({ error, err: "buffering failed" });
      });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function userProfile(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await User.findOne({ _id: userId });
    if (user?.profile) {
      const profileImg = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Key: user?.profile,
          Bucket: bucketName,
        }),
        { expiresIn: 60 * 60 * 60 }
      );
      user?.set("profileUrl", profileImg, { strict: false });
    }
    if (user?.coverImage) {
      const coverImg = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Key: user?.coverImage,
          Bucket: bucketName,
        }),
        { expiresIn: 60 * 60 * 60 }
      );
      user?.set("coverImageUrl", coverImg, { strict: false });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}
