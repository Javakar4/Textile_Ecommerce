import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all unused and unwashed items in their original packaging. Please contact our support team to initiate a return.",
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout for faster delivery.",
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination.",
    },
    {
        question: "How can I track my order?",
        answer: "Once your order ships, you will receive a confirmation email with a tracking number and a link to track your package.",
    },
    {
        question: "Are your materials sustainably sourced?",
        answer: "We are committed to sustainability. Many of our fabrics are organic, recycled, or ethically sourced. Please check the product description for specific material details.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-gray-600">Find answers to common questions about our products, shipping, and returns.</p>
                </div>

                <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-200">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-0">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-left text-base font-semibold text-gray-900">{faq.question}</span>
                                <span className="ml-4 flex-shrink-0 text-amber-700">
                                    {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center bg-amber-50 rounded-2xl p-8 border border-amber-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
                    <p className="text-gray-600 mb-6">We're here to help! Our customer support team is available Monday through Friday.</p>
                    <a href="/contact" className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-medium py-3 px-8 rounded-xl transition-colors">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
