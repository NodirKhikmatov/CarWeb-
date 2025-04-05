import ProductModel from "../schema/Product.model";
import Errors, { HttpCode, Message } from "../libs/errors";

import { Product, ProductInput } from "../libs/types/product";
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
}

export default ProductService;
