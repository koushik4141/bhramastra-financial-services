"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogs = getBlogs;
exports.getAllBlogsAdmin = getAllBlogsAdmin;
exports.getBlogBySlug = getBlogBySlug;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
const prisma_1 = __importDefault(require("../utils/prisma"));
async function getBlogs(req, res) {
    try {
        const { category } = req.query;
        const whereClause = {};
        // Non-admin users only see published blogs
        whereClause.published = true;
        if (category) {
            whereClause.category = category;
        }
        const blogs = await prisma_1.default.blogPost.findMany({
            where: whereClause,
            orderBy: { publishedAt: "desc" },
        });
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch blogs" });
    }
}
async function getAllBlogsAdmin(req, res) {
    try {
        const blogs = await prisma_1.default.blogPost.findMany({
            orderBy: { publishedAt: "desc" },
        });
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch blogs for admin" });
    }
}
async function getBlogBySlug(req, res) {
    try {
        const { slug } = req.params;
        const blog = await prisma_1.default.blogPost.findUnique({
            where: { slug },
        });
        if (!blog) {
            return res.status(404).json({ error: "Blog post not found" });
        }
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch blog post" });
    }
}
async function createBlog(req, res) {
    try {
        const { title, slug, content, category, tags, published } = req.body;
        if (!title || !slug || !content || !category) {
            return res.status(400).json({ error: "Missing required blog fields" });
        }
        const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
        const existing = await prisma_1.default.blogPost.findUnique({ where: { slug: cleanSlug } });
        if (existing) {
            return res.status(400).json({ error: "Slug must be unique" });
        }
        const blog = await prisma_1.default.blogPost.create({
            data: {
                title,
                slug: cleanSlug,
                content,
                category,
                tags: tags ? (Array.isArray(tags) ? tags.join(",") : tags) : "",
                published: published ?? false,
            },
        });
        res.status(201).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to create blog post" });
    }
}
async function updateBlog(req, res) {
    try {
        const { id } = req.params;
        const { title, slug, content, category, tags, published } = req.body;
        const data = {};
        if (title)
            data.title = title;
        if (slug)
            data.slug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
        if (content)
            data.content = content;
        if (category)
            data.category = category;
        if (tags)
            data.tags = Array.isArray(tags) ? tags.join(",") : tags;
        if (published !== undefined)
            data.published = published;
        const blog = await prisma_1.default.blogPost.update({
            where: { id },
            data,
        });
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update blog post" });
    }
}
async function deleteBlog(req, res) {
    try {
        const { id } = req.params;
        await prisma_1.default.blogPost.delete({ where: { id } });
        res.status(200).json({ message: "Blog post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete blog post" });
    }
}
