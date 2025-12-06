import { FaTshirt, FaCouch, FaIndustry, FaPalette, FaArrowRight } from "react-icons/fa";
import { ChevronRight, ShoppingCart, Heart, Truck, RotateCcw, Shield, Plus, Minus } from "lucide-react";



import profileIcon from './profile-icon.png'
import heroImage1 from './pic1.jpg'
import heroImage2 from './pic2.jpg'
import heroImage3 from './pic3.jpg'
import heroImage4 from './pic4.jpg'




// Categories.....
const categories = [
    {
        icon: FaTshirt,
        color: "from-amber-600 to-amber-800",
        title: "Apparel Fabrics",
        items: "2,450+ Items"
    },
    {
        icon: FaCouch,
        color: "from-stone-600 to-stone-800",
        title: "Home Textiles",
        items: "1,890+ Items"
    },
    {
        icon: FaIndustry,
        color: "from-stone-600 to-stone-800",
        title: "Home Textiles",
        items: "1,890+ Items"
    },
    {
        icon: FaPalette,
        color: "from-stone-600 to-stone-800",
        title: "Home Textiles",
        items: "1,890+ Items"
    },
    {
        icon: FaPalette,
        color: "from-stone-600 to-stone-800",
        title: "Home Textiles",
        items: "1,890+ Items"
    },
    {
        icon: FaPalette,
        color: "from-stone-600 to-stone-800",
        title: "Home Textiles",
        items: "1,890+ Items"
    },
];

