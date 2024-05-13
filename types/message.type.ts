import { User } from "./user.type"; 
import { PropertyType } from "./property.type";

export interface MessageType {
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
  read: false;
  createdAt: string;
  updatedAt: string;
  error: string
  submitted: boolean;
}