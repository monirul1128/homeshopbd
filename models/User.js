import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: String,
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    address: String,
    paymentId: String,
    imageURL: String,
    imageURL2: String,
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER'],
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'],
      default: 'ACTIVE',
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'SELLER'],
      default: 'USER',
    },
    isWholesale: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'INACTIVE',
    },
    forgetPasswordToken: String,
    totalBaleens: Number,
    activeBaleens: Number,
    pendingBaleens: Number,
    dueBaleens: Number,
    account_Type: String,
    bikash_Number: String,
    account: mongoose.Schema.Types.Mixed,
    coupon: String,
    shop_name: String,
    shop_logo: String,
    shop_address: String,
    wallet: Number,
    joiningDate: Date,
    lastCollected: {
      type: Date,
      default: Date.now,
    },
    shop_phone: String,
    with_dro: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'INACTIVE',
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
