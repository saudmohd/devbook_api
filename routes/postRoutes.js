import { Router } from "express";
const router = Router();
import { protect } from "../middleware/authMiddleware.js"; 
import { 
  createPost, 
  getPosts, 
  likePost,
  getPostById, 
  deletePost 
} from "../controllers/postController.js"; 

router.post("/", protect, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/:id/like", protect, likePost);
router.delete("/:id", protect, deletePost);

export default router;