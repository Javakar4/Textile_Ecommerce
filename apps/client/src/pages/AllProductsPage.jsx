import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Filter, X, ChevronUp, ChevronDown, Star, Search } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { useProductServices } from '../hooks/useProductServices';
import { useApp } from '../hooks/useApp';
import { useSearchParams } from 'react-router-dom';
import { useCategoryServices } from '../hooks/useCategoryServices';
import { useBrandServices } from '../hooks/useBrandServices';

const AllProductsPage = () => {
    const { assets } = useApp();
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get("category");
    const searchQueryParam = searchParams.get("search") || "";

    const { useInfiniteProducts } = useProductServices();
    const { useCategories } = useCategoryServices();
    const { useBrands } = useBrandServices();

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [filters, setFilters] = useState({
        category: categoryParam || '',
        collections: '',
        priceRanges: [],
        materials: [],
        sizes: [],
        ratings: [],
        brands: [],
        tags: [],
        inStockOnly: false
    });

    // Parse price ranges
    const priceRangeParams = useMemo(() => {
        if (filters.priceRanges.length === 0) return { minPrice: undefined, maxPrice: undefined };
        let mins = [];
        let maxs = [];
        let hasMax = false;
        filters.priceRanges.forEach(r => {
            if (r === '0-50') { mins.push(0); maxs.push(50); }
            if (r === '50-100') { mins.push(50); maxs.push(100); }
            if (r === '100-200') { mins.push(100); maxs.push(200); }
            if (r === '200+') { mins.push(200); hasMax = true; }
        });
        return {
            minPrice: Math.min(...mins),
            maxPrice: hasMax ? undefined : Math.max(...maxs)
        };
    }, [filters.priceRanges]);

    const { 
        data, 
        isLoading, 
        error, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useInfiniteProducts({
        category: filters.category,
        search: searchQueryParam,
        sizes: filters.sizes.join(','),
        materials: filters.materials.join(','),
        brands: filters.brands.join(','),
        tags: filters.tags.join(','),
        ratings: filters.ratings.join(','),
        inStockOnly: filters.inStockOnly,
        minPrice: priceRangeParams.minPrice,
        maxPrice: priceRangeParams.maxPrice,
        sortBy: sortBy
    });

    const products = useMemo(() => {
        return data && data.pages ? data.pages.flatMap(page => page?.products || []) : [];
    }, [data]);
    
    // Observer for infinite scrolling
    const observer = useRef();
    const lastProductElementRef = useCallback(node => {
        if (isLoading || isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

    const { data: categories = [] } = useCategories();
    const { data: authoritativeBrands = [] } = useBrands();
    useEffect(() => {
        if (categoryParam) {
            setFilters(prev => ({
                ...prev,
                category: categoryParam
            }));
        }
    }, [categoryParam]);
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
        const categories = [...new Set(products.map(p => p.categoryId?.name).filter(Boolean))];
        const materials = [...new Set(products.map(p => p.material).filter(Boolean))];
        const brands = [...new Set(products.map(p => p.brandId?.name).filter(Boolean))];

        // Get all unique collections from products
        const collectionsSet = new Set();
        products.forEach(p => {
            if (Array.isArray(p.collections)) {
                p.collections.forEach(col => collectionsSet.add(col));
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

    // Filtering is now handled completely by the server
    const filteredProducts = products;

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
                                { value: '0-50', label: 'Under ₹50' },
                                { value: '50-100', label: '₹50 - ₹100' },
                                { value: '100-200', label: '₹100 - ₹200' },
                                { value: '200+', label: '₹200 & Above' }
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
                    {authoritativeBrands.length > 0 && (
                        <FilterSection title="Brand" section="brand">
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {authoritativeBrands.map(brand => (
                                    <label key={brand._id} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                                        <input
                                            type="checkbox"
                                            checked={filters.brands.includes(brand.name)}
                                            onChange={() => toggleFilter('brands', brand.name)}
                                            className="w-4 h-4 text-amber-700 rounded focus:ring-2 focus:ring-amber-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{brand.name}</span>
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
                                {categories.filter(cat => !cat.parentId).map(parent => (
                                    <button
                                        key={parent._id}
                                        onClick={() => setFilters(prev => ({ ...prev, category: parent.slug }))}
                                        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${filters.category === parent.slug
                                            ? 'bg-amber-700 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {parent.name}
                                    </button>
                                ))}
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
                            <span className="font-semibold">{data?.pages?.[0]?.total || 0}</span> products found
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="p-4 sm:p-6">
                        {error ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <X size={48} className="text-red-500 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading products</h3>
                                <p className="text-gray-600 mb-6">{error.message || "Something went wrong"}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-amber-700 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <>
                                <ProductGrid products={filteredProducts} smNewStyleNeeded={true} />
                                
                                {/* Infinite Scroll Trigger */}
                                <div ref={lastProductElementRef} className="py-8 text-center">
                                    {isFetchingNextPage ? (
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
                                    ) : hasNextPage ? (
                                        <span className="text-gray-500 text-sm">Scroll for more...</span>
                                    ) : (
                                        <span className="text-gray-400 text-sm">End of results</span>
                                    )}
                                </div>
                            </>
                        ) : isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mb-4"></div>
                                <p className="text-gray-600">Loading products...</p>
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