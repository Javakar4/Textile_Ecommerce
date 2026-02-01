import Product from "../models/ProductSchema.js";
import Category from "../models/CategorySchema.js";
import mongoose from "mongoose";


/**
 * Create a new product.
 */
export const createProduct = async (data) => {
  return await Product.create(data);
};

/**
 * Get all products with filtering and pagination.
 */
export const getAllProducts = async (query) => {
  const {
    page = 1,
    limit = 10,
    category,
    size,
    minPrice,
    maxPrice,
    search,
  } = query;

  const filter = {};

  if (category) {
    let categoryIds = [];
    
    if (mongoose.Types.ObjectId.isValid(category)) {
      // If it's a valid ObjectId, we start with it
      categoryIds.push(new mongoose.Types.ObjectId(category));
      // And find its children
      const children = await Category.find({ parentId: category });
      categoryIds.push(...children.map(child => child._id));
    } else {
      // Otherwise try to find by slug first then name
      const categoryDoc = await Category.findOne({ 
        $or: [{ slug: category }, { name: category }] 
      });

      if (categoryDoc) {
        categoryIds.push(categoryDoc._id);
        const children = await Category.find({ parentId: categoryDoc._id });
        categoryIds.push(...children.map(child => child._id));
      }
    }

    if (categoryIds.length > 0) {
      filter.categoryId = { $in: categoryIds };
    } else if (!mongoose.Types.ObjectId.isValid(category)) {
      // If no category found and it wasn't an ID, return empty list
      return [];
    }
  }

  if (size) filter.sizes = size;
  if (minPrice || maxPrice) {
    filter["pricing.current"] = {};
    if (minPrice) filter["pricing.current"].$gte = Number(minPrice);
    if (maxPrice) filter["pricing.current"].$lte = Number(maxPrice);
  }
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  return await Product.find(filter)
    .populate("brandId", "name")
    .populate("categoryId", "name")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });
};

/**
 * Get a single product by ID.
 */
export const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("brandId", "name")
    .populate("categoryId", "name");

  if (!product) throw new Error("Product not found");
  return product;
};

/**
 * Update a product.
 */
export const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!product) throw new Error("Product not found");
  return product;
};

/**
 * Delete a product.
 */
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");
};
