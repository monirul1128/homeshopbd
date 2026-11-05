import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    parentCategory: String,
    childCategory: [String],
    imageURLs: [String],
    imageURLs2: String,
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
