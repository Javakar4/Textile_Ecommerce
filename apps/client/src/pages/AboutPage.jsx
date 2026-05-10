import React from 'react';

const AboutPage = () => {
    return (
        <div className="mt-28 mb-20 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 uppercase tracking-wide">
                    About Us
                </h1>
                <div className="w-20 h-1 bg-amber-700 mx-auto mb-6"></div>
                <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto italic font-medium">
                    "Crafting Excellence in Every Thread Since 1995"
                </p>
            </div>

            {/* Brand Story Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-stone-900 font-serif">Our Story</h2>
                    <p className="text-stone-600 leading-relaxed text-lg">
                        Founded in the heart of the fashion district in 1995, Luxe Textiles began with a simple mission: to provide the highest quality fabrics to creators and designers worldwide. What started as a small family-owned warehouse has grown into a leading name in the textile industry.
                    </p>
                    <p className="text-stone-600 leading-relaxed text-lg">
                        For nearly three decades, we have scoured the globe for the finest cotton, silk, and linen, ensuring each yard tells a story of craftsmanship and dedication. Our journey has been defined by a commitment to quality and a passion for the art of weaving.
                    </p>
                </div>
                <div className="bg-stone-100 rounded-3xl h-80 flex items-center justify-center overflow-hidden shadow-inner">
                    <div className="text-6xl">🧵</div>
                    {/* In a real scenario, this would be a high-quality brand image */}
                </div>
            </section>

            {/* Mission & Values Section */}
            <section className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 mb-20 border border-gray-100">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-stone-900 font-serif mb-4">Mission & Values</h2>
                    <p className="text-stone-500">The core principles that guide our craft.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center space-y-4">
                        <div className="text-4xl">🎨</div>
                        <h3 className="text-xl font-bold text-stone-900">Quality First</h3>
                        <p className="text-stone-600">
                            We never compromise on the integrity of our materials. Every fabric is rigorously tested for durability and feel.
                        </p>
                    </div>
                    <div className="text-center space-y-4">
                        <div className="text-4xl">🌿</div>
                        <h3 className="text-xl font-bold text-stone-900">Sustainability</h3>
                        <p className="text-stone-600">
                            Committed to ethical sourcing and eco-friendly production methods to protect our planet for future generations.
                        </p>
                    </div>
                    <div className="text-center space-y-4">
                        <div className="text-4xl">💡</div>
                        <h3 className="text-xl font-bold text-stone-900">Innovation</h3>
                        <p className="text-stone-600">
                            Blending traditional weaving techniques with modern technology to create unique and inspiring textiles.
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Overview Section */}
            <section className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-stone-900 font-serif mb-6">Company Overview</h2>
                <p className="text-stone-600 leading-relaxed text-lg mb-8">
                    Today, Luxe Textiles serves thousands of customers, from independent designers to large-scale manufacturers. Our state-of-the-art logistics and dedicated support team ensure that the world's best fabrics are always within your reach. We take pride in being a trusted partner in the creative journey of our clients.
                </p>
            </section>
        </div>
    );
};

export default AboutPage;
