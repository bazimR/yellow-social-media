import { Router } from "express";
import * as controller from "../controllers/app.controller";
import multer from "multer";
import { newPost, homePosts, likePost } from "../controllers/post.controller";
import { authToken } from "../middleware/auth.token";
import {
  addComment,
  deteleComments,
  getComments,
} from "../controllers/comment.controller";
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Post Route
router.route("/signup").post(controller.userSignup); //user sign up
router.route("/login").post(controller.userLogin); //user login
router.route("/admin-login").post(controller.adminLogin); //admin login
router.route("/user/newpost").post(authToken, upload.single("image"), newPost); //user new post
router.route("/user/newcomment").post(authToken, addComment); //new comments
// Get Route
router.route("/admin/users").get(controller.getAllUsers); //getting all users
router.route("/home/homeposts/:userId").get(homePosts); // user's home posts
router.route("/user/comments/:postId").get(getComments); //getting comments

// Put Route
router.route("/post/like/:postId").put(authToken, likePost); //post like/unlike
router.route("/user/deletecomment").put(authToken, deteleComments); //delete comment
// router test
router.route("/test").all();
export default router;
