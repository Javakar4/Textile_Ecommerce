import Cart from "../models/CartSchema.js";

/**
 * Get or create cart for user
 */
export const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  return { ok: true, data: cart };
};


export const addToCart = async (userId, itemData) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  const {
    productId,
    productCode,
    name,
    category,
    image,
    pricing,
    size,
    quantity
  } = itemData;

  const existingItem = cart.items.find(
    (item) =>
      item.productId.toString() === productId &&
      item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      productCode,
      name,
      category,
      image,
      pricing,
      size,
      quantity
    });
  }

  await cart.save();
  return { ok: true };
};

export const updateItemQuantity = async (
  userId,
  productId,
  size,
  quantity
) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return { ok: false, message: "Cart not found" };

  const item = cart.items.find(
    (item) =>
      item.productId.toString() === productId &&
      item.size === size
  );

  if (!item) {
    return { ok: false, message: "Item not found in cart" };
  }

  if (quantity <= 0) {
    // auto remove item
    cart.items = cart.items.filter(
      (i) =>
        !(
          i.productId.toString() === productId &&
          i.size === size
        )
    );
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  return { ok: true };
};


export const removeItem = async (userId, productId, size) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return { ok: false, message: "Cart not found" };

  cart.items = cart.items.filter(
    (item) =>
      !(
        item.productId.toString() === productId &&
        item.size === size
      )
  );

  await cart.save();
  return { ok: true };
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (cart) {
    cart.items = [];
    await cart.save();
  }

  return { ok: true };
};

export const syncGuestCart = async (userId, guestItems = []) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  for (const gItem of guestItems) {
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === gItem.productId &&
        item.size === gItem.size
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
