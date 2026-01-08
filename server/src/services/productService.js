// services/productService.js
const { queryRunner } = require("../db");

module.exports.productService = {

  // CREATE PRODUCT
  async insertProduct({
        title,
        description,
        price,
        old_price,
        category_id,
        thumbnail_url1,
        thumbnail_url2,
        thumbnail_url3,
        stock,
        status,
        key_features}) {
    try {
       

      const sql = `
        INSERT INTO products 
        (title, description, price, old_price, category_id, 
         thumbnail_url1, thumbnail_url2, thumbnail_url3, 
         stock, status, key_features, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))
      `;

      const params = [
        title,
        description,
        price,
        old_price,
        category_id,
        thumbnail_url1,
        thumbnail_url2,
        thumbnail_url3,
        stock,
        status,
        JSON.stringify(key_features || [])
      ];

      const result = await queryRunner(sql, params);

      return {
        ok: result.affectedRows > 0,
        productId: result.insertId
      };

    } catch (err) {
      console.error("createProduct error:", err);
      return { ok: false, message: "Failed to create product" };
    }
  },

  //to get all products from a 
  // category with pagination and optional filters
  //ordered by subcategory and created_at desc

  
  async getAllProducts(filters = {}, page = 1, limit = 20) {
  try {
    const offset = (page - 1) * limit;

    const { category, subcategory } = filters;

    let sql = `
        SELECT 
          id,
          title,
          price,
          old_price,
          category_id,
          subcategory,
          thumbnail_url1,
          stock,
          status
        FROM products
        WHERE status = 'active'
          AND category_id = ?

    `;

    let params = [category];

    // Optional subcategory
    if (subcategory) {
      sql += ` AND subcategory = ?`;
      params.push(subcategory);
    }

    sql += ` ORDER BY subcategory ASC, created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const products = await queryRunner(sql, params);

    // Count
    let countSql = `
      SELECT COUNT(*) AS total 
      FROM products 
      WHERE status='active'
      AND category_id = ?
    `;
    let countParams = [category];

    if (subcategory) {
      countSql += ` AND subcategory = ?`;
      countParams.push(subcategory);
    }

    const countRows = await queryRunner(countSql, countParams);
    const total = countRows[0].total;

    return {
      ok: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };

  } catch (err) {
    console.error("getAllProducts error:", err);
    return { ok: false, message: "Failed to fetch products" };
  }
},

// GET PRODUCT BY ID (USER APP - FULL DETAILS)
async getProductById(productId) {
  try {
    const sql = `
      SELECT 
        id, 
        title, 
        description,
        price, 
        old_price,
        category_id,
        subcategory,
        thumbnail_url1,
        thumbnail_url2,
        thumbnail_url3,
        key_features,
        stock,
        status,
        created_at,
        updated_at
      FROM products
      WHERE id = ? AND status = 'active'
      LIMIT 1
    `;

    const rows = await queryRunner(sql, [productId]);

    if (!rows || rows.length === 0) {
      return { ok: false, message: "Product not found" };
    }

    return {
      ok: true,
      data: rows[0]
    };

  } catch (err) {
    console.error("getProductById error:", err);
    return { ok: false, message: "Failed to fetch product detail" };
  }
},

  async searchProducts(filters, page = 1, limit = 20) {
  try {
    const offset = (page - 1) * limit;

    const {
      category,
      subcategory,
      search,
      min_price,
      max_price,
      sort
    } = filters;

    // base sql
    let sql = `
      SELECT 
        id, title, price, old_price, category_id, subcategory,
        thumbnail_url1, stock, status
      FROM products
      WHERE status = 'active'
      `;
      

    let countSql = `
      SELECT COUNT(*) AS total 
      FROM products
      WHERE status = 'active'
      `;
    


    let params = [];
    let countParams = [];

    if (category) {
      sql += ` AND category_id = ?`;
      params.push(category);
      countSql += ` AND category_id = ?`;     
      countParams.push(category);
    }

    // optional subcategory
    if (subcategory) {
      sql += ` AND subcategory = ?`;
      params.push(subcategory);
      countSql += ` AND subcategory = ?`;     
      countParams.push(subcategory);
    }

    // search keyword
    if (search) {
      sql += ` AND title LIKE ?`;
      params.push(`%${search}%`);
      countSql += ` AND title LIKE ?`;
      countParams.push(`%${search}%`);

    }

    // price filters
    if (min_price) {
      sql += ` AND price >= ?`;
      params.push(min_price);
      countSql += ` AND price >= ?`;
      countParams.push(min_price);
    }

    if (max_price) {
      sql += ` AND price <= ?`;
      params.push(max_price);
      countSql += ` AND price <= ?`;
      countParams.push(max_price);
    }

    // sorting
    if (sort === "price_asc") {
      sql += ` ORDER BY price ASC`;
    } else if (sort === "price_desc") {
      sql += ` ORDER BY price DESC`;
    } else if (sort === "newest") {
      sql += ` ORDER BY created_at DESC`;
    } else {
      sql += ` ORDER BY created_at DESC`; // default
    }

    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const products = await queryRunner(sql, params);
    // count total
    const countRows = await queryRunner(countSql, countParams);
    const total = countRows[0].total;

    return {
      ok: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };

  } catch (err) {
    console.error("searchProducts error:", err);
    return { ok: false, message: "Failed to search products" };
  }
},

// GET RELATED PRODUCTS (USER APP)
async getRelatedProducts(productId, limit = 10) {
  try {
    // Step 1: Fetch main product details
    const getMainSql = `
      SELECT category_id, subcategory
      FROM products
      WHERE id = ? AND status = 'active'
      LIMIT 1
    `;
    const mainProductRows = await queryRunner(getMainSql, [productId]);

    if (!mainProductRows || mainProductRows.length === 0) {
      return { ok: false, message: "Product not found" };
    }

    const main = mainProductRows[0];
    const { category_id, subcategory } = main;

    // Step 2: Base query for related products
    let sql = `
      SELECT 
        id, title, price, old_price, thumbnail_url1,
        category_id, subcategory
      FROM products
      WHERE status = 'active'
      AND category_id = ?
      AND id != ?
    `;

    let params = [category_id, productId];

    // Step 3: If subcategory exists → prioritize same subcategory
    if (subcategory) {
      sql += ` AND subcategory = ?`;
      params.push(subcategory);
    }

    sql += ` ORDER BY created_at DESC LIMIT ?`;
    params.push(limit);

    const related = await queryRunner(sql, params);

    return {
      ok: true,
      data: related
    };

  } catch (err) {
    console.error("getRelatedProducts error:", err);
    return { ok: false, message: "Failed to fetch related products" };
  }
}


};
