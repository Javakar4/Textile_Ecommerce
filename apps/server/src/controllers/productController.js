import * as productService from "../services/productService.js";
import { rtnRes } from "../utils/responseHandlerService.js";

/**
 * Controller to create a product.
 */
export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return rtnRes(res, 201, "Product created successfully", product);
  } catch (error) {
    return rtnRes(res, 400, error.message);
  }
};

/**
 * Controller to get all products.
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    return rtnRes(res, 200, "Products fetched successfully", products);
  } catch (error) {
    return rtnRes(res, 500, error.message);
  }
};

/**
 * Controller to get a specific product.
 */
export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return rtnRes(res, 200, "Product fetched successfully", product);
  } catch (error) {
    return rtnRes(res, 404, error.message);
  }
};

/**
 * Controller to update a product.
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return rtnRes(res, 200, "Product updated successfully", product);
  } catch (error) {
    return rtnRes(res, 400, error.message);
  }
};

/**
 * Controller to delete a product.
 */
export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    return rtnRes(res, 200, "Product deleted successfully");
  } catch (error) {
    return rtnRes(res, 400, error.message);
  }
};
