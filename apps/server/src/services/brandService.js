import Brand from "../models/BrandSchema.js";

export const brandService = {
    async createBrand(data) {
        const exists = await Brand.findOne({
            $or: [{ name: data.name }, { slug: data.slug }]
        });

        if (exists) {
            return { ok: false, message: "Brand already exists" };
        }

        const brand = await Brand.create(data);
        return { ok: true, data: brand };
    },

    async getAllBrands() {
        const brands = await Brand.find().sort({ createdAt: -1 });
        return { ok: true, data: brands };
    },

    async getBrandById(id) {
        const brand = await Brand.findById(id);
        if (!brand) return { ok: false, message: "Brand not found" };

        return { ok: true, data: brand };
    },

    async updateBrand(id, data) {
        const brand = await Brand.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!brand) return { ok: false, message: "Brand not found" };
        return { ok: true, data: brand };
    },

    async deleteBrand(id) {
        const brand = await Brand.findByIdAndDelete(id);
        if (!brand) return { ok: false, message: "Brand not found" };

        return { ok: true };
    }
};
