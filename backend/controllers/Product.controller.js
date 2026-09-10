import {
    Product,
    Category
} from "../models/index.js";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    attributes: ["id", "name"]
                }
            ],
            order: [["id", "ASC"]]
        });

        res.status(200).json(products);
    } catch (error) {
        console.error("getProducts error:", error);

        res.status(500).json({
            message: "Failed to get products"
        });
    }
};


export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    attributes: ["id", "name"]
                }
            ]
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("getProductById error:", error);

        res.status(500).json({
            message: "Failed to get product"
        });
    }
};


export const createProduct = async (req, res) => {
    try {
        const {
            category_id,
            name,
            price,
            ingredients,
            description,
            stock,
            image_url
        } = req.body;

        if (!category_id || !name || price === undefined) {
            return res.status(400).json({
                message: "category_id, name and price are required"
            });
        }

        const category = await Category.findByPk(category_id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        const product = await Product.create({
            category_id,
            name,
            price,
            ingredients,
            description,
            stock,
            image_url
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("createProduct error:", error);

        res.status(500).json({
            message: "Failed to create product"
        });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const {
            category_id,
            name,
            price,
            ingredients,
            description,
            stock,
            image_url
        } = req.body;

        if (category_id !== undefined) {
            const category = await Category.findByPk(category_id);

            if (!category) {
                return res.status(404).json({
                    message: "Category not found"
                });
            }
        }

        await product.update({
            category_id,
            name,
            price,
            ingredients,
            description,
            stock,
            image_url
        });

        res.status(200).json(product);
    } catch (error) {
        console.error("updateProduct error:", error);

        res.status(500).json({
            message: "Failed to update product"
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await product.destroy();

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("deleteProduct error:", error);

        res.status(500).json({
            message: "Failed to delete product"
        });
    }
};