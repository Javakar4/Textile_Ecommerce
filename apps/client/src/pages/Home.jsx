import React, { useMemo } from "react";
import HeroSection from "../components/home/HeroSection";
import ShopByCatagory from "../components/home/ShopByCategory";
import Testimonials from "../components/home/Testimonials";
import CollectionsScroller from "../components/home/CollectionsScroller";
import NewsLetter from "../components/home/NewsLetter";
import { useProductServices } from "../hooks/useProductServices";
import { useCategoryServices } from "../hooks/useCategoryServices";


const DynamicCollection = React.memo(({ parentCategory, allCategories }) => {
  const { useProducts } = useProductServices();

  
  const childCategories = useMemo(() => {
    if (!Array.isArray(allCategories)) return [];
    return allCategories.filter(
      (cat) => cat.parentId === parentCategory._id
    );
  }, [allCategories, parentCategory._id]);

  
  if (childCategories.length === 0) return null;
  
  
  

  const childCategoryIds = useMemo(
    () => childCategories.map(cat => cat._id),
  [childCategories]);


  const { data: products = [], isLoading } = useProducts({
    categories: childCategoryIds,
    limit: 3,
  });

if (true) {
    console.log(products);
    // childCategories.map(cat => console.log(cat.name));
  }
  
  if (!isLoading && products.length === 0) return null;

  return (
    <CollectionsScroller
      title={parentCategory.name}
      desc={`Explore our premium ${parentCategory.name.toLowerCase()} collection.`}
      products={products}
      category={parentCategory.slug}
      isLoading={isLoading}
    />
  );
});

DynamicCollection.displayName = "DynamicCollection";


function Home() {
  const { useCategories } = useCategoryServices();
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError,
  } = useCategories();

  
  const parentCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    return categories.filter((cat) => !cat.parentId);
  }, [categories]);

  return (
    <div className="mt-16">
      {/* Static Sections */}
      <HeroSection />
      <ShopByCatagory />

      {/* Dynamic Category Sections */}
      {!isCategoriesLoading &&
        !isError &&
        parentCategories.map((parent) => (
          <DynamicCollection
            key={parent._id}
            parentCategory={parent}
            allCategories={categories}
          />
        ))}

      {/* Footer Sections */}
      <Testimonials />
      <NewsLetter />
    </div>
  );
}

export default Home;
