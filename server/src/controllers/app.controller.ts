import Users from "../database/models/user.model";
import bcrypt, { hash } from "bcrypt";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { config } from "../config";

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
        const token = Jwt.sign(
          {
            userId: user._id,
            username: user.username,
          },
          config.SECRET,
          { expiresIn: "24h" }
        );
        return res.status(201).send({
          Message: "Login succesful",
          user,
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
        config.SECRET,
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
