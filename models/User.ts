import { Schema, model, models, Document, Model } from 'mongoose';
import { User as UserModel } from '@/types/user.type'

export interface UserType {
  email: string
  username: string
  image: string
  bookmarks: string[]
}

export interface UserTypeDocument extends UserType, Document {}

export interface UserTypeModel extends Model<UserTypeDocument> {}

const UserSchema = new Schema<UserTypeDocument, UserTypeModel>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
    },
    username: {
      type: String,
      required: [true, 'Username is required!'],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User: UserTypeModel = models.User || model<UserTypeDocument, UserTypeModel>('User', UserSchema);

export default User;
