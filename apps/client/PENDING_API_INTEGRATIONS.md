# ✅ Frontend API Integrations Checklist

This document tracks the integration status of all server endpoints into the client application.

## ✅ 1. Auth Module (`/api/v1/auth`)
- [x] `POST /signup` - Register account
- [x] `POST /login` - User login
- [x] `POST /verify-otp` - Verify OTP
- [x] `POST /resend-otp` - Resend OTP
- [x] `POST /forgot-password` - Initiate reset
- [x] `POST /reset-password` - Reset password

## ✅ 2. Product Module (`/api/products`)
- [x] `GET /` - Fetch all products
- [x] `GET /:id` - Fetch product details
- [x] `POST /` - **Admin:** Create product
- [x] `PUT /:id` - **Admin:** Update product
- [x] `DELETE /:id` - **Admin:** Delete product

## ✅ 3. Cart Module (`/api/cart`)
- [x] `GET /` - Fetch user's cart (URL Fix: Resolved)
- [x] `POST /add` - Add item to cart
- [x] `POST /sync` - Sync local cart
- [x] `PUT /item` - Update quantity
- [x] `DELETE /item` - Remove item
- [x] `DELETE /` - Clear cart

## ✅ 4. Profile Module (`/api/v1/profile`)
- [x] `GET /` - Get profile
- [x] `PUT /` - Update profile
- [x] `POST /address` - Add address
- [x] `DELETE /address/:id` - Remove address
- [x] `PUT /address/:id/default` - Set default address

## ✅ 5. Order Module (`/api/v1/orders`)
- [x] `POST /create` - Place order
- [x] `GET /` - List user orders
- [x] `GET /:orderId` - Get order details
- [x] `PATCH /payment` - **Admin:** Update payment status
- [x] `PATCH /tracking` - **Admin:** Update tracking status

## ✅ 6. Wishlist Module (`/api/v1/wishlist`)
- [x] `GET /` - Fetch wishlist
- [x] `POST /add` - Add item
- [x] `DELETE /remove/:productId` - Remove item
- [x] `DELETE /clear` - Clear wishlist

## ✅ 7. Brand Module (`/api/v1/brands`)
- [x] `GET /` - Fetch brands
- [x] `GET /:id` - Fetch brand details
- [x] `POST /` - **Admin:** Create brand
- [x] `PATCH /:id` - **Admin:** Update brand
- [x] `DELETE /:id` - **Admin:** Delete brand

## ✅ 8. Category Module (`/api/v1/categories`)
- [x] `GET /` - Fetch categories
- [x] `GET /:id` - Fetch category details
- [x] `POST /` - **Admin:** Create category
- [x] `PATCH /:id` - **Admin:** Update category
- [x] `DELETE /:id` - **Admin:** Delete category

---

## Summary (100% COMPLETED)
| Module | Total | Done | Pending |
|--------|-------|------|---------|
| Auth | 6 | 6 | 0 |
| Product| 5 | 5 | 0 |
| Cart | 6 | 6 | 0 |
| Profile| 5 | 5 | 0 |
| Order | 5 | 5 | 0 |
| Wishlist| 4 | 4 | 0 |
| Brand | 5 | 5 | 0 |
| Category| 5 | 5 | 0 |
| **Total**| **41**| **41**| **0** |

> [!NOTE]
> All services in `apps/client/src/services` have been updated to include these methods. Configuration mismatches in `constants.js` have also been resolved.

