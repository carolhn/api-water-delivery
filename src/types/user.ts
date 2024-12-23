export interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  orders: string[];
  wishLists: string[];
  isAdmin: boolean;
  isShippingAddress: boolean;
  shippingAddress: IShippingAddress;
}
