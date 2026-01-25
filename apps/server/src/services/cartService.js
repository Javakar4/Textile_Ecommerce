import Cart from "../models/CartSchema.js";

/**
 * Get or create a cart for a user.
 */
export const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return { ok: true, data: cart.items };
};

/**
 * Add an item to the user's cart.
 */
export const addToCart = async (userId, itemData) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  const { productId, quantity, price, size, color, name, image } = itemData;

  const existingItemIndex = cart.items.findIndex(
    (item) =>
      item.productId.toString() === productId &&
      item.size === size &&
      item.color === color,
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      price,
      size,
      color,
      name,
      image,
    });
  }

  await cart.save();
  return { ok: true };
};

/**
 * Update the quantity of an item in the cart.
 */
export const updateItemQuantity = async (
  userId,
  productId,
  quantity,
  size,
  color,
) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return { ok: false, message: "Cart not found" };

  const itemIndex = cart.items.findIndex(
    (item) =>
      item.productId.toString() === productId &&
      (!size || item.size === size) &&
      (!color || item.color === color),
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    return { ok: true };
  }

  return { ok: false, message: "Item not found in cart" };
};

/**
 * Remove an item from the cart.
 */
export const removeItem = async (userId, productId, size, color) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return { ok: false, message: "Cart not found" };

  cart.items = cart.items.filter(
    (item) =>
      !(
        item.productId.toString() === productId &&
        (!size || item.size === size) &&
        (!color || item.color === color)
      ),
  );

  await cart.save();
  return { ok: true };
};

/**
 * Clear the user's cart.
 */
export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  return { ok: true };
};

/**
 * Sync guest cart items to user cart (simplified replacement for SQL sync).
 */
export const syncGuestCart = async (userId, guestItems) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  // Logic to merge guestItems into cart.items
  // For now, just adding them if they don't exist
  for (const gItem of guestItems) {
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === gItem.productId &&
        item.size === gItem.size &&
        item.color === gItem.color,
    );
    if (existingItem) {
      existingItem.quantity += gItem.quantity;
    } else {
      cart.items.push(gItem);
    }
  }

  await cart.save();
  return { ok: true };
};
