import { User } from "./user.type"; 
import { PropertyType } from "./property.type";

export interface MessageType {
  _id: string;
  sender: {
    username: User["username"]
  } | string
  recipient: User["_id"];
  property: {
    name: PropertyType["name"]
  } | string
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