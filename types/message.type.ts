import { User } from "./user.type"; 
import { PropertyType } from "./property.type";

export interface MessageType {
  _id: string;
  sender: User["_id"];
  recipient: User["_id"];
  property: PropertyType["_id"];
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