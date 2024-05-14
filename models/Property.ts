import { Schema, model, models, Types, Document, Model } from 'mongoose';
import { Location, Rates, SellerInfo } from '@/types/property.type'

export interface Property {
  owner: string | Types.ObjectId;
  name: string;
  type: string;
  description: string;
  location: Location;
  beds: number;
  baths: number;
  square_feet: number;
  amenities?: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyDocument extends Property, Document {}

export interface PropertyModel extends Model<PropertyDocument> {}

const PropertySchema = new Schema<PropertyDocument, PropertyModel>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: {
        type: Number,
      },
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    // NOTE: Limit the user to a maximum of 4 images
    images: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length <= 4,
        message: (props) =>
          `The images array can contain a maximum of 4 images, but got ${props.value.length}`,
      },
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property: PropertyModel = models.Property || model<PropertyDocument, PropertyModel>('Property', PropertySchema);

export default Property;
