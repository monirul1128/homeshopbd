import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    link: String,
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    order: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
