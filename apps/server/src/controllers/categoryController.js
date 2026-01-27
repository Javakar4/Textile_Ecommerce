import mongoose from "mongoose";
import { categoryService } from "../services/categoryService.js";

export const createCategory = async (req, res) => {
    try {
        const result = await categoryService.createCategory(req.body);

        if (!result.ok) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        return res.status(201).json({
            success: true,
            data: result.data
        });
    } catch (err) {
        console.error("createCategory error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to create category"
        });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const result = await categoryService.getAllCategories();

        return res.status(200).json({
            success: true,
            data: result.data
        });
    } catch (err) {
        console.error("getAllCategories error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category id"
            });
        }

        const result = await categoryService.getCategoryById(id);

        if (!result.ok) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }

        return res.status(200).json({
            success: true,
            data: result.data
        });
    } catch (err) {
        console.error("getCategoryById error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch category"
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category id"
            });
        }

        const result = await categoryService.updateCategory(id, req.body);

        if (!result.ok) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }

        return res.status(200).json({
            success: true,
            data: result.data
        });
    } catch (err) {
        console.error("updateCategory error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to update category"
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category id"
            });
        }

        const result = await categoryService.deleteCategory(id);

        if (!result.ok) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (err) {
        console.error("deleteCategory error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete category"
        });
    }
};
