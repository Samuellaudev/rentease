export interface Location {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface Rates {
  nightly?: number;
  weekly?: number;
  monthly?: number;
}

export interface SellerInfo {
  name: string;
  email: string;
  phone: string;
}
