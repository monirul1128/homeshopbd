import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    image: String,
    author: String,
    status: {
      type: String,
      enum: ['SHOW', 'HIDE'],
      default: 'SHOW',
    },
    slug: String,
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
