const productRoute = require('express').Router();
const  productController  = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticator');

// Route to create a new product (protected)
productRoute.post('/create', authenticateToken, productController.createProduct);
productRoute.get('/all', productController.getAllProducts);//200
productRoute.get("/:id", productController.getProductById);//200
productRoute.get("/search", productController.searchProducts);
productRoute.get("/:id/related", productController.getRelatedProducts);

// 

module.exports = productRoute;