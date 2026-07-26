import { Request, Response } from "express";
import prisma from "../utils/prisma";

export async function getBlogs(req: Request, res: Response) {
  try {
    const { category } = req.query;
    const whereClause: any = {};
    
    // Non-admin users only see published blogs
    whereClause.published = true;
    
    if (category) {
      whereClause.category = category as string;
    }

    const blogs = await prisma.blogPost.findMany({
      where: whereClause,
      orderBy: { publishedAt: "desc" },
    });
    
    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch blogs" });
  }
}

export async function getAllBlogsAdmin(req: Request, res: Response) {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch blogs for admin" });
  }
}

export async function getBlogBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const blog = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch blog post" });
  }
}

export async function createBlog(req: Request, res: Response) {
  try {
    const { title, slug, content, category, tags, published } = req.body;

    if (!title || !slug || !content || !category) {
      return res.status(400).json({ error: "Missing required blog fields" });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const existing = await prisma.blogPost.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      return res.status(400).json({ error: "Slug must be unique" });
    }

    const blog = await prisma.blogPost.create({
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
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create blog post" });
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, slug, content, category, tags, published } = req.body;

    const data: any = {};
    if (title) data.title = title;
    if (slug) data.slug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (content) data.content = content;
    if (category) data.category = category;
    if (tags) data.tags = Array.isArray(tags) ? tags.join(",") : tags;
    if (published !== undefined) data.published = published;

    const blog = await prisma.blogPost.update({
      where: { id },
      data,
    });

    res.status(200).json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update blog post" });
  }
}

export async function deleteBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.blogPost.delete({ where: { id } });
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete blog post" });
  }
}
