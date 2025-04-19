import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from './brand';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from './category';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from './product';
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateShippingAddress,
} from './user';

import { createReview } from './review';

import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updatedOrder,
} from './order';

import { createCoupon } from './coupons';

export {
  createBrand,
  createCategory,
  createCoupon,
  createOrder,
  createProduct,
  createReview,
  deleteBrand,
  deleteCategory,
  deleteProduct,
  getAllBrands,
  getAllCategories,
  getAllOrders,
  getBrandById,
  getCategoryById,
  getProductById,
  getProducts,
  getSingleOrder,
  getUserProfile,
  loginUser,
  registerUser,
  updateBrand,
  updateCategory,
  updatedOrder,
  updateProduct,
  updateShippingAddress,
};
