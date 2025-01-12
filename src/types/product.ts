import mongoose, { Query } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  brand: string;
  category: string;
  user: mongoose.Schema.Types.ObjectId;
  images: string[];
  reviews: string[];
  price: number;
  totalQuantity: number;
  totalSold: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaginationResult {
  pagination: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  };
  query: Query<any[], any>;
}
