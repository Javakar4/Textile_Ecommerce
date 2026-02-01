# 🚧 Pending Frontend API Integrations

The following modules and endpoints are currently **unconnected** in the client application. They require `service` files and `constants` configuration to be integrated.

## 🔴 Totally Unconnected Modules

### 1. **Product Module**
**Base URL:** `/api/products` (Note: No `/v1`)
- `GET /` - Fetch all products (Catalog/Home)
- `GET /:id` - Fetch product details (Product Page)
- `POST /` - Create product (Admin/Vendor dashboard)
- `PUT /:id` - Update product (Admin/Vendor dashboard)
- `DELETE /:id` - Delete product (Admin/Vendor dashboard)

### 2. **Order Module**
**Base URL:** `/api/v1/orders`
- `POST /create` - Place a new order (Checkout)
- `GET /` - List user orders (Order History)
- `GET /:orderId` - Get order details
- `PATCH /payment` - Payment verification (Admin/Webhook)
- `PATCH /tracking` - Update shipping status (Admin)

### 3. **Wishlist Module**
**Base URL:** `/api/v1/wishlist`
- `GET /` - API to fetch user's wishlist
- `POST /add` - Add item to wishlist
- `DELETE /remove/:productId` - Remove item
- `DELETE /clear` - Clear all wishlist items

### 4. **Brand Module**
**Base URL:** `/api/v1/brands`
- `GET /` - Fetch brands (Filters/Home)
- `GET /:id` - Fetch brand details

### 5. **Category Module**
**Base URL:** `/api/v1/categories`
- `GET /` - Fetch categories (Navigation/Filters)
- `GET /:id` - Fetch category details

---

## ⚠️ Configuration Mismatches (Requires Fix)

### **Cart Module**
The Cart module is implemented in `apiCartService.js` and `constants.js`, **BUT** the URL configuration likely mismatches the server:
- **Server Route:** `/api/cart`
- **Frontend Config:** `/api/v1/cart`

**Action Required:** Update `apps/client/src/config/constants.js` to remove `/v1` from Cart endpoints to match the server.

---

## Summary of Work Needed
1.  **Create Services:** `productService.js`, `orderService.js`, `wishlistService.js`, `brandService.js`, `categoryService.js`.
2.  **Update Constants:** Add endpoints for the above modules to `apps/client/src/config/constants.js`.
3.  **Fix Cart:** Correct the Cart URL path.
