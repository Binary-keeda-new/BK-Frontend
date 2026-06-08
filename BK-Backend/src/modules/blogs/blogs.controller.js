import { validationResult } from 'express-validator';
import * as blogsService from './blogs.service.js';

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, errors: errors.array() });
    return true;
  }
  return false;
}

export async function listBlogs(req, res) {
  try {
    const filter = {};
    if (req.query.tag) filter.tag = req.query.tag;
    // User-facing: only published
    filter.published = true;
    const blogs = await blogsService.getAllBlogs(filter);
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    console.error('[Blogs] listBlogs error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
}

export async function getBlog(req, res) {
  try {
    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (err) {
    console.error('[Blogs] getBlog error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
}

export async function adminListBlogs(req, res) {
  try {
    const filter = {};
    if (req.query.tag) filter.tag = req.query.tag;
    if (req.query.published !== undefined) filter.published = req.query.published === 'true';
    const blogs = await blogsService.getAllBlogs(filter);
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    console.error('[Blogs] adminListBlogs error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
}

export async function createBlog(req, res) {
  if (handleValidation(req, res)) return;
  try {
    const blog = await blogsService.createBlog(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    console.error('[Blogs] createBlog error:', err);
    res.status(500).json({ success: false, message: 'Failed to create blog' });
  }
}

export async function updateBlog(req, res) {
  if (handleValidation(req, res)) return;
  try {
    const blog = await blogsService.updateBlog(req.params.id, req.body);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (err) {
    console.error('[Blogs] updateBlog error:', err);
    res.status(500).json({ success: false, message: 'Failed to update blog' });
  }
}

export async function deleteBlog(req, res) {
  if (handleValidation(req, res)) return;
  try {
    const blog = await blogsService.deleteBlog(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    console.error('[Blogs] deleteBlog error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete blog' });
  }
}