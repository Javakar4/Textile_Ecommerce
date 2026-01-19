# Detailed Implementation Requirements

This document outlines the specific files, generic components, and services required for both Frontend (Client) and Backend (Server) development, categorized by feature.

---

## 1. Authentication & Users

### Frontend (Client)

- **Pages**:
  - `src/pages/auth/LoginPage.jsx`: User login view.
  - `src/pages/auth/RegisterPage.jsx`: User registration view.
  - `src/pages/profile/ProfilePage.jsx`: User profile view (view/edit details).
- **Components** (Main):
  - `src/components/auth/LoginForm.jsx`: Form handling login logic.
  - `src/components/auth/RegisterForm.jsx`: Form handling registration logic.
  - `src/components/auth/ProtectedRoute.jsx`: Wrapper to restrict access to authenticated routes.
- **Helper Components** (Reusable):
  - `src/components/common/InputGroup.jsx`: Label + Input + Error Message wrapper.
  - `src/components/common/Button.jsx`: Styled button with loading state support.
  - `src/components/common/Alert.jsx`: To display error/success messages.
- **State/Services**:
  - `src/context/AuthContext.jsx`: Context provider for global user state (`user`, `token`, `login`, `logout`).
  - `src/services/authService.js`: Axios functions (`loginAPI`, `registerAPI`, `updateProfileAPI`).

### Backend (Server)

- **Models**:
  - `src/models/User.js`: Mongoose schema (`name`, `email`, `password`, `isAdmin`, `createdAt`).
- **Controllers**:
  - `src/controllers/authController.js`:
    - `authUser`: Authenticate user & get token.
    - `registerUser`: Register a new user.
    - `getUserProfile`: Get user profile (private).
    - `updateUserProfile`: Update user profile (private).
- **Routes**:
  - `src/routes/authRoutes.js`: Endpoints (`/login`, `/register`, `/profile`).
- **Middleware**:
  - `src/middleware/authMiddleware.js`: JWT verification logic (`protect`).

---

## 2. Product Management

### Frontend (Client)

- **Pages**:
  - `src/pages/home/HomePage.jsx`: Landing page showing featured products.
  - `src/pages/products/ProductListPage.jsx`: Catalog page with filters.
  - `src/pages/products/ProductDetailPage.jsx`: Single product full details.
- **Components** (Main):
  - `src/components/products/ProductCard.jsx`: Thumbnail view of a product.
  - `src/components/products/ProductFilter.jsx`: Sidebar/Modal for filtering (Category, Price).
  - `src/components/products/Rating.jsx`: Star rating display component.
- **Helper Components**:
  - `src/components/common/Loader.jsx`: Spinner/Skeleton for loading states.
  - `src/components/common/Pagination.jsx`: Pagination controls.
- **State/Services**:
  - `src/services/productService.js`: Axios functions (`fetchProducts`, `fetchProductById`).

### Backend (Server)

- **Models**:
  - `src/models/Product.js`: Mongoose schema (`name`, `image`, `description`, `brand`, `category`, `price`, `countInStock`, `rating`, `numReviews`).
- **Controllers**:
  - `src/controllers/productController.js`:
    - `getProducts`: Fetch all products (with pagination/search).
    - `getProductById`: Fetch single product.
- **Routes**:
  - `src/routes/productRoutes.js`: Endpoints (`/api/products`, `/api/products/:id`).

---

## 3. Cart System

### Frontend (Client)

- **Pages**:
  - `src/pages/cart/CartPage.jsx`: View and manage cart items.
- **Components** (Main):
  - `src/components/cart/CartItem.jsx`: Row item in cart (Image, Name, Qty selector, Delete).
  - `src/components/cart/CartSummary.jsx`: Subtotal, Tax, Total calculation card.
- **Helper Components**:
  - `src/components/common/QuantitySelector.jsx`: +/- buttons or dropdown for quantity.
- **State/Services**:
  - `src/context/CartContext.jsx`: Context for cart state (`cartItems`, `addToCart`, `removeFromCart`).
  - (Optional) `src/services/cartService.js`: If syncing cart with backend logic is required immediately.

### Backend (Server)

- _Note: Cart can be client-side only (localStorage) initially, or stored in database._
- **Models**:
  - (Optional) `src/models/Cart.js`: If persistent cart is needed (`user`, `cartItems`).
- **Controllers** (If persistent):
  - `src/controllers/cartController.js`: `saveCart`, `getCart`.
- **Routes** (If persistent):
  - `src/routes/cartRoutes.js`: `/api/cart`.

---

## 4. Ordering & Checkout

### Frontend (Client)

- **Pages**:
  - `src/pages/checkout/ShippingPage.jsx`: Form for address.
  - `src/pages/checkout/PaymentPage.jsx`: Select payment method.
  - `src/pages/checkout/PlaceOrderPage.jsx`: Final review before submit.
  - `src/pages/order/OrderPage.jsx`: Order confirmation/status view.
- **Components** (Main):
  - `src/components/checkout/CheckoutSteps.jsx`: Progress bar (Login -> Shipping -> Payment -> Place Order).
  - `src/components/order/OrderHistory.jsx`: List of user's past orders.
- **State/Services**:
  - `src/services/orderService.js`: Axios functions (`createOrder`, `getOrderDetails`, `payOrder`, `getMyOrders`).

### Backend (Server)

- **Models**:
  - `src/models/Order.js`: Schema (`user`, `orderItems`, `shippingAddress`, `paymentMethod`, `paymentResult`, `taxPrice`, `shippingPrice`, `totalPrice`, `isPaid`, `isDelivered`).
- **Controllers**:
  - `src/controllers/orderController.js`:
    - `addOrderItems`: Create new order.
    - `getOrderById`: Get order details.
    - `updateOrderToPaid`: Update status after payment.
    - `getMyOrders`: Get logged-in user's orders.
- **Routes**:
  - `src/routes/orderRoutes.js`: Endpoints (`/api/orders`, `/api/orders/:id/pay`, `/api/orders/myorders`).

---

## 5. Payment Integration (e.g., Stripe/Braintree)

### Frontend (Client)

- **Components**:
  - `src/components/payment/PaymentForm.jsx`: The actual credit card entry form (e.g., using `CardElement` from Stripe).
  - OR `PayPalButton` if using PayPal.
- **Script/Provider**:
  - Integration wrapper (e.g., `<Elements>` provider for Stripe).
- **Services**:
  - `src/services/paymentService.js`: Function to fetch `clientId` or `clientSecret`.

### Backend (Server)

- **Configuration**:
  - `.env`: Store API keys (`STRIPE_SECRET_KEY`, `PAYPAL_CLIENT_ID`).
- **Controllers**:
  - `src/controllers/paymentController.js`:
    - `getConfig`: Send public key/client ID to frontend.
    - (For Stripe specific) `createPaymentIntent`: Create payment intent on server side.
- **Routes**:
  - `src/routes/configRoutes.js`: `/api/config/paypal` or `/api/config/stripe`.
