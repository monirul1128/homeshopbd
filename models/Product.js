import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    sku: String,
    path: String,
    description: String,
    category: String,
    subCategory: [String],
    productColor: [String],
    saleCount: Number,
    quantity: Number,
    buyingPrice: Number,
    productPrice: Number,
    salePrice: Number,
    discount: Number,
    brand: String,
    tags: [String],
    imageURLs: [String],
    imageURLs2: [String],
    youtube: String,
    size: [String],
    ratingValue: Number,
    status: {
      type: Boolean,
      default: true,
    },
    wholesalePrice: Number,
    wholesaleStatus: String,
    advance: Number,
    free_delivery: Boolean,
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
