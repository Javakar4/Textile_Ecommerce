import Category from "../models/CategorySchema.js";

export const categoryService = {
    async createCategory(data) {
        const exists = await Category.findOne({
            $or: [{ name: data.name }, { slug: data.slug }]
        });

        if (exists) {
            return { ok: false, message: "Category already exists" };
        }

        const category = await Category.create(data);
        return { ok: true, data: category };
    },

    async getAllCategories() {
        const categories = await Category.find().sort({ createdAt: -1 });
        return { ok: true, data: categories };
    },

    async getCategoryById(id) {
        const category = await Category.findById(id);
        if (!category) return { ok: false, message: "Category not found" };

        return { ok: true, data: category };
    },

    async updateCategory(id, data) {
        const category = await Category.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!category) return { ok: false, message: "Category not found" };
        return { ok: true, data: category };
    },

    async deleteCategory(id) {
        const category = await Category.findByIdAndDelete(id);
        if (!category) return { ok: false, message: "Category not found" };

        return { ok: true };
    }
};
