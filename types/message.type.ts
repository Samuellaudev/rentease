import { Document } from 'mongoose'; // To include 'save' method provided by Document 
import { User } from "./user.type"; 
import { PropertyType } from "./property.type";

export interface MessageType extends Document {
  _id: string;
  sender: {
    username: User["username"];
  }
  recipient: User["_id"];
  property: {
    name: PropertyType["name"]
  };
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  error: string
  submitted: boolean;
}