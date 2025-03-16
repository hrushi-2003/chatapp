import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createMessage,
  getAllUsers,
  getMessages,
} from "../controller/messages.controller.js ";

const router = express.Router();

router.get("/users", isAuthenticated, getAllUsers);
router.post("/send/:id", isAuthenticated, createMessage);
router.get("/:id", isAuthenticated, getMessages);
export default router;