// Testimonials
const testimonials = [
    {
        text: "The quality of fabrics is exceptional! I've been ordering from Luxe Textiles for over 3 years and they never disappoint. The customer service is outstanding too.",
        name: "Michael Chen",
        role: "Fashion Designer",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
        text: "Perfect for my home decor business. The variety of patterns and textures is amazing. Delivery is always on time and the fabrics arrive in perfect condition.",
        name: "Sarah Johnson",
        role: "Interior Designer",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
        text: "As a boutique owner, I need reliable suppliers. Luxe Textiles has been my go-to for premium fabrics. Their men's collection is particularly impressive!",
        name: "David Martinez",
        role: "Boutique Owner",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
        text: "The kids' collection is fantastic! Safe, soft, and vibrant colors. My children love their new clothes made from these fabrics. Highly recommend!",
        name: "Emily Rodriguez",
        role: "Parent & Blogger",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
];

// ScrollingCard
const scrollingCard = [
    {
        title: "Streetwear Essentials",
        desc: "Bold looks designed for modern men.",
        image: "https://images.unsplash.com/photo-1543487945-139a97f387d5?w=1200&auto=format&fit=crop&q=60"
    },
    {
        title: "Urban Classics",
        desc: "Premium everyday outfits.",
        image: "https://images.unsplash.com/photo-1529254479751-faeedc59e78f?w=1200&auto=format&fit=crop&q=60"
    },
    {
        title: "Work & Formal",
        desc: "Sharp, confident, professional fits.",
        image: "https://images.unsplash.com/photo-1618327907215-4e514efabd41?w=1200&auto=format&fit=crop&q=60"
    },
    {
        title: "Casual Comfort",
        desc: "Soft and stylish daily wear.",
        image: "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=1200&auto=format&fit=crop&q=60"
    }
];



// Product-Card
const product = {
    id: "FAB002",
    name: "Classic Pure Cotton Printed Fabric",
    image: "/images/fabric-sample.jpg",
    material: "100% Pure Cotton",
    price: 549,
    originalPrice: 799,
    discount: 31,
    colors: ["#D4A373", "#F5F5DC", "#8B5E3C"],
    category: "Handblock Printed Cotton",
    gsm: 160,
    fabricCare: "Gentle Machine Wash",
    inStock: true
};


// Product Details
const productData = [
    {
    id: "PRD-2024-001",
    sku: "WH-PRO-2024-BLK",
    name: "Premium Wireless Headphones",
    brand: {
        name: "AudioTech",
        url: "#"
    },
    category: "Electronics",
    pricing: {
        current: 199.99,
        original: 299.99,
        discount: 33,
        savings: 100.00
    },
    rating: {
        score: 4.5,
        count: 248
    },
    stock: {
        available: true,
        label: "In Stock"
    },
    badges: ["Featured"],
    images: {
        main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
        ]
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    material: "Premium Leather & Aluminum",
    description: [
        "Experience premium audio quality with our flagship wireless headphones. Engineered with advanced noise-cancellation technology and premium materials.",
        "The ergonomic design features memory foam ear cushions wrapped in genuine leather for exceptional comfort.",
        "With up to 30 hours of battery life, Bluetooth 5.0 connectivity, and intuitive touch controls, these headphones are the perfect companion."
    ],
    features: [
        { icon: Truck, label: "Free Shipping" },
        { icon: RotateCcw, label: "30-Day Returns" },
        { icon: Shield, label: "2-Year Warranty" }
    ],
    specifications: {
        category: "Electronics",
        brand: "AudioTech",
        material: "Leather & Aluminum",
        sizes: "S, M, L, XL, XXL",
        productId: "PRD-2024-001"
    },
    collections: ["Premium Audio", "Best Sellers", "New Arrivals"],
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium', 'over-ear', 'long-battery'],
    breadcrumb: [
        { label: "Home", url: "#" },
        { label: "Electronics", url: "#" },
        { label: "Premium Wireless Headphones", url: null }
    ],
    offer: {
        title: "Limited Time Offer!",
        description: "Get 33% off on this featured product. Don't miss out!",
        ctaText: "Shop Now"
    }
},
    {
    id: "PRD-2024-002",
    sku: "WH-PRO-2024-BLK",
    name: "Premium Wireless Headphones",
    brand: {
        name: "AudioTech",
        url: "#"
    },
    category: "Electronics",
    pricing: {
        current: 199.99,
        original: 299.99,
        discount: 33,
        savings: 100.00
    },
    rating: {
        score: 4.5,
        count: 248
    },
    stock: {
        available: true,
        label: "In Stock"
    },
    badges: ["Featured"],
    images: {
        main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
        ]
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    material: "Premium Leather & Aluminum",
    description: [
        "Experience premium audio quality with our flagship wireless headphones. Engineered with advanced noise-cancellation technology and premium materials.",
        "The ergonomic design features memory foam ear cushions wrapped in genuine leather for exceptional comfort.",
        "With up to 30 hours of battery life, Bluetooth 5.0 connectivity, and intuitive touch controls, these headphones are the perfect companion."
    ],
    features: [
        { icon: Truck, label: "Free Shipping" },
        { icon: RotateCcw, label: "30-Day Returns" },
        { icon: Shield, label: "2-Year Warranty" }
    ],
    specifications: {
        category: "Electronics",
        brand: "AudioTech",
        material: "Leather & Aluminum",
        sizes: "S, M, L, XL, XXL",
        productId: "PRD-2024-001"
    },
    collections: ["Premium Audio", "Best Sellers", "New Arrivals"],
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium', 'over-ear', 'long-battery'],
    breadcrumb: [
        { label: "Home", url: "#" },
        { label: "Electronics", url: "#" },
        { label: "Premium Wireless Headphones", url: null }
    ],
    offer: {
        title: "Limited Time Offer!",
        description: "Get 33% off on this featured product. Don't miss out!",
        ctaText: "Shop Now"
    }
},
    {
    id: "PRD-2024-003",
    sku: "WH-PRO-2024-BLK",
    name: "Premium Wireless Headphones",
    brand: {
        name: "AudioTech",
        url: "#"
    },
    category: "Electronics",
    pricing: {
        current: 199.99,
        original: 299.99,
        discount: 33,
        savings: 100.00
    },
    rating: {
        score: 4.5,
        count: 248
    },
    stock: {
        available: true,
        label: "In Stock"
    },
    badges: ["Featured"],
    images: {
        main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
        ]
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    material: "Premium Leather & Aluminum",
    description: [
        "Experience premium audio quality with our flagship wireless headphones. Engineered with advanced noise-cancellation technology and premium materials.",
        "The ergonomic design features memory foam ear cushions wrapped in genuine leather for exceptional comfort.",
        "With up to 30 hours of battery life, Bluetooth 5.0 connectivity, and intuitive touch controls, these headphones are the perfect companion."
    ],
    features: [
        { icon: Truck, label: "Free Shipping" },
        { icon: RotateCcw, label: "30-Day Returns" },
        { icon: Shield, label: "2-Year Warranty" }
    ],
    specifications: {
        category: "Electronics",
        brand: "AudioTech",
        material: "Leather & Aluminum",
        sizes: "S, M, L, XL, XXL",
        productId: "PRD-2024-001"
    },
    collections: ["Premium Audio", "Best Sellers", "New Arrivals"],
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium', 'over-ear', 'long-battery'],
    breadcrumb: [
        { label: "Home", url: "#" },
        { label: "Electronics", url: "#" },
        { label: "Premium Wireless Headphones", url: null }
    ],
    offer: {
        title: "Limited Time Offer!",
        description: "Get 33% off on this featured product. Don't miss out!",
        ctaText: "Shop Now"
    }
},
    {
    id: "PRD-2024-004",
    sku: "WH-PRO-2024-BLK",
    name: "Premium Wireless Headphones",
    brand: {
        name: "AudioTech",
        url: "#"
    },
    category: "Electronics",
    pricing: {
        current: 199.99,
        original: 299.99,
        discount: 33,
        savings: 100.00
    },
    rating: {
        score: 4.5,
        count: 248
    },
    stock: {
        available: true,
        label: "In Stock"
    },
    badges: ["Featured"],
    images: {
        main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
        ]
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    material: "Premium Leather & Aluminum",
    description: [
        "Experience premium audio quality with our flagship wireless headphones. Engineered with advanced noise-cancellation technology and premium materials.",
        "The ergonomic design features memory foam ear cushions wrapped in genuine leather for exceptional comfort.",
        "With up to 30 hours of battery life, Bluetooth 5.0 connectivity, and intuitive touch controls, these headphones are the perfect companion."
    ],
    features: [
        { icon: Truck, label: "Free Shipping" },
        { icon: RotateCcw, label: "30-Day Returns" },
        { icon: Shield, label: "2-Year Warranty" }
    ],
    specifications: {
        category: "Electronics",
        brand: "AudioTech",
        material: "Leather & Aluminum",
        sizes: "S, M, L, XL, XXL",
        productId: "PRD-2024-001"
    },
    collections: ["Premium Audio", "Best Sellers", "New Arrivals"],
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium', 'over-ear', 'long-battery'],
    breadcrumb: [
        { label: "Home", url: "#" },
        { label: "Electronics", url: "#" },
        { label: "Premium Wireless Headphones", url: null }
    ],
    offer: {
        title: "Limited Time Offer!",
        description: "Get 33% off on this featured product. Don't miss out!",
        ctaText: "Shop Now"
    }
},
    {
    id: "PRD-2024-005",
    sku: "WH-PRO-2024-BLK",
    name: "Premium Wireless Headphones",
    brand: {
        name: "AudioTech",
        url: "#"
    },
    category: "Electronics",
    pricing: {
        current: 199.99,
        original: 299.99,
        discount: 33,
        savings: 100.00
    },
    rating: {
        score: 4.5,
        count: 248
    },
    stock: {
        available: true,
        label: "In Stock"
    },
    badges: ["Featured"],
    images: {
        main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
        ]
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    material: "Premium Leather & Aluminum",
    description: [
        "Experience premium audio quality with our flagship wireless headphones. Engineered with advanced noise-cancellation technology and premium materials.",
        "The ergonomic design features memory foam ear cushions wrapped in genuine leather for exceptional comfort.",
        "With up to 30 hours of battery life, Bluetooth 5.0 connectivity, and intuitive touch controls, these headphones are the perfect companion."
    ],
    features: [
        { icon: Truck, label: "Free Shipping" },
        { icon: RotateCcw, label: "30-Day Returns" },
        { icon: Shield, label: "2-Year Warranty" }
    ],
    specifications: {
        category: "Electronics",
        brand: "AudioTech",
        material: "Leather & Aluminum",
        sizes: "S, M, L, XL, XXL",
        productId: "PRD-2024-001"
    },
    collections: ["Premium Audio", "Best Sellers", "New Arrivals"],
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium', 'over-ear', 'long-battery'],
    breadcrumb: [
        { label: "Home", url: "#" },
        { label: "Electronics", url: "#" },
        { label: "Premium Wireless Headphones", url: null }
    ],
    offer: {
        title: "Limited Time Offer!",
        description: "Get 33% off on this featured product. Don't miss out!",
        ctaText: "Shop Now"
    }
},
    {
    id: "PRD-2024-006",
    sku: "WH-PRO-2024-BLK",
    name: "Premium Wireless Headphones",
    brand: {
        name: "AudioTech",
        url: "#"
    },
    category: "Electronics",
    pricing: {
        current: 199.99,
        original: 299.99,
        discount: 33,
        savings: 100.00
    },
    rating: {
        score: 4.5,
        count: 248
    },
    stock: {
        available: true,
        label: "In Stock"
    },
    badges: ["Featured"],
    images: {
        main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
        ]
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    material: "Premium Leather & Aluminum",
    description: [
        "Experience premium audio quality with our flagship wireless headphones. Engineered with advanced noise-cancellation technology and premium materials.",
        "The ergonomic design features memory foam ear cushions wrapped in genuine leather for exceptional comfort.",
        "With up to 30 hours of battery life, Bluetooth 5.0 connectivity, and intuitive touch controls, these headphones are the perfect companion."
    ],
    features: [
        { icon: Truck, label: "Free Shipping" },
        { icon: RotateCcw, label: "30-Day Returns" },
        { icon: Shield, label: "2-Year Warranty" }
    ],
    specifications: {
        category: "Electronics",
        brand: "AudioTech",
        material: "Leather & Aluminum",
        sizes: "S, M, L, XL, XXL",
        productId: "PRD-2024-001"
    },
    collections: ["Premium Audio", "Best Sellers", "New Arrivals"],
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium', 'over-ear', 'long-battery'],
    breadcrumb: [
        { label: "Home", url: "#" },
        { label: "Electronics", url: "#" },
        { label: "Premium Wireless Headphones", url: null }
    ],
    offer: {
        title: "Limited Time Offer!",
        description: "Get 33% off on this featured product. Don't miss out!",
        ctaText: "Shop Now"
    }
},
    {
    id: "PRD-2024-007",
    sku: "WH-PRO-2024-BLK",
    name: "Premium Wireless Headphones",
    brand: {
        name: "AudioTech",
        url: "#"
    },
    category: "Electronics",
    pricing: {
        current: 199.99,
        original: 299.99,
        discount: 33,
        savings: 100.00
    },
    rating: {
        score: 4.5,
        count: 248
    },
    stock: {
        available: true,
        label: "In Stock"
    },
    badges: ["Featured"],
    images: {
        main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
        ]
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    material: "Premium Leather & Aluminum",
    description: [
        "Experience premium audio quality with our flagship wireless headphones. Engineered with advanced noise-cancellation technology and premium materials.",
        "The ergonomic design features memory foam ear cushions wrapped in genuine leather for exceptional comfort.",
        "With up to 30 hours of battery life, Bluetooth 5.0 connectivity, and intuitive touch controls, these headphones are the perfect companion."
    ],
    features: [
        { icon: Truck, label: "Free Shipping" },
        { icon: RotateCcw, label: "30-Day Returns" },
        { icon: Shield, label: "2-Year Warranty" }
    ],
    specifications: {
        category: "Electronics",
        brand: "AudioTech",
        material: "Leather & Aluminum",
        sizes: "S, M, L, XL, XXL",
        productId: "PRD-2024-001"
    },
    collections: ["Premium Audio", "Best Sellers", "New Arrivals"],
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium', 'over-ear', 'long-battery'],
    breadcrumb: [
        { label: "Home", url: "#" },
        { label: "Electronics", url: "#" },
        { label: "Premium Wireless Headphones", url: null }
    ],
    offer: {
        title: "Limited Time Offer!",
        description: "Get 33% off on this featured product. Don't miss out!",
        ctaText: "Shop Now"
    }
},
    {
    id: "PRD-2024-008",
    sku: "WH-PRO-2024-BLK",
    name: "Premium Wireless Headphones",
    brand: {
        name: "AudioTech",
        url: "#"
    },
    category: "Electronics",
    pricing: {
        current: 199.99,
        original: 299.99,
        discount: 33,
        savings: 100.00
    },
    rating: {
        score: 4.5,
        count: 248
    },
    stock: {
        available: true,
        label: "In Stock"
    },
    badges: ["Featured"],
    images: {
        main: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=200&h=200&fit=crop",
        ]
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    material: "Premium Leather & Aluminum",
    description: [
        "Experience premium audio quality with our flagship wireless headphones. Engineered with advanced noise-cancellation technology and premium materials.",
        "The ergonomic design features memory foam ear cushions wrapped in genuine leather for exceptional comfort.",
        "With up to 30 hours of battery life, Bluetooth 5.0 connectivity, and intuitive touch controls, these headphones are the perfect companion."
    ],
    features: [
        { icon: Truck, label: "Free Shipping" },
        { icon: RotateCcw, label: "30-Day Returns" },
        { icon: Shield, label: "2-Year Warranty" }
    ],
    specifications: {
        category: "Electronics",
        brand: "AudioTech",
        material: "Leather & Aluminum",
        sizes: "S, M, L, XL, XXL",
        productId: "PRD-2024-001"
    },
    collections: ["Premium Audio", "Best Sellers", "New Arrivals"],
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium', 'over-ear', 'long-battery'],
    breadcrumb: [
        { label: "Home", url: "#" },
        { label: "Electronics", url: "#" },
        { label: "Premium Wireless Headphones", url: null }
    ],
    offer: {
        title: "Limited Time Offer!",
        description: "Get 33% off on this featured product. Don't miss out!",
        ctaText: "Shop Now"
    }
},
];






export default {
    profileIcon,
    heroImage1,
    heroImage2,
    heroImage3,
    heroImage4,
    categories,
    testimonials,
    scrollingCard,
    product,
    productData,
}