import Product from "../models/ProductSchema.js";


/* CREATE */
export const createProduct = async (data) => {
  return await Product.create(data);
};

/* READ ALL (FILTER + PAGINATION) */
export const getAllProducts = async (query) => {
  const {
    page = 1,
    limit = 10,
    category,
    size,
    minPrice,
    maxPrice,
    search
  } = query;

  const filter = {};

  if (category) filter.categoryId = category;
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

/* READ ONE */
export const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("brandId", "name")
    .populate("categoryId", "name");

  if (!product) throw new Error("Product not found");
  return product;
};

/* UPDATE */
export const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true
  });

  if (!product) throw new Error("Product not found");
  return product;
};

/* DELETE */
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");
};
