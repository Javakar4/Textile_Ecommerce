import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "../config/config.js";
import connectDB from "../db.js";

// Models
import User from "../models/UserSchema.js";
import Brand from "../models/BrandSchema.js";
import Category from "../models/CategorySchema.js";
import Product from "../models/ProductSchema.js";
import Address from "../models/AddressSchema.js";
import Order from "../models/OrderSchema.js";
import Cart from "../models/CartSchema.js";
import Wishlist from "../models/WishListSchema.js";
import Payment from "../models/PaymentSchema.js";
import verifySeed from "./verifySeed.js";


const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await Promise.all([
      User.deleteMany(),
      Brand.deleteMany(),
      Category.deleteMany(),
      Product.deleteMany(),
      Address.deleteMany(),
      Order.deleteMany(),
      Cart.deleteMany(),
      Wishlist.deleteMany(),
      Payment.deleteMany(),
    ]);

    console.log("👥 Seeding Users...");
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("password123", salt);

    const users = await User.insertMany([
      {
        email: "admin@example.com",
        username: "admin",
        passwordHash,
        fullName: "System Admin",
        role: "admin",
        isEmailVerified: true,
      },
      {
        email: "user@example.com",
        username: "johndoe",
        passwordHash,
        fullName: "John Doe",
        role: "user",
        isEmailVerified: true,
      },
    ]);

    const adminUser = users[0];
    const regularUser = users[1];

    console.log("🏷️ Seeding Brands...");
    const brands = await Brand.insertMany([
      { name: "Cotton World", slug: "cotton-world", description: "Premium cotton fabrics" },
      { name: "Silk Route", slug: "silk-route", description: "Authentic silk materials" },
      { name: "Linen Life", slug: "linen-life", description: "Sustainable linen clothing" },
    ]);

    console.log("📂 Seeding Categories...");
    
    const parentCategories = await Category.insertMany([
      { name: "Men's Collection", slug: "MC" },
      { name: "Kid's Collection", slug: "KC" },
    ]);

    const menCat = parentCategories[0];
    const kidsCat = parentCategories[1];

    const subCategories = await Category.insertMany([
      // Men's categories
      { name: "Formal Shirts", slug: "men-formal-shirts", parentId: menCat._id },
      { name: "Casual Shirts", slug: "men-casual-shirts", parentId: menCat._id },
      { name: "Trousers", slug: "men-trousers", parentId: menCat._id },
      // Kid's categories
      { name: "Boys Wear", slug: "kids-boys-wear", parentId: kidsCat._id },
      { name: "Girls Wear", slug: "kids-girls-wear", parentId: kidsCat._id },
      { name: "Baby Care", slug: "kids-baby-care", parentId: kidsCat._id },
    ]);

    console.log("👕 Generating Products...");
    
    const colors = ["#D4A373", "#F5F5DC", "#8B5E3C", "#2C3E50", "#E74C3C", "#27AE60"];
    const materials = ["100% Cotton", "Pure Silk", "Sustainable Linen", "Organic Cotton", "Blend Fabric"];
    
    const generateProducts = (catId, prefix, count, brandIds) => {
      const products = [];
      for (let i = 1; i <= count; i++) {
        const basePrice = 500 + Math.floor(Math.random() * 2000);
        const discount = Math.random() > 0.5 ? 10 + Math.floor(Math.random() * 40) : 0;
        const currentPrice = Math.floor(basePrice * (1 - discount / 100));
        
        products.push({
          productId: `${prefix}-${String(i).padStart(3, '0')}`,
          sku: `${prefix}-SKU-${String(i).padStart(3, '0')}`,
          name: `${prefix} Item ${i}`,
          brandId: brandIds[Math.floor(Math.random() * brandIds.length)],
          categoryId: catId,
          pricing: {
            current: currentPrice,
            original: basePrice,
            discount: discount
          },
          stock: {
            available: true,
            quantity: 10 + Math.floor(Math.random() * 100)
          },
          images: {
            main: `https://placehold.co/600x800?text=${prefix}+Item+${i}`,
            thumbnails: [`https://placehold.co/600x800?text=${prefix}+Thumb+${i}`]
          },
          sizes: ["S", "M", "L", "XL", "XXL"],
          defaultSize: "M",
          material: materials[Math.floor(Math.random() * materials.length)],
          description: [
            "High quality material and craftmanship.",
            "Designed for comfort and style.",
            "Perfect for all seasons and occasions."
          ],
          rating: {
            score: 3.5 + (Math.random() * 1.5),
            count: 5 + Math.floor(Math.random() * 100)
          },
          tags: ["New Arrival", "Bestseller", prefix.toLowerCase()]
        });
      }
      return products;
    };

    const brandIds = brands.map(b => b._id);
    const allProductsData = [];

    subCategories.forEach((cat, index) => {
      const prefix = cat.slug.toUpperCase();
      allProductsData.push(...generateProducts(cat._id, prefix, 20, brandIds));
    });

    const products = await Product.insertMany(allProductsData);
    console.log(`✅ Seeded ${products.length} products!`);

    console.log("📍 Seeding Addresses...");
    const address = await Address.create({
      userId: regularUser._id,
      name: "John Doe",
      phone: "9876543210",
      address: "123, Textile Market",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    });

    console.log("📦 Seeding Orders...");
    const order = await Order.create({
      orderId: 1001,
      userId: regularUser._id,
      items: [
        {
          productId: products[0]._id,
          productCode: products[0].productId,
          name: products[0].name,
          category: "Men's Collection",
          pricing: products[0].pricing,
          quantity: 1,
          size: "M",
          image: products[0].images.main,
        },
      ],
      total: 1200,
      paymentMethod: "Online",
      paymentStatus: "Pending",
      trackingStatus: "Ordered",
      shippingAddress: {
        name: address.name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        pincode: address.pincode,
      },
    });

    console.log("🛒 Seeding Cart...");
    await Cart.create({
      userId: regularUser._id,
      items: [
        {
          productId: products[1]._id,
          productCode: products[1].productId,
          name: products[1].name,
          category: "Kid's Collection",
          image: products[1].images.main,
          pricing: {
            current: 599,
            original: 899,
            discount: 300,
            savings: 300,
          },
          size: "4-5Y",
          quantity: 1,
        },
      ],
    });

    console.log("❤️ Seeding Wishlist...");
    await Wishlist.create({
      userId: regularUser._id,
      products: [{ productId: products[0]._id }],
    });

    console.log("✅ Seeding completed successfully!");
    
    // Run verification
    const verificationSuccess = await verifySeed();
    
    if (verificationSuccess) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
