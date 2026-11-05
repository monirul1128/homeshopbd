import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discount: Number,
    quantity: Number,
    category: [String],
    taggedIds: [String],
    newProduct: Boolean,
    status: {
      type: Boolean,
      default: true,
    },
    image: String,
    images: [String],
    sku: String,
    rating: Number,
    reviews: mongoose.Schema.Types.Mixed,
    specifications: mongoose.Schema.Types.Mixed,
    subCategory: String,
    brand: String,
    seller: String,
    stock: Number,
    discount_price: Number,
    offer_end_date: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
