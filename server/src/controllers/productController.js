// controllers/productController.js
const { rtnRes } = require("../utils/responseHandlerService");
const { productService } = require("../services/productService");

module.exports = {

  // 1. CREATE PRODUCT CONTROLLER
  async createProduct(req, res) {
    try {
      const data = req.body;

      // Basic validation
      const required = ["title", "description",
                        "price", "old_price", 
                        "category_id", "thumbnail_url1", 
                        "thumbnail_url2", "thumbnail_url3", 
                        "stock", "status"];
                        
      for (const field of required) {
        if (!data[field]) {
          return rtnRes(res, 400, `${field} is required`);
        }
      }

      const result = await productService.insertProduct(data);

      if (!result.ok) {
        return rtnRes(res, 500, result.message || "Failed to create product");
      }

      return rtnRes(res, 200, "Product created successfully", {
        productId: result.productId
      });

    } catch (err) {
      console.error("createProduct controller error:", err);
      return rtnRes(res, 500, "Internal Server Error");
    }
  },
  
  // 2. GET ALL PRODUCTS CONTROLLER
  async getAllProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const category = req.query.category;
      const subcategory = req.query.subcategory || null;

      // Category is required
      if (!category) {
        return rtnRes(res, 400, "category is required");
      }

      const filters = { category, subcategory };

      const result = await productService.getAllProducts(filters, page, limit);

      if (!result.ok) {
        return rtnRes(res, 500, result.message);
      }

      return rtnRes(res, 200, "Products fetched successfully", {
        products: result.data,
        pagination: result.pagination
      });

    } catch (err) {
      console.error("getAllProducts controller error:", err);
      return rtnRes(res, 500, "Internal Server Error");
    }
  },
  
  // 3. GET PRODUCT BY ID CONTROLLER
async getProductById(req, res) {
  try {
    const productId = req.params.id;

    if (!productId) {
      return rtnRes(res, 400, "Product ID is required");
    }

    const result = await productService.getProductById(productId);

    if (!result.ok) {
      return rtnRes(res, 404, result.message);
    }

    return rtnRes(res, 200, "Product details fetched successfully", {
      product: result.data
    });

  } catch (err) {
    console.error("getProductById controller error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
},

  async searchProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // const category = req.query.category;
    // if (!category) {
    //   return rtnRes(res, 400, "category is required");
    // }

    const filters = {
      category: req.query.category || null,
      subcategory: req.query.subcategory || null,
      search: req.query.search || null,
      min_price: req.query.min_price || null,
      max_price: req.query.max_price || null,
      sort: req.query.sort || null
    };

    const result = await productService.searchProducts(filters, page, limit);

    if (!result.ok) {
      return rtnRes(res, 500, result.message);
    }

    return rtnRes(res, 200, "Products fetched successfully", {
      products: result.data,
      pagination: result.pagination
    });

  } catch (err) {
    console.error("searchProducts controller error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
},

// 4. GET RELATED PRODUCTS
async getRelatedProducts(req, res) {
  try {
    const productId = req.params.id;

    if (!productId) {
      return rtnRes(res, 400, "Product ID is required");
    }

    const result = await productService.getRelatedProducts(productId);

    if (!result.ok) {
      return rtnRes(res, 404, result.message);
    }

    return rtnRes(res, 200, "Related products fetched successfully", {
      related: result.data
    });

  } catch (err) {
    console.error("getRelatedProducts controller error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
}

};
