import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    discount: Number,
    stock: Number,
    category: mongoose.Schema.Types.ObjectId,
    categoryName: String,
    brand: String,
    image: String,
    images: [String],
    status: {
      type: Boolean,
      default: true,
    },
    sku: String,
    rating: Number,
    reviews: [
      {
        user: String,
        comment: String,
        rating: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
