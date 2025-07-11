import { ProductCollection } from "./../libs/enum/product.enum";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductInput, Product, ProductInquiry } from "../libs/types/product";
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/errors";
import ProductService from "../models/Product.service";

const productService = new ProductService();

const productController: T = {};

/*SPA */

productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");
    const { page, limit, order, productCollection, search } = req.query;

    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };

    if (productCollection) {
      inquiry.productCollection = productCollection as ProductCollection;
    }

    if (search) inquiry.search = String(search);

    const result = await productService.getProducts(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("err: getProducts:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct");

    const { id } = req.params;

    const memberId = req.member?._id ?? null,
      result = await productService.getProduct(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("err: getProduct:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/*SSR */
productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();
    console.log("data:", data);

    res.render("products", { products: data });
  } catch (err) {
    console.log("err: getAllProducts:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");
    // console.log("re.files:", req.files);
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => {
      return ele.path;
    });
    console.log("data:", data);
    //call

    await productService.createNewProduct(data);

    res.send(
      `<script> alert(" succesfull creation"); window.location.replace('/admin/product/all') </script>`
    );
    ` `;
  } catch (err) {
    // console.log("err: createNewProduct:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert(" ${message}"); window.location.replace('/admin/product/all') </script>`
    );
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
    // const id = req.params.id;
    const { id } = req.params;
    const result = await productService.updateChosenProduct(id, req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("err: updateChosenProduct:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else res.status(Errors.standard.code).json(Errors.standard);
  }
};
export default productController;
