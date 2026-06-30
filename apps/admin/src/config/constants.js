export const API_ENDPOINTS = {
  LOGIN: '/v1/auth/login',
  USERS: '/v1/auth/admin/users',
  ORDERS_ADMIN: '/v1/orders/admin/all',
  ORDERS: '/v1/orders',
  PRODUCTS: '/v1/products',
  CATEGORIES: '/v1/categories',
  SETTINGS: '/v1/settings',
};



export const AUTH_CONSTANTS = {

  BRAND_QUOTE : "Intertwining elite digital patterns with secure order queues. The master terminal for managing e-commerce threads.",
  ADMIN_FEATURES : [
    { title: "Weaving Secure Operations", desc: "Role-based administrative gating protecting the fabric of commerce." },
    { title: "Patterning Organic Growth", desc: "Trace order queues, fabric sales, and thread inventories in real-time." },
    { title: "Seamless Catalog Controls", desc: "Oversee bulk yarn listings, client accounts, and fulfillment parameters." }
  ],
}




const MOCK_IMAGES = {
  silk: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80",
  velvet: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=300&q=80",
  cotton: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80",
  brocade: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=300&q=80"
};

export const CAT_CONSTANTS = {
  MOCK_IMAGES,

  INITIAL_CATEGORIES: [
    { _id: "cat-1", name: "Premium Silk", slug: "premium-silk", parentId: null, image: MOCK_IMAGES.silk, isActive: true },
    { _id: "cat-2", name: "Luxury Velvet", slug: "luxury-velvet", parentId: null, image: MOCK_IMAGES.velvet, isActive: true },
    { _id: "cat-3", name: "Organic Cotton", slug: "organic-cotton", parentId: null, image: MOCK_IMAGES.cotton, isActive: true },
    { _id: "cat-4", name: "Silk Brocades", slug: "silk-brocades", parentId: "cat-1", image: MOCK_IMAGES.brocade, isActive: true },
    { _id: "cat-5", name: "Cotton Blends", slug: "cotton-blends", parentId: "cat-3", image: MOCK_IMAGES.cotton, isActive: false }
  ],

  INITIAL_PRODUCTS: [
    {
      _id: "prod-1",
      productId: "PROD-001",
      sku: "SILK-MUL-001",
      name: "Mulberry Silk Bolt",
      categoryId: "cat-1",
      pricing: { current: 120, original: 150, discount: 20 },
      stock: { available: true, quantity: 45 },
      material: "100% Mulberry Silk",
      description: ["Woven from pure mulberry silkworm cocoons.", "Ultra-smooth texture with high natural luster.", "Perfect for premium couture dressmaking."],
      image: MOCK_IMAGES.silk
    },
    {
      _id: "prod-2",
      productId: "PROD-002",
      sku: "VEL-EME-002",
      name: "Emerald Green Velvet",
      categoryId: "cat-2",
      pricing: { current: 180, original: 220, discount: 18 },
      stock: { available: true, quantity: 25 },
      material: "Silk-blend Velvet",
      description: ["Deep pile velvet woven with rich emerald hues.", "Heavy drape, ideal for upholstery and curtains.", "Gold thread backing adds subtle shimmer."],
      image: MOCK_IMAGES.velvet
    },
    {
      _id: "prod-3",
      productId: "PROD-003",
      sku: "COT-EGY-003",
      name: "Egyptian Giza Cotton Roll",
      categoryId: "cat-3",
      pricing: { current: 45, original: 45, discount: 0 },
      stock: { available: true, quantity: 120 },
      material: "Long-staple Egyptian Cotton",
      description: ["Long-staple fibers ensuring extreme durability.", "Breathable, lightweight weave suited for shirting.", "Mercerized finish for silk-like sheen."],
      image: MOCK_IMAGES.cotton
    },
    {
      _id: "prod-4",
      productId: "PROD-004",
      sku: "SILK-GLD-004",
      name: "Golden Weave Brocade",
      categoryId: "cat-4",
      pricing: { current: 250, original: 300, discount: 16 },
      stock: { available: false, quantity: 0 },
      material: "Silk & Metallic Yarn Blend",
      description: ["Ornate patterns crafted on historical jacquard looms.", "Stiff body with intricate golden detailing.", "Reserved for elite wedding and bridal collections."],
      image: MOCK_IMAGES.brocade
    }
  ],
}