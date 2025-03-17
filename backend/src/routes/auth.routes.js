import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
  updateProfile,
} from "../controller/auth.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", isAuthenticated, checkAuth);
router.put("/update-profile", isAuthenticated, updateProfile);
export default router;
