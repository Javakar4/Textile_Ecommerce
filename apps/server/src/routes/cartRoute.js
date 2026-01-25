const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateToken = require('../middlewares/authenticator');

// Sync requires logged-in user
router.post('/sync', authenticateToken, cartController.syncCart);

// CRUD operations support both user (optional) and guest
router.post('/add', authenticateToken, cartController.addToCart);
router.get('/', authenticateToken, cartController.getCart);

router.route('/item')
.put(authenticateToken, cartController.updateItem)
.delete(authenticateToken, cartController.removeItem);

router.delete('/', authenticateToken, cartController.clearCart);     // Clear all

module.exports = router;
