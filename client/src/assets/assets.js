import { FaTshirt, FaCouch, FaIndustry, FaPalette, FaArrowRight } from "react-icons/fa";



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


export default{
    profileIcon,
    heroImage1,
    heroImage2,
    heroImage3,
    heroImage4,
    categories,
    testimonials,
    scrollingCard,
}