import { Router } from "express";
import * as controller from "../controllers/app.controller";
import multer from "multer";
import { newPost } from "../controllers/post.controller";
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Post Route
router.route("/signup").post(controller.userSignup); //user sign up
router.route("/login").post(controller.userLogin); //user login
router.route("/admin-login").post(controller.adminLogin); //admin login
router.route("/user/newpost").post(upload.single("image"), newPost);//user new post
// Get Route
router.route("/admin/users").get(controller.getAllUsers); //getting all users

export default router;
