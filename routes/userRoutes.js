import { Router } from "express";
const router = Router();

import { protect, admin } from "../middleware/authMiddleware.js";
import { uploadUserPhoto } from "../middleware/uploadMiddleware.js";
import {
  getMe,
  getUsers,
  getRecentUsers, 
  deleteUser,
  updateUserPhoto
} from "../controllers/userController.js";

// Protected routes
router.get("/me", protect, getMe);
router.get("/", protect, admin, getUsers);
router.get("/recent", protect, admin, getRecentUsers);
router.delete("/:id", protect, admin, deleteUser);
router.post('/me/photo', protect, uploadUserPhoto, updateUserPhoto);

export default router;