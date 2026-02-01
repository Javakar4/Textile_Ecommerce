# 📋 Server API Documentation

A complete list of all API endpoints organized by module.

---

## 1. Auth Module (`/api/v1/auth`)

| Method | Endpoint           | Function                                  |
| ------ | ------------------ | ----------------------------------------- |
| `POST` | `/signup`          | Register a new user account               |
| `POST` | `/login`           | User login with credentials               |
| `POST` | `/verify-otp`      | Verify OTP sent during registration/login |
| `POST` | `/resend-otp`      | Resend OTP if expired or not received     |
| `POST` | `/forgot-password` | Initiate password reset (sends email/OTP) |
| `POST` | `/reset-password`  | Reset password using token/OTP            |

---

## 2. Product Module (`/api/products`)

| Method   | Endpoint | Function                   |
| -------- | -------- | -------------------------- |
| `GET`    | `/`      | Get all products (public)  |
| `GET`    | `/:id`   | Get a single product by ID |
| `POST`   | `/`      | Create a new product       |
| `PUT`    | `/:id`   | Update an existing product |
| `DELETE` | `/:id`   | Delete a product           |

---

## 3. Cart Module (`/api/cart`)

🔒 _All routes require authentication_

| Method   | Endpoint | Function                                               |
| -------- | -------- | ------------------------------------------------------ |
| `GET`    | `/`      | Get user's cart                                        |
| `POST`   | `/add`   | Add item to cart                                       |
| `POST`   | `/sync`  | Sync local cart with server (for guest-to-login merge) |
| `PUT`    | `/item`  | Update cart item quantity                              |
| `DELETE` | `/item`  | Remove specific item from cart                         |
| `DELETE` | `/`      | Clear entire cart                                      |

---

## 4. Profile Module (`/api/v1/profile`)

🔒 _All routes require authentication_

| Method   | Endpoint               | Function                     |
| -------- | ---------------------- | ---------------------------- |
| `GET`    | `/`                    | Get logged-in user's profile |
| `PUT`    | `/`                    | Update user profile details  |
| `POST`   | `/address`             | Add a new address            |
| `DELETE` | `/address/:id`         | Remove an address            |
| `PUT`    | `/address/:id/default` | Set an address as default    |

---

## 5. Order Module (`/api/v1/orders`)

🔒 _All routes require authentication_

| Method  | Endpoint    | Function                                |
| ------- | ----------- | --------------------------------------- |
| `POST`  | `/create`   | Create a new order                      |
| `GET`   | `/`         | Get current user's orders               |
| `GET`   | `/:orderId` | Get specific order details by ID        |
| `PATCH` | `/payment`  | Update payment status (Admin)           |
| `PATCH` | `/tracking` | Update tracking/shipping status (Admin) |

---

## 6. Wishlist Module (`/api/v1/wishlist`)

🔒 _All routes require authentication_

| Method   | Endpoint             | Function                       |
| -------- | -------------------- | ------------------------------ |
| `GET`    | `/`                  | Get user's wishlist            |
| `POST`   | `/add`               | Add a product to wishlist      |
| `DELETE` | `/remove/:productId` | Remove a product from wishlist |
| `DELETE` | `/clear`             | Clear entire wishlist          |

---

## 7. Brand Module (`/api/v1/brands`)

| Method   | Endpoint | Function                    |
| -------- | -------- | --------------------------- |
| `GET`    | `/`      | Get all brands (public)     |
| `GET`    | `/:id`   | Get brand by ID (public)    |
| `POST`   | `/`      | Create a new brand 🔒       |
| `PATCH`  | `/:id`   | Update an existing brand 🔒 |
| `DELETE` | `/:id`   | Delete a brand 🔒           |

---

## 8. Category Module (`/api/v1/categories`)

| Method   | Endpoint | Function                       |
| -------- | -------- | ------------------------------ |
| `GET`    | `/`      | Get all categories (public)    |
| `GET`    | `/:id`   | Get category by ID (public)    |
| `POST`   | `/`      | Create a new category 🔒       |
| `PATCH`  | `/:id`   | Update an existing category 🔒 |
| `DELETE` | `/:id`   | Delete a category 🔒           |

---

## Legend

- 🔒 = Requires authentication (JWT token)
- **Public** = No authentication needed

---

## Summary

| Module    | Base Path            | Total Endpoints |
| --------- | -------------------- | --------------- |
| Auth      | `/api/v1/auth`       | 6               |
| Product   | `/api/products`      | 5               |
| Cart      | `/api/cart`          | 6               |
| Profile   | `/api/v1/profile`    | 5               |
| Order     | `/api/v1/orders`     | 5               |
| Wishlist  | `/api/v1/wishlist`   | 4               |
| Brand     | `/api/v1/brands`     | 5               |
| Category  | `/api/v1/categories` | 5               |
| **Total** |                      | **41**          |
