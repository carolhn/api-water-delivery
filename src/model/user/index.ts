import mongoose from 'mongoose';
import { IUser } from 'src/types/user';
const Schema = mongoose.Schema;

interface IUserModel extends IUser, Document {}

const UserSchema = new Schema<IUserModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    wishLists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'WishList',
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isShippingAddress: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUserModel>('User', UserSchema);

export default User;
