import { Schema, model, models, Document, Model } from 'mongoose';

export interface IMessage {
  sender: Schema.Types.ObjectId;
  recipient: Schema.Types.ObjectId;
  property: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read?: boolean;
}

export interface IMessageDocument extends IMessage, Document {}

export interface IMessageModel extends Model<IMessageDocument> {}

const MessageSchema = new Schema<IMessageDocument, IMessageModel>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required!'],
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message: IMessageModel = models.Message || model<IMessageDocument, IMessageModel>('Message', MessageSchema);

export default Message;
