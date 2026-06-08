import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true, default: '' },
    blocks: { type: Array, default: [] },
    author: { type: String, trim: true, default: 'Admin' },
    tags: { type: [String], default: [] },
    coverImage: { type: String, trim: true, default: null },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

blogSchema.index({ createdAt: -1 });
blogSchema.index({ tags: 1 });

export default mongoose.model('Blog', blogSchema);