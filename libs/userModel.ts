import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      require: false,
    },
    userName: {
      type: String,
    },
    version: { type: Number, default: 4 },
    history: { type: Array, default: [] },
    folders: { type: Array, default: [] },
    prompts: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
