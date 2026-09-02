import React, { useState } from 'react';
import {
  SafeguardModal,
  DeleteConfirmationModal,
  CategoryTable,
  CategoryFormModal,
  ProductRowList,
  ProductCardGrid,
  ProductFormModal,
  TabSwitchers
} from '../components/catalog/';
import {
  useProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from '../hooks/useCatalog';
import { toast } from 'react-hot-toast';
import { CAT_CONSTANTS } from '../config/constants';

export default function ManageCatalog() {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'categories'

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'in-stock', 'out-of-stock'
  const [productViewMode, setProductViewMode] = useState('rows'); // 'rows' or 'cards'

  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message, { icon: '⚠️' });
    }
  };

  // Queries
  const { data: productsRes, isLoading: loadingProducts, error: errorProducts } = useProductsQuery({
    search: searchTerm,
    category: categoryFilter,
    page: page
  });

  const { data: categoriesRes, isLoading: loadingCategories, error: errorCategories } = useCategoriesQuery();

  const products = productsRes?.data?.products || productsRes?.data || [];
  const pagination = productsRes?.data?.total !== undefined ? {
    total: productsRes.data.total,
    page: productsRes.data.page,
    totalPages: productsRes.data.totalPages,
    limit: productsRes.data.limit
  } : null;
  const categories = categoriesRes?.data || [];

  // Mutations
  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const deleteProductMutation = useDeleteProductMutation();

  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();
  const deleteCategoryMutation = useDeleteCategoryMutation();

  // Modals States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null for create, object for edit
  const [productForm, setProductForm] = useState({
    name: '', sku: '', categoryId: '', currentPrice: '', originalPrice: '',
    quantity: '', material: '', descriptionPoints: ['', ''], image: ''
  });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '', slug: '', parentId: '', image: '', isActive: true
  });

  // Safeguard & Delete Modal States
  const [safeguardModal, setSafeguardModal] = useState(null); // { categoryName, count }
  const [productDeleteConfirm, setProductDeleteConfirm] = useState(null); // product object to delete
  const [categoryDeleteConfirm, setCategoryDeleteConfirm] = useState(null); // category object to delete

  // Validation Error States
  const [formErrors, setFormErrors] = useState({});

  // ----------------------------------------------------
  // PRODUCT CRUD OPERATIONS
  // ----------------------------------------------------
  const openProductCreate = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      sku: '',
      categoryId: categories[0]?._id || '',
      currentPrice: '',
      originalPrice: '',
      quantity: '',
      material: '',
      descriptionPoints: ['', ''],
      image: CAT_CONSTANTS.MOCK_IMAGES.silk
    });
    setFormErrors({});
    setIsProductModalOpen(true);
  };

  const openProductEdit = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      sku: product.sku,
      categoryId: product.categoryId?._id || product.categoryId,
      currentPrice: product.pricing.current.toString(),
      originalPrice: product.pricing.original.toString(),
      quantity: product.stock.quantity.toString(),
      material: product.material,
      descriptionPoints: product.description.length > 0 ? product.description : ['', ''],
      image: product.image
    });
    setFormErrors({});
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Validations
    if (!productForm.name || productForm.name.trim().length < 3) {
      errors.name = "Product name must be at least 3 characters.";
    }
    if (!productForm.sku || productForm.sku.trim().length < 3) {
      errors.sku = "SKU code is required.";
    }
    const current = parseFloat(productForm.currentPrice);
    const original = parseFloat(productForm.originalPrice);

    if (isNaN(current) || current <= 0) {
      errors.currentPrice = "Price must be a positive number.";
    }
    if (isNaN(original) || original <= 0) {
      errors.originalPrice = "Original price must be a positive number.";
    }
    if (!errors.currentPrice && !errors.originalPrice && current > original) {
      errors.currentPrice = "Sale price cannot exceed the original catalog price.";
    }
    const qty = parseInt(productForm.quantity);
    if (isNaN(qty) || qty < 0) {
      errors.quantity = "Stock quantity must be a non-negative integer.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Auto-calculate discount percentage
    const discount = original > current ? Math.round(((original - current) / original) * 100) : 0;

    const payload = {
      sku: productForm.sku.toUpperCase().trim(),
      name: productForm.name.trim(),
      categoryId: productForm.categoryId,
      pricing: { current, original, discount },
      stock: { available: qty > 0, quantity: qty },
      material: productForm.material.trim() || "Synthetic Blend",
      description: productForm.descriptionPoints.filter(p => p.trim() !== ''),
      image: productForm.image || CAT_CONSTANTS.MOCK_IMAGES.silk
    };

    if (editingProduct) {
      updateProductMutation.mutate({ productId: editingProduct._id, productData: payload }, {
        onSuccess: () => {
          showToast(`Product "${payload.name}" updated successfully.`);
          setIsProductModalOpen(false);
        },
        onError: (err) => {
          showToast(err.message || 'Failed to update product', 'error');
        }
      });
    } else {
      createProductMutation.mutate(payload, {
        onSuccess: () => {
          showToast(`Product "${payload.name}" created successfully.`);
          setIsProductModalOpen(false);
        },
        onError: (err) => {
          showToast(err.message || 'Failed to create product', 'error');
        }
      });
    }
  };

  const executeProductDelete = (productId) => {
    deleteProductMutation.mutate(productId, {
      onSuccess: () => {
        showToast('Product has been deleted.', 'warning');
        setProductDeleteConfirm(null);
      },
      onError: (err) => {
        showToast(err.message || 'Failed to delete product', 'error');
      }
    });
  };

  // ----------------------------------------------------
  // CATEGORY CRUD OPERATIONS
  // ----------------------------------------------------
  const openCategoryCreate = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      slug: '',
      parentId: '',
      image: CAT_CONSTANTS.MOCK_IMAGES.cotton,
      isActive: true
    });
    setFormErrors({});
    setIsCategoryModalOpen(true);
  };

  const openCategoryEdit = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      parentId: category.parentId || '',
      image: category.image || CAT_CONSTANTS.MOCK_IMAGES.cotton,
      isActive: category.isActive
    });
    setFormErrors({});
    setIsCategoryModalOpen(true);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!categoryForm.name || categoryForm.name.trim().length < 3) {
      errors.name = "Category name must be at least 3 characters.";
    }

    // Auto-generate slug if empty
    let finalSlug = categoryForm.slug.trim().toLowerCase();
    if (!finalSlug && categoryForm.name) {
      finalSlug = categoryForm.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (!finalSlug || !/^[a-z0-9-]+$/.test(finalSlug)) {
      errors.slug = "Slug must contain only lowercase alphanumeric letters and dashes.";
    }

    // Check if slug is unique (excluding currently edited category)
    const slugExists = categories.some(c => c.slug === finalSlug && (!editingCategory || c._id !== editingCategory._id));
    if (slugExists) {
      errors.slug = "This category slug is already in use.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      name: categoryForm.name.trim(),
      slug: finalSlug,
      parentId: categoryForm.parentId || null,
      image: categoryForm.image || CAT_CONSTANTS.MOCK_IMAGES.cotton,
      isActive: categoryForm.isActive
    };

    if (editingCategory) {
      updateCategoryMutation.mutate({ categoryId: editingCategory._id, categoryData: payload }, {
        onSuccess: () => {
          showToast(`Category "${payload.name}" updated successfully.`);
          setIsCategoryModalOpen(false);
        },
        onError: (err) => {
          showToast(err.message || 'Failed to update category', 'error');
        }
      });
    } else {
      createCategoryMutation.mutate(payload, {
        onSuccess: () => {
          showToast(`Category "${payload.name}" created successfully.`);
          setIsCategoryModalOpen(false);
        },
        onError: (err) => {
          showToast(err.message || 'Failed to create category', 'error');
        }
      });
    }
  };

  // Safe category deletion checking
  const handleCategoryDeleteClick = (category) => {
    // Check if products exist in this category
    const associatedProducts = products.filter(p => {
      const pCatId = p.categoryId?._id || p.categoryId;
      return pCatId === category._id;
    });
    if (associatedProducts.length > 0) {
      setSafeguardModal({
        categoryName: category.name,
        count: associatedProducts.length
      });
    } else {
      setCategoryDeleteConfirm(category);
    }
  };

  const executeCategoryDelete = (categoryId) => {
    deleteCategoryMutation.mutate(categoryId, {
      onSuccess: () => {
        showToast('Category has been deleted.', 'warning');
        setCategoryDeleteConfirm(null);
      },
      onError: (err) => {
        showToast(err.message || 'Failed to delete category', 'error');
      }
    });
  };

  // ----------------------------------------------------
  // FILTER & SEARCH LOGIC
  // ----------------------------------------------------
  const filteredProducts = products.filter(product => {
    // Client-side stock status filter
    if (stockFilter !== 'all') {
      const isAvailable = product.stock.quantity > 0;
      if (stockFilter === 'in-stock' && !isAvailable) return false;
      if (stockFilter === 'out-of-stock' && isAvailable) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Tab Switcher at the top of Catalog page */}
      <TabSwitchers 
        activeTab={activeTab}
        tabSwitchHandler={(v)=>(setActiveTab(v))}
      />

      {activeTab === 'products' ? (
        // ----------------------------------------------------
        // PRODUCTS VIEW
        // ----------------------------------------------------
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-serif text-white tracking-tight">Product Catalog</h2>
              <p className="text-emerald-100/60 text-xs sm:text-sm mt-1">Manage fabric listings, pricing, and active quantities</p>
            </div>
            <button 
              onClick={openProductCreate}
              className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 border border-[#d4af37]/25 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>+</span> Add Product
            </button>
          </div>

          {/* Filter controls bar */}
          <div className="glass rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, SKU, or fiber..."
                className="w-full bg-[#031c16]/50 border border-emerald-500/15 rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/40 text-sm select-none">🔍</span>
            </div>

            <div className="flex flex-wrap w-full md:w-auto items-center gap-3">
              <div className="flex flex-col w-1/2 sm:w-auto">
                <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider mb-1.5 ml-1">View Mode</label>
                <div className="flex bg-[#041e18]/70 p-0.5 rounded-xl border border-emerald-500/15">
                  <button 
                    type="button"
                    onClick={() => setProductViewMode('rows')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      productViewMode === 'rows' 
                        ? 'bg-[#d4af37] text-emerald-950 font-bold shadow' 
                        : 'text-emerald-100/60 hover:text-white'
                    }`}
                  >
                    Row List
                  </button>
                  <button 
                    type="button"
                    onClick={() => setProductViewMode('cards')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      productViewMode === 'cards' 
                        ? 'bg-[#d4af37] text-emerald-950 font-bold shadow' 
                        : 'text-emerald-100/60 hover:text-white'
                    }`}
                  >
                    Card Grid
                  </button>
                </div>
              </div>

              <div className="flex flex-col w-1/2 sm:w-auto">
                <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider mb-1.5 ml-1">Category</label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setPage(1);
                  }}
                  className="bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-[10px] uppercase text-[#d4af37] font-semibold tracking-wider mb-1.5 ml-1">Availability</label>
                <select 
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="bg-[#031c16]/70 border border-emerald-500/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                >
                  <option value="all">All Stock Status</option>
                  <option value="in-stock">Available Only</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Listing */}
          {loadingProducts ? (
            <div className="glass rounded-2xl p-16 text-center shadow-xl flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-t-emerald-500 border-emerald-950/40 rounded-full animate-spin"></div>
              <span className="text-emerald-100/60 text-xs sm:text-sm mt-4 font-mono">Loading product list...</span>
            </div>
          ) : errorProducts ? (
            <div className="glass rounded-2xl p-16 text-center space-y-4 shadow-xl border border-rose-500/20">
              <span className="text-4xl">⚠️</span>
              <h3 className="text-lg font-bold text-rose-300">Failed to load products</h3>
              <p className="text-emerald-100/60 text-sm max-w-sm mx-auto">{errorProducts.message}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              {productViewMode === 'rows' ? (
                <ProductRowList 
                  filteredProducts={filteredProducts}
                  categories={categories}
                  onEdit={openProductEdit}
                  onDelete={setProductDeleteConfirm}
                />
              ) : (
                <ProductCardGrid 
                  filteredProducts={filteredProducts}
                  categories={categories}
                  onEdit={openProductEdit}
                  onDelete={setProductDeleteConfirm}
                />
              )}
              
              {/* Pagination UI */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-between items-center bg-[#041e18]/70 border border-emerald-500/15 rounded-xl p-4 mt-6">
                  <span className="text-emerald-100/60 text-sm">
                    Showing {(pagination.page - 1) * pagination.limit + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={pagination.page <= 1}
                      onClick={() => setPage(p => p - 1)}
                      className="px-4 py-2 rounded-lg bg-[#031c16] border border-emerald-500/30 text-emerald-100 hover:bg-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>
                    <button
                      disabled={pagination.page >= pagination.totalPages}
                      onClick={() => setPage(p => p + 1)}
                      className="px-4 py-2 rounded-lg bg-[#031c16] border border-emerald-500/30 text-emerald-100 hover:bg-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="glass rounded-2xl p-16 text-center space-y-4 shadow-xl">
              <span className="text-4xl">📦</span>
              <h3 className="text-lg font-bold text-white">No products found</h3>
              <p className="text-emerald-100/60 text-sm max-w-sm mx-auto">Try refining your search terms or selecting a different category filter.</p>
            </div>
          )}
        </div>
      ) : (
        // ----------------------------------------------------
        // CATEGORIES VIEW
        // ----------------------------------------------------
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-serif text-white tracking-tight">Category Structure</h2>
              <p className="text-emerald-100/60 text-xs sm:text-sm mt-1">Design parent-child hierarchies, slugs, and status toggles</p>
            </div>
            <button 
              onClick={openCategoryCreate}
              className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 border border-[#d4af37]/25 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>+</span> Add Category
            </button>
          </div>

          {loadingCategories ? (
            <div className="glass rounded-2xl p-16 text-center shadow-xl flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-t-emerald-500 border-emerald-950/40 rounded-full animate-spin"></div>
              <span className="text-emerald-100/60 text-xs sm:text-sm mt-4 font-mono">Loading categories...</span>
            </div>
          ) : errorCategories ? (
            <div className="glass rounded-2xl p-16 text-center space-y-4 shadow-xl border border-rose-500/20">
              <span className="text-4xl">⚠️</span>
              <h3 className="text-lg font-bold text-rose-300">Failed to load categories</h3>
              <p className="text-emerald-100/60 text-sm max-w-sm mx-auto">{errorCategories.message}</p>
            </div>
          ) : (
            <CategoryTable 
              categories={categories}
              products={products}
              onEdit={openCategoryEdit}
              onDeleteClick={handleCategoryDeleteClick}
            />
          )}
        </div>
      )}

      {/* ----------------------------------------------------
          MODALS CONTAINER
      ---------------------------------------------------- */}
      <ProductFormModal 
        isOpen={isProductModalOpen}
        productForm={productForm}
        setProductForm={setProductForm}
        editingProduct={editingProduct}
        products={products}
        categories={categories}
        formErrors={formErrors}
        onSubmit={handleProductSubmit}
        onClose={() => setIsProductModalOpen(false)}
      />

      <CategoryFormModal 
        isOpen={isCategoryModalOpen}
        categoryForm={categoryForm}
        setCategoryForm={setCategoryForm}
        editingCategory={editingCategory}
        categories={categories}
        formErrors={formErrors}
        onSubmit={handleCategorySubmit}
        onClose={() => setIsCategoryModalOpen(false)}
      />

      <SafeguardModal 
        safeguardModal={safeguardModal}
        onClose={() => setSafeguardModal(null)}
      />

      <DeleteConfirmationModal 
        isOpen={!!productDeleteConfirm}
        title="Delete Product?"
        name={productDeleteConfirm?.name || ''}
        onConfirm={() => executeProductDelete(productDeleteConfirm._id)}
        onCancel={() => setProductDeleteConfirm(null)}
      />

      <DeleteConfirmationModal 
        isOpen={!!categoryDeleteConfirm}
        title="Delete Category?"
        name={categoryDeleteConfirm?.name || ''}
        onConfirm={() => executeCategoryDelete(categoryDeleteConfirm._id)}
        onCancel={() => setCategoryDeleteConfirm(null)}
      />

    </div>
  );
}
