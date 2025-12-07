import React, { useState, useMemo } from 'react';
import { Filter, X, ChevronUp, ChevronDown, Star, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { UseAppContext } from "../context/AppContext";

const AllProductsPage = () => {
    const { assets } = UseAppContext();
    const products = assets.productData || [];

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [filters, setFilters] = useState({
        category: '',
        collections: '',
        priceRanges: [],
        materials: [],
        sizes: [],
        ratings: [],
        brands: [],
        tags: [],
        inStockOnly: false
    });
    const [openSections, setOpenSections] = useState({
        price: true,
        material: true,
        size: true,
        rating: false,
        brand: true,
        tags: true,
        stock: false
    });

    // Extract unique values from products for filter options
    const filterOptions = useMemo(() => {
        const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
        const materials = [...new Set(products.map(p => p.material).filter(Boolean))];
        const brands = [...new Set(products.map(p => p.brand?.name || p.brand).filter(Boolean))];

        // Get all unique collections from products
        const collectionsSet = new Set();
        products.forEach(p => {
            if (Array.isArray(p.collections)) {
                p.collections.forEach(col => collectionsSet.add(col));
            } else if (p.collection) {
                collectionsSet.add(p.collection);
            }
        });
        const collections = Array.from(collectionsSet);

        // Get all unique tags
        const tagsSet = new Set();
        products.forEach(p => {
            if (Array.isArray(p.tags)) {
                p.tags.forEach(tag => tagsSet.add(tag));
            }
        });
        const tags = Array.from(tagsSet);

        return { categories, materials, brands, collections, tags };
    }, [products]);

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleSize = (size) => {
        setFilters(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const toggleFilter = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter(v => v !== value)
                : [...prev[filterType], value]
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            collections: '',
            priceRanges: [],
            materials: [],
            sizes: [],
            ratings: [],
            brands: [],
            tags: [],
            inStockOnly: false
        });
        setSortBy('featured');
    };

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Category filter
        if (filters.category) {
            filtered = filtered.filter(p => p.category === filters.category);
        }

        // Collection filter
        if (filters.collections) {
            filtered = filtered.filter(p => {
                if (Array.isArray(p.collections)) {
                    return p.collections.includes(filters.collections);
                }
                return p.collection === filters.collections;
            });
        }


        // Price range filter
        if (filters.priceRanges.length > 0) {
            filtered = filtered.filter(p => {
                const price = p.pricing?.current || p.price || 0;
                return filters.priceRanges.some(range => {
                    if (range === '0-50') return price < 50;
                    if (range === '50-100') return price >= 50 && price < 100;
                    if (range === '100-200') return price >= 100 && price < 200;
                    if (range === '200+') return price >= 200;
                    return false;
                });
            });
        }

        // Material filter
        if (filters.materials.length > 0) {
            filtered = filtered.filter(p => filters.materials.includes(p.material));
        }

        // Size filter
        if (filters.sizes.length > 0) {
            filtered = filtered.filter(p => {
                if (p.sizes && Array.isArray(p.sizes)) {
                    return filters.sizes.some(size => p.sizes.includes(size));
                }
                return false;
            });
        }

        // Rating filter
        if (filters.ratings.length > 0) {
            filtered = filtered.filter(p => {
                const rating = p.rating?.score || p.rating || 0;
                return filters.ratings.some(r => rating >= parseInt(r));
            });
        }

        // Brand filter
        if (filters.brands.length > 0) {
            filtered = filtered.filter(p => {
                const brandName = p.brand?.name || p.brand;
                return filters.brands.includes(brandName);
            });
        }

        // Tags filter
        if (filters.tags.length > 0) {
            filtered = filtered.filter(p => {
                if (Array.isArray(p.tags)) {
                    return filters.tags.some(tag => p.tags.includes(tag));
                }
                return false;
            });
        }

        // Stock filter
        if (filters.inStockOnly) {
            filtered = filtered.filter(p => {
                if (p.stock && typeof p.stock === 'object') {
                    return p.stock.available === true;
                }
                return p.inStock === true;
            });
        }

        // Sorting
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => {
                const priceA = a.pricing?.current || a.price || 0;
                const priceB = b.pricing?.current || b.price || 0;
                return priceA - priceB;
            });
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => {
                const priceA = a.pricing?.current || a.price || 0;
                const priceB = b.pricing?.current || b.price || 0;
                return priceB - priceA;
            });
        } else if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.addedDate || 0) - new Date(a.addedDate || 0));
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => {
                const ratingA = a.rating?.score || a.rating || 0;
                const ratingB = b.rating?.score || b.rating || 0;
                return ratingB - ratingA;
            });
        } else if (sortBy === 'popular') {
            filtered.sort((a, b) => {
                const reviewsA = a.rating?.count || a.reviews || 0;
                const reviewsB = b.rating?.count || b.reviews || 0;
                return reviewsB - reviewsA;
            });
        } else if (sortBy === 'discount') {
            filtered.sort((a, b) => {
                const discountA = a.pricing?.discount || a.discount || 0;
                const discountB = b.pricing?.discount || b.discount || 0;
                return discountB - discountA;
            });
        }

        return filtered;
    }, [products, filters, sortBy]);

    const FilterSection = ({ title, section, children }) => (
        <div className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
            <h4
                className="font-semibold text-gray-900 mb-3 flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection(section)}
            >
                <span>{title}</span>
                {openSections[section] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </h4>
            {openSections[section] && <div className="mt-3">{children}</div>}
        </div>
    );

    const hasActiveFilters =
        filters.priceRanges.length > 0 ||
        filters.materials.length > 0 ||
        filters.sizes.length > 0 ||
        filters.ratings.length > 0 ||
        filters.brands.length > 0 ||
        filters.tags.length > 0 ||
        filters.inStockOnly;


    return (
        <div className="mt-16">
            <title>All Products</title>

            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
                {/* Mobile Filter Toggle */}
                <button
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="lg:hidden fixed bottom-6 right-6 z-50 bg-amber-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-amber-600 transition-colors"
                >
                    <Filter size={20} />
                    <span>Filters</span>
                </button>

                {/* Backdrop for mobile */}
                {mobileFiltersOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={() => setMobileFiltersOpen(false)}
                    />
                )}

                {/* Vertical Filter Sidebar */}
                <aside className={`w-full lg:w-72 bg-white border-r border-gray-200 p-6 fixed lg:sticky top-16 lg:h-[calc(100vh-4rem)] inset-y-0 left-0 z-40 transition-transform duration-300 lg:translate-x-0 overflow-y-auto ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    {/* Sticky Apply Button (Mobile Only) */}
                    {hasActiveFilters && (
                        <div className="lg:hidden sticky top-0 left-0 bg-white z-50 pb-3">
                            <button
                                onClick={() => setMobileFiltersOpen(false)}
                                className="w-full bg-amber-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 transition"
                            >
                                Apply Filters
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => setMobileFiltersOpen(false)}
                        className="lg:hidden absolute top-6 right-5 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>

                    <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

                    {/* Price Range Filter */}
                    <FilterSection title="Price Range" section="price">
                        <div className="space-y-2">
                            {[
                                { value: '0-50', label: 'Under $50' },
                                { value: '50-100', label: '$50 - $100' },
                                { value: '100-200', label: '$100 - $200' },
                                { value: '200+', label: '$200 & Above' }
                            ].map(range => (
                                <label key={range.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                                    <input
                                        type="checkbox"
                                        checked={filters.priceRanges.includes(range.value)}
                                        onChange={() => toggleFilter('priceRanges', range.value)}
                                        className="w-4 h-4 text-amber-700 rounded focus:ring-2 focus:ring-amber-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Material Filter */}
                    {filterOptions.materials.length > 0 && (
                        <FilterSection title="Material" section="material">
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {filterOptions.materials.map(material => (
                                    <label key={material} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                                        <input
                                            type="checkbox"
                                            checked={filters.materials.includes(material)}
                                            onChange={() => toggleFilter('materials', material)}
                                            className="w-4 h-4 text-amber-700 rounded focus:ring-2 focus:ring-amber-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{material}</span>
                                    </label>
                                ))}
                            </div>
                        </FilterSection>
                    )}

                    {/* Size Filter */}
                    <FilterSection title="Size" section="size">
                        <div className="flex flex-wrap gap-2">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => toggleSize(size)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filters.sizes.includes(size)
                                        ? 'bg-amber-700 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Rating Filter */}
                    <FilterSection title="Rating" section="rating">
                        <div className="space-y-2">
                            {[
                                { value: '4', label: '4 & Above' },
                                { value: '3', label: '3 & Above' },
                                { value: '2', label: '2 & Above' }
                            ].map(rating => (
                                <label key={rating.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                                    <input
                                        type="checkbox"
                                        checked={filters.ratings.includes(rating.value)}
                                        onChange={() => toggleFilter('ratings', rating.value)}
                                        className="w-4 h-4 text-amber-700 rounded focus:ring-2 focus:ring-amber-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 flex items-center">
                                        <Star size={12} className="text-amber-500 fill-amber-500 mr-1" />
                                        <span>{rating.label}</span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Brand Filter */}
                    {filterOptions.brands.length > 0 && (
                        <FilterSection title="Brand" section="brand">
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {filterOptions.brands.map(brand => (
                                    <label key={brand} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                                        <input
                                            type="checkbox"
                                            checked={filters.brands.includes(brand)}
                                            onChange={() => toggleFilter('brands', brand)}
                                            className="w-4 h-4 text-amber-700 rounded focus:ring-2 focus:ring-amber-500 border-danger"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </FilterSection>
                    )}

                    {/* Tags Filter */}
                    {filterOptions.tags.length > 0 && (
                        <FilterSection title="Tags" section="tags">
                            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                                {filterOptions.tags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleFilter('tags', tag)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filters.tags.includes(tag)
                                            ? 'bg-amber-700 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </FilterSection>
                    )}

                    {/* Stock Status */}
                    <FilterSection title="Availability" section="stock">
                        <label className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input
                                type="checkbox"
                                checked={filters.inStockOnly}
                                onChange={() => setFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }))}
                                className="w-4 h-4 text-amber-700 rounded focus:ring-2 focus:ring-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                        </label>
                    </FilterSection>

                    {/* Clear Filters */}
                    <button
                        onClick={clearFilters}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors mt-4"
                    >
                        Clear All Filters
                    </button>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 w-full lg:w-auto">
                    {/* Header Section */}
                    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6 sm:py-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">All Products</h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            Discover our complete collection of premium products. Filter by category, material, size, price, and more to find exactly what you need.
                        </p>
                    </div>

                    {/* Horizontal Filter Bar */}
                    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Left Side - Quick Collection Filters */}
                            <div className="flex flex-wrap gap-2 items-center">
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${filters.category === ''
                                        ? 'bg-amber-700 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    All Products
                                </button>
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, category: "MC" }))}
                                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${filters.category === "MC"
                                        ? 'bg-amber-700 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Men's Collection
                                </button>
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, category: "KC" }))}
                                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${filters.category === "KC"
                                        ? 'bg-amber-700 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Kids' Collection
                                </button>
                            </div>

                            {/* Right Side - Collections Dropdown and Sort */}
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Collections Dropdown */}
                                <div className="flex items-center gap-2">
                                    <label htmlFor="collections" className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Collections:</label>
                                    <select
                                        id="collections"
                                        value={filters.collections}
                                        onChange={(e) => setFilters(prev => ({ ...prev, collections: e.target.value }))}
                                        className="border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white min-w-[25px] max-w-[120px] md:min-w-[140px]"
                                    >
                                        <option value="">All Collections</option>
                                        {filterOptions.collections.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort Dropdown */}
                                <div className="flex items-center gap-2">
                                    <label htmlFor="sort" className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
                                    <select
                                        id="sort"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white min-w-[25px] max-w-[110px] md:min-w-[140px]"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="newest">Recently Added</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="popular">Most Reviews</option>
                                        <option value="discount">Best Discount</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 text-sm text-gray-600">
                            <span className="font-semibold">{filteredProducts.length}</span> products found
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="p-4 sm:p-6">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
                                {filteredProducts.map((product, index) => (
                                    <div key={product.id || index}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 sm:py-16">
                                <Search size={48} className="text-gray-300 mx-auto mb-4 sm:mb-6" />
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                                    Try adjusting your filters or search criteria
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="bg-amber-700 hover:bg-amber-600 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AllProductsPage;