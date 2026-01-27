import mongoose from "mongoose";
import { brandService } from "../services/brandService.js";

export const createBrand = async (req, res) => {
    try {
        const result = await brandService.createBrand(req.body);

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
        console.error("createBrand error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to create brand"
        });
    }
};

export const getAllBrands = async (req, res) => {
    try {
        const result = await brandService.getAllBrands();

        return res.status(200).json({
            success: true,
            data: result.data
        });
    } catch (err) {
        console.error("getAllBrands error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch brands"
        });
    }
};

export const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid brand id"
            });
        }

        const result = await brandService.getBrandById(id);

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
        console.error("getBrandById error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch brand"
        });
    }
};

export const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid brand id"
            });
        }

        const result = await brandService.updateBrand(id, req.body);

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
        console.error("updateBrand error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to update brand"
        });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid brand id"
            });
        }

        const result = await brandService.deleteBrand(id);

        if (!result.ok) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Brand deleted successfully"
        });
    } catch (err) {
        console.error("deleteBrand error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete brand"
        });
    }
};
