import mongoose, { Schema } from "mongoose";
import {
  ProductSize,
  ProductVolume,
  ProductCollection,
  ProductStatus,
} from "../libs/enums/product.enum";

const productSchema = new Schema(
  {
    productStatus: {
      type: String, // Changed from Number to String to align with your enum values
      enum: Object.values(ProductStatus),
      default: ProductStatus.AVAILABLE,
    },
    productCollection: {
      type: String,
      enum: Object.values(ProductCollection),
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },

    productSize: {
      type: String,
      enum: Object.values(ProductSize),
      default: ProductSize.COMPACT,
    },
    productVolume: {
      type: String,
      enum: Object.values(ProductVolume),
      default: ProductVolume.SUBCOMPACT,
    },
    productDesc: {
      type: String,
    },
    productImages: {
      type: [String],
      default: [],
    },
    productView: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index(
  { productName: 1, productSize: 1, productVolume: 1 },
  { unique: true }
);

export default mongoose.model("Product", productSchema);



