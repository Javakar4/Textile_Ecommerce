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




// Product-Card
// const product = {
//     id: "FAB002",
//     name: "Classic Pure Cotton Printed Fabric",
//     image: "/images/fabric-sample.jpg",
//     material: "100% Pure Cotton",
//     price: 549,
//     originalPrice: 799,
//     discount: 31,
//     colors: ["#D4A373", "#F5F5DC", "#8B5E3C"],
//     category: "Handblock Printed Cotton",
//     gsm: 160,
//     fabricCare: "Gentle Machine Wash",
//     inStock: true
// };


// Product Details
const productData = [
    {
        id: "PRD-2024-201",
        sku: "MN-BLZ-2024-NVY",
        name: "Slim Fit Blazer Jacket",
        brand: {
            name: "Executive Style",
            url: "#"
        },
        category: "MC",
        pricing: {
            current: 149.99,
            original: 229.99,
            discount: 35,
            savings: 80.00
        },
        rating: {
            score: 4.6,
            count: 412
        },
        stock: {
            available: true,
            label: "In Stock"
        },
        badges: ["Best Seller"],
        images: {
            main: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=800&fit=crop",
            thumbnails: [
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1593030668990-a9c29f7c8d04?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop"
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "L",
        material: "Premium Wool Blend",
        description: [
            "Elevate your professional wardrobe with this sophisticated slim fit blazer. Perfect for business meetings, interviews, or formal events.",
            "Crafted from premium wool blend fabric with a modern slim fit silhouette that's tailored to perfection.",
            "Features notch lapels, two-button closure, functional sleeve buttons, and interior pockets for a refined finish."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: {
            category: "Men's Fashion",
            brand: "Executive Style",
            material: "Wool Blend",
            sizes: "S, M, L, XL, XXL",
            productId: "PRD-2024-201"
        },
        collections: ["Business Wear", "Best Sellers", "Formal Collection"],
        tags: ['blazer', 'formal', 'business', 'slim-fit', 'wool', 'professional'],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Fashion", url: "#" },
            { label: "Slim Fit Blazer Jacket", url: null }
        ],
        offer: {
            title: "Professional Style!",
            description: "Save 35% on premium blazers. Look sharp every day!",
            ctaText: "Shop Now"
        }
    },
    {
        id: "PRD-2024-303",
        sku: "MN-BLZ-2024-BLK",
        name: "Classic Black Slim Fit Blazer",
        brand: { name: "Urban Elite", url: "#" },
        category: "MC",
        pricing: { current: 129.99, original: 199.99, discount: 35, savings: 70.00 },
        rating: { score: 4.7, count: 350 },
        stock: { available: true, label: "In Stock" },
        badges: ["Best Seller"],
        images: {
            main: "https://picsum.photos/id/1/600/400",
            thumbnails: [
                "https://picsum.photos/id/2/600/400",
                "https://picsum.photos/id/3/600/400",
                "https://picsum.photos/id/4/600/400",
                "https://picsum.photos/id/5/600/400",
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "M",
        material: "Silk",
        description: [
            "A timeless slim fit blazer designed for meetings and events.",
            "Crafted using premium wool blend fabric with a structured silhouette."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: { category: "Men's Collections", brand: "Urban Elite", material: "Wool Blend" },
        collections: ["Shirts", "Casual Wear"],
        tags: ["blazer", "formal", "black"],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Collections", url: "#" },
            { label: "Classic Black Slim Fit Blazer", url: null }
        ],
        offer: {
            title: "Exclusive Deal",
            description: "Save 35% on premium blazers!",
            ctaText: "Shop Now"
        }
    },
    {
        id: "PRD-2024-302",
        sku: "MN-BLZ-2024-BLK",
        name: "Classic Black Slim Fit Blazer",
        brand: { name: "Urban Elite", url: "#" },
        category: "MC",
        pricing: { current: 129.99, original: 199.99, discount: 35, savings: 70.00 },
        rating: { score: 4.7, count: 350 },
        stock: { available: true, label: "In Stock" },
        badges: ["Best Seller"],
        images: {
            main: "https://picsum.photos/id/6/600/400",
            thumbnails: [
                "https://picsum.photos/id/7/600/400",
                "https://picsum.photos/id/8/600/400",
                "https://picsum.photos/id/9/600/400",
                "https://picsum.photos/id/10/600/400",
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "M",
        material: "Premium Wool Blend",
        description: [
            "A timeless slim fit blazer designed for meetings and events.",
            "Crafted using premium wool blend fabric with a structured silhouette."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: { category: "Men's Collections", brand: "Urban Elite", material: "Wool Blend" },
        collections: ["T-Shirts", "Casual Wear"],
        tags: ["blazer", "formal", "black"],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Collections", url: "#" },
            { label: "Classic Black Slim Fit Blazer", url: null }
        ],
        offer: {
            title: "Exclusive Deal",
            description: "Save 35% on premium blazers!",
            ctaText: "Shop Now"
        }
    },
    {
        id: "PRD-2024-304",
        sku: "MN-BLZ-2024-BLK",
        name: "Classic Black Slim Fit Blazer",
        brand: { name: "Urban Elite", url: "#" },
        category: "MC",
        pricing: { current: 129.99, original: 199.99, discount: 35, savings: 70.00 },
        rating: { score: 4.7, count: 350 },
        stock: { available: true, label: "In Stock" },
        badges: ["Best Seller"],
        images: {
            main: "https://picsum.photos/id/11/600/400",
            thumbnails: [
                "https://picsum.photos/id/22/600/400",
                "https://picsum.photos/id/33/600/400",
                "https://picsum.photos/id/44/600/400",
                "https://picsum.photos/id/55/600/400",
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "M",
        material: "Premium Wool Blend",
        description: [
            "A timeless slim fit blazer designed for meetings and events.",
            "Crafted using premium wool blend fabric with a structured silhouette."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: { category: "Men's Collections", brand: "Urban Elite", material: "Wool Blend" },
        collections: ["Pants", "Denim"],
        tags: ["blazer", "formal", "black"],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Collections", url: "#" },
            { label: "Classic Black Slim Fit Blazer", url: null }
        ],
        offer: {
            title: "Exclusive Deal",
            description: "Save 35% on premium blazers!",
            ctaText: "Shop Now"
        }
    },
    {
        id: "PRD-2024-305",
        sku: "MN-BLZ-2024-BLK",
        name: "Classic Black Slim Fit Blazer",
        brand: { name: "Urban Elite", url: "#" },
        category: "KC",
        pricing: { current: 90.99, original: 199.99, discount: 35, savings: 70.00 },
        rating: { score: 4.7, count: 350 },
        stock: { available: true, label: "In Stock" },
        badges: ["Best Seller"],
        images: {
            main: "https://picsum.photos/id/12/600/400",
            thumbnails: [
                "https://picsum.photos/id/13/600/400",
                "https://picsum.photos/id/14/600/400",
                "https://picsum.photos/id/15/600/400",
                "https://picsum.photos/id/16/600/400",
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "M",
        material: "Cotton",
        description: [
            "A timeless slim fit blazer designed for meetings and events.",
            "Crafted using premium wool blend fabric with a structured silhouette."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: { category: "Men's Collections", brand: "Urban Elite", material: "Wool Blend" },
        collections: ["Shorts", "Summer Wear"],
        tags: ["blazer", "formal", "black"],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Collections", url: "#" },
            { label: "Classic Black Slim Fit Blazer", url: null }
        ],
        offer: {
            title: "Exclusive Deal",
            description: "Save 35% on premium blazers!",
            ctaText: "Shop Now"
        }
    },
    {
        id: "PRD-2024-306",
        sku: "MN-BLZ-2024-BLK",
        name: "Classic Black Slim Fit Blazer",
        brand: { name: "Urban Elite", url: "#" },
        category: "KC",
        pricing: { current: 109.99, original: 199.99, discount: 35, savings: 70.00 },
        rating: { score: 4.7, count: 350 },
        stock: { available: true, label: "In Stock" },
        badges: ["Best Seller"],
        images: {
            main: "https://picsum.photos/id/17/600/400",
            thumbnails: [
                "https://picsum.photos/id/18/600/400",
                "https://picsum.photos/id/19/600/400",
                "https://picsum.photos/id/20/600/400",
                "https://picsum.photos/id/21/600/400",
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "M",
        material: "Premium Wool Blend",
        description: [
            "A timeless slim fit blazer designed for meetings and events.",
            "Crafted using premium wool blend fabric with a structured silhouette."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: { category: "Men's Collections", brand: "Urban Elite", material: "Wool Blend" },
        collections: ["Ethnic Wear", "Festive Collection"],
        tags: ["blazer", "formal", "black"],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Collections", url: "#" },
            { label: "Classic Black Slim Fit Blazer", url: null }
        ],
        offer: {
            title: "Exclusive Deal",
            description: "Save 35% on premium blazers!",
            ctaText: "Shop Now"
        }
    },
    {
        id: "PRD-2024-307",
        sku: "MN-BLZ-2024-BLK",
        name: "Classic Black Slim Fit Blazer",
        brand: { name: "Urban Elite", url: "#" },
        category: "KC",
        pricing: { current: 111.99, original: 199.99, discount: 35, savings: 70.00 },
        rating: { score: 4.7, count: 350 },
        stock: { available: true, label: "In Stock" },
        badges: ["Best Seller"],
        images: {
            main: "https://picsum.photos/id/23/600/400",
            thumbnails: [
                "https://picsum.photos/id/24/600/400",
                "https://picsum.photos/id/25/600/400",
                "https://picsum.photos/id/26/600/400",
                "https://picsum.photos/id/27/600/400",
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "M",
        material: "Cotton",
        description: [
            "A timeless slim fit blazer designed for meetings and events.",
            "Crafted using premium wool blend fabric with a structured silhouette."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: { category: "Men's Collections", brand: "Urban Elite", material: "Wool Blend" },
        collections: ["Winter Wear", "Jackets"],
        tags: ["blazer", "formal", "black"],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Collections", url: "#" },
            { label: "Classic Black Slim Fit Blazer", url: null }
        ],
        offer: {
            title: "Exclusive Deal",
            description: "Save 35% on premium blazers!",
            ctaText: "Shop Now"
        }
    },
    {
        id: "PRD-2024-308",
        sku: "MN-BLZ-2024-BLK",
        name: "Classic Black Slim Fit Blazer",
        brand: { name: "Urban Elite", url: "#" },
        category: "KC",
        pricing: { current: 115.99, original: 199.99, discount: 35, savings: 70.00 },
        rating: { score: 4.7, count: 350 },
        stock: { available: true, label: "In Stock" },
        badges: ["Best Seller"],
        images: {
            main: "https://picsum.photos/id/28/600/400",
            thumbnails: [
                "https://picsum.photos/id/29/600/400",
                "https://picsum.photos/id/30/600/400",
                "https://picsum.photos/id/31/600/400",
                "https://picsum.photos/id/32/600/400",
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "M",
        material: "Premium Wool Blend",
        description: [
            "A timeless slim fit blazer designed for meetings and events.",
            "Crafted using premium wool blend fabric with a structured silhouette."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: { category: "Men's Collections", brand: "Urban Elite", material: "Wool Blend" },
        collections: ["Kids Shorts", "Summer Wear"],
        tags: ["blazer", "formal", "black"],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Collections", url: "#" },
            { label: "Classic Black Slim Fit Blazer", url: null }
        ],
        offer: {
            title: "Exclusive Deal",
            description: "Save 35% on premium blazers!",
            ctaText: "Shop Now"
        }
    },
    {
        id: "PRD-2024-309",
        sku: "MN-BLZ-2024-BLK",
        name: "Classic Black Slim Fit Blazer",
        brand: { name: "Urban Elite", url: "#" },
        category: "KC",
        pricing: { current: 119.99, original: 199.99, discount: 35, savings: 70.00 },
        rating: { score: 4.7, count: 350 },
        stock: { available: true, label: "In Stock" },
        badges: ["Best Seller"],
        images: {
            main: "https://picsum.photos/id/34/600/400",
            thumbnails: [
                "https://picsum.photos/id/35/600/400",
                "https://picsum.photos/id/36/600/400",
                "https://picsum.photos/id/37/600/400",
                "https://picsum.photos/id/38/600/400",
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "M",
        material: "Premium Wool Blend",
        description: [
            "A timeless slim fit blazer designed for meetings and events.",
            "Crafted using premium wool blend fabric with a structured silhouette."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: { category: "Men's Collections", brand: "Urban Elite", material: "Wool Blend" },
        collections: ["Kids T-Shirts", "Casual Wear"],
        tags: ["blazer", "formal", "black"],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Collections", url: "#" },
            { label: "Classic Black Slim Fit Blazer", url: null }
        ],
        offer: {
            title: "Exclusive Deal",
            description: "Save 35% on premium blazers!",
            ctaText: "Shop Now"
        }
    },
    {
        id: "PRD-2024-3010",
        sku: "MN-BLZ-2024-BLK",
        name: "Classic Black Slim Fit Blazer",
        brand: { name: "Urban Elite", url: "#" },
        category: "KC",
        pricing: { current: 100.99, original: 199.99, discount: 35, savings: 70.00 },
        rating: { score: 4.7, count: 350 },
        stock: { available: true, label: "In Stock" },
        badges: ["Best Seller"],
        images: {
            main: "https://picsum.photos/id/39/600/400",
            thumbnails: [
                "https://picsum.photos/id/40/600/400",
                "https://picsum.photos/id/41/600/400",
                "https://picsum.photos/id/42/600/400",
                "https://picsum.photos/id/43/600/400",
            ]
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        defaultSize: "M",
        material: "Premium Wool Blend",
        description: [
            "A timeless slim fit blazer designed for meetings and events.",
            "Crafted using premium wool blend fabric with a structured silhouette."
        ],
        features: [
            { icon: "Truck", label: "Free Shipping" },
            { icon: "RotateCcw", label: "60-Day Returns" },
            { icon: "Shield", label: "2-Year Warranty" }
        ],
        specifications: { category: "Men's Collections", brand: "Urban Elite", material: "Wool Blend" },
        collections: ["Frocks", "Party Wear"],
        tags: ["blazer", "formal", "black"],
        breadcrumb: [
            { label: "Home", url: "#" },
            { label: "Men's Collections", url: "#" },
            { label: "Classic Black Slim Fit Blazer", url: null }
        ],
        offer: {
            title: "Exclusive Deal",
            description: "Save 35% on premium blazers!",
            ctaText: "Shop Now"
        }
    },
]






export default {
    profileIcon,
    heroImage1,
    heroImage2,
    heroImage3,
    heroImage4,
    categories,
    testimonials,
    // product,
    productData,
}