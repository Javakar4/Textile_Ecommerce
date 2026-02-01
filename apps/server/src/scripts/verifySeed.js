import User from "../models/UserSchema.js";
import Brand from "../models/BrandSchema.js";
import Category from "../models/CategorySchema.js";
import Product from "../models/ProductSchema.js";
import Address from "../models/AddressSchema.js";
import Order from "../models/OrderSchema.js";
import Cart from "../models/CartSchema.js";
import Wishlist from "../models/WishListSchema.js";

const verifySeed = async () => {
  console.log("\n🔍 Verifying Seeded Data...");
  
  const results = [];
  
  const check = async (name, model, expectedMin = 1) => {
    try {
      const count = await model.countDocuments();
      const status = count >= expectedMin ? "✅" : "❌";
      results.push({ Collection: name, Count: count, Status: status });
    } catch (error) {
      results.push({ Collection: name, Count: "Error", Status: "❌ " + error.message });
    }
  };

  await Promise.all([
    check("Users", User, 2),
    check("Brands", Brand, 3),
    check("Categories", Category, 6),
    check("Products", Product, 2),
    check("Addresses", Address, 1),
    check("Orders", Order, 1),
    check("Carts", Cart, 1),
    check("Wishlists", Wishlist, 1),
  ]);

  console.table(results);

  const failures = results.filter(r => r.Status.startsWith("❌"));
  if (failures.length > 0) {
    console.log(`\n⚠️  Verification finished with ${failures.length} failures.`);
    return false;
  } else {
    console.log("\n✨ All data verified successfully!");
    return true;
  }
};

export default verifySeed;
