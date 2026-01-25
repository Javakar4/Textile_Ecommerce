import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { GiCottonFlower } from "react-icons/gi";


function Footer() {
    return (
        <footer className="bg-stone-700 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                                <GiCottonFlower className="text-white text-lg" />
                            </div>
                            <span className="text-2xl font-bold font-serif">Luxe Textiles</span>
                        </div>

                        <p className="text-stone-400 mb-6 leading-relaxed">
                            Premium textiles crafted with excellence since 1995
                        </p>

                        <div className="flex gap-4">
                            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 font-serif">Quick Links</h3>
                        <ul className="space-y-3">
                            {["About Us", "Our Story", "Sustainability", "Careers"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-stone-400 hover:text-amber-400 transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 font-serif">Customer Service</h3>
                        <ul className="space-y-3">
                            {["Contact Us", "Shipping Info", "Returns", "FAQ"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-stone-400 hover:text-amber-400 transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 font-serif">Contact Info</h3>
                        <ul className="space-y-4 text-stone-400">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-amber-400" />
                                <span>123 Textile Street, Fashion District, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-amber-400" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-amber-400" />
                                <span>info@luxetextiles.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="border-t border-stone-800 pt-8 text-center text-stone-400">
                    <p>
                        &copy; 2024 Luxe Textiles. All rights reserved. |{" "}
                        <a href="#" className="hover:text-amber-400 transition-colors">
                            Privacy Policy
                        </a>{" "}
                        |{" "}
                        <a href="#" className="hover:text-amber-400 transition-colors">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );

}

export default Footer;
