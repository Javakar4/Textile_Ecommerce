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
    sizes,
    size, // fallback for older clients
    materials,
    brands, // array of brand names
    tags,
    ratings, // array of min ratings e.g. ['4', '3']
    inStockOnly,
    minPrice,
    maxPrice,
    search,
    sortBy = 'featured'
  } = query;

  const filter = {};

  if (category) {
    let categoryIds = [];
    
    if (mongoose.Types.ObjectId.isValid(category)) {
      categoryIds.push(new mongoose.Types.ObjectId(category));
      const children = await Category.find({ parentId: category });
      categoryIds.push(...children.map(child => child._id));
    } else {
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
      return { products: [], total: 0, page: 1, totalPages: 0, limit: Number(limit) };
    }
  }

  // Sizes Filter
  if (sizes) {
    const sizeArr = Array.isArray(sizes) ? sizes : sizes.split(',');
    filter.sizes = { $in: sizeArr };
  } else if (size) {
    filter.sizes = size;
  }

  // Materials Filter
  if (materials) {
    const matArr = Array.isArray(materials) ? materials : materials.split(',');
    filter.material = { $in: matArr };
  }

  // Tags Filter
  if (tags) {
    const tagArr = Array.isArray(tags) ? tags : tags.split(',');
    filter.tags = { $in: tagArr };
  }

  // Brands Filter (Needs lookup since client sends names)
  if (brands) {
    const brandArr = Array.isArray(brands) ? brands : brands.split(',');
    // Wait, let's just do a populate and filter, or lookup brands first
    const brandDocs = await mongoose.model("Brand").find({ name: { $in: brandArr } });
    const brandIds = brandDocs.map(b => b._id);
    if (brandIds.length > 0) {
      filter.brandId = { $in: brandIds };
    }
  }

  // Ratings Filter (Get highest min rating)
  if (ratings) {
    const rateArr = Array.isArray(ratings) ? ratings : ratings.split(',');
    const minScore = Math.min(...rateArr.map(Number));
    if (!isNaN(minScore)) {
      filter["rating.score"] = { $gte: minScore };
    }
  }

  // Stock Filter
  if (inStockOnly === 'true' || inStockOnly === true) {
    filter["stock.available"] = true;
  }

  // Price Filter
  if (minPrice || maxPrice) {
    filter["pricing.current"] = {};
    if (minPrice) filter["pricing.current"].$gte = Number(minPrice);
    if (maxPrice) filter["pricing.current"].$lte = Number(maxPrice);
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  // Sorting
  let sortOption = { createdAt: -1 };
  if (sortBy === 'price-low') sortOption = { "pricing.current": 1 };
  else if (sortBy === 'price-high') sortOption = { "pricing.current": -1 };
  else if (sortBy === 'newest') sortOption = { addedDate: -1, createdAt: -1 };
  else if (sortBy === 'rating') sortOption = { "rating.score": -1 };
  else if (sortBy === 'popular') sortOption = { "rating.count": -1 };
  else if (sortBy === 'discount') sortOption = { "pricing.discount": -1 };

  // Add _id to sort to ensure stable pagination for items with identical sort fields
  sortOption._id = 1;

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate("brandId", "name")
    .populate("categoryId", "name")
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .sort(sortOption);

  return {
    products,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    limit: Number(limit)
  };
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
