import { Router } from "express";
import * as controller from "../controllers/app.controller";
const router = Router();

// Post Route
router.route("/signup").post(controller.userSignup); //user sign up
router.route("/login").post(controller.userLogin); //user login
router.route('/admin-login').post(controller.adminLogin) //admin login

// Get Route
router.route("/admin/users").get(controller.getAllUsers);//getting all users

export default router;
