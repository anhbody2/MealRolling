import { Category } from "../models/index.js";


// GET /api/categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [["id", "ASC"]]
        });

        res.status(200).json(categories);
    } catch (error) {
        console.error("getCategories error:", error);

        res.status(500).json({
            message: "Failed to get categories"
        });
    }
};


// GET /api/categories/:id
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error("getCategoryById error:", error);

        res.status(500).json({
            message: "Failed to get category"
        });
    }
};


// POST /api/categories
export const createCategory = async (req, res) => {
    try {
        const {
            name,
            description
        } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const existingCategory = await Category.findOne({
            where: { name }
        });

        if (existingCategory) {
            return res.status(409).json({
                message: "Category already exists"
            });
        }

        const category = await Category.create({
            name,
            description
        });

        res.status(201).json(category);
    } catch (error) {
        console.error("createCategory error:", error);

        res.status(500).json({
            message: "Failed to create category"
        });
    }
};


// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        const {
            name,
            description
        } = req.body;

        await category.update({
            name,
            description
        });

        res.status(200).json(category);
    } catch (error) {
        console.error("updateCategory error:", error);

        res.status(500).json({
            message: "Failed to update category"
        });
    }
};


// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        await category.destroy();

        res.status(200).json({
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.error("deleteCategory error:", error);

        res.status(500).json({
            message: "Failed to delete category"
        });
    }
};