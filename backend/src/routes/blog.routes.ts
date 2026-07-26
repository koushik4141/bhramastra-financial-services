import { Router } from "express";
import { authenticateJWT, requireAdmin } from "../middleware/auth.middleware";
import {
  getBlogs,
  getAllBlogsAdmin,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogs.controller";

const router = Router();

// Public routes
router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);

// Admin-only management routes
router.get("/admin", authenticateJWT, requireAdmin, getAllBlogsAdmin);
router.post("/", authenticateJWT, requireAdmin, createBlog);
router.put("/:id", authenticateJWT, requireAdmin, updateBlog);
router.delete("/:id", authenticateJWT, requireAdmin, deleteBlog);

export default router;
