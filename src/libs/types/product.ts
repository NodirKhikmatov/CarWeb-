import { ObjectId } from "mongoose";
import {
  ProductStatus,
  ProductCollection,
  ProductSize,
  ProductVolume,
} from "../enum/product.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  // productLeftCount: number; // Changed from string to number
  productSize: ProductSize;
  productVolume: ProductVolume; // Changed from number to string
  productDesc?: string;
  productImages: string[];
  productViews: number;
}

export interface ProductInput {
  productStatus?: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  // productLeftCount: number;
  productSize?: ProductSize;
  productVolume?: ProductVolume;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}

export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productCollection?: ProductCollection;
  productName?: string;
  productPrice?: number;
  // productLeftCount?: number;
  productSize?: ProductSize;
  productVolume?: ProductVolume;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}
