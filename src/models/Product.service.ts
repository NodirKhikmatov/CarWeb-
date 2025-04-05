import ProductModel from "../schema/Product.model";
import Errors, { HttpCode, Message } from "../libs/errors";

import {
  Product,
  ProductInput,
  ProductUpdateInput,
} from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/config";
class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  /*SPA */

  /*SSR */

  //definition
  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.error("err:createNewProduct error:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }

  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput
  ): Promise<Product> {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    console.log(result);
    return result;
  }
}

export default ProductService;
