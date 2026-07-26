"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const blogs_controller_1 = require("../controllers/blogs.controller");
const router = (0, express_1.Router)();
// Public routes
router.get("/", blogs_controller_1.getBlogs);
router.get("/slug/:slug", blogs_controller_1.getBlogBySlug);
// Admin-only management routes
router.get("/admin", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, blogs_controller_1.getAllBlogsAdmin);
router.post("/", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, blogs_controller_1.createBlog);
router.put("/:id", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, blogs_controller_1.updateBlog);
router.delete("/:id", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, blogs_controller_1.deleteBlog);
exports.default = router;
