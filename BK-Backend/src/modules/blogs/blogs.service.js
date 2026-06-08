import Blog from './blogs.model.js';

export async function getAllBlogs(filter = {}) {
  const query = {};
  if (filter.published !== undefined) query.published = filter.published;
  if (filter.tag) query.tags = filter.tag;
  return Blog.find(query).sort({ createdAt: -1 }).lean();
}

export async function getBlogById(id) {
  return Blog.findById(id).lean();
}

export async function createBlog(data) {
  return new Blog(data).save();
}

export async function updateBlog(id, data) {
  return Blog.findByIdAndUpdate(id, { $set: data }, { returnDocument: "after" , runValidators: true });
}

export async function deleteBlog(id) {
  return Blog.findByIdAndDelete(id);
}