import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    exp: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model('user', UserSchema);
export default User;
