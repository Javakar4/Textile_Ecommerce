import React from 'react'

function NewsLetter() {
    return (
        <section className="relative py-16 overflow-hidden from-amber-50 via-white to-amber-50">
            {/* Decorative floating fabric shapes */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-16 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left: Text & Benefits */}
                    <div className="space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-serif">
                            Join Our Textile Community
                        </h2>
                        <p className="text-stone-600 text-lg sm:text-xl">
                            Subscribe to our newsletter and be the first to explore our latest premium fabrics, collections, and exclusive style guides.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {[
                                { icon: '🧵', text: 'Exclusive Fabric Drops' },
                                { icon: '🎨', text: 'Style & Pattern Tips' },
                                { icon: '🔥', text: 'Early Sale Access' },
                                { icon: '💡', text: 'Trend Insights' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="text-stone-700 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Email Form */}
                    <div className="flex flex-col gap-4">
                        <p className="text-stone-700 font-semibold">Sign up and get a 10% off on your first order!</p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-6 py-3 rounded-full border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none text-stone-700 transition"
                            />
                            <button className="bg-amber-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-800 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center">
                                Subscribe
                                <span className="text-lg">→</span>
                            </button>
                        </div>

                        <p className="text-stone-500 text-sm mt-1">
                            We respect your privacy. Unsubscribe anytime.
                        </p>
                    </div>
                </div>

            </div>
        </section>



    )
}

export default NewsLetter