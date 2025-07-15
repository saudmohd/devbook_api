import { Router } from "express";
const router = Router();
import { protect } from "../middleware/authMiddleware.js"; 
import { 
  createPost, 
  getPosts, 
  likePost, 
  deletePost 
} from "../controllers/postController.js"; 

router.post("/", protect, createPost);
router.get("/", getPosts);
router.post("/:id/like", protect, likePost);
router.delete("/:id", protect, deletePost);

export default router;