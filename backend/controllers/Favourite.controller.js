import {
    Favorite,
    Product
} from "../models/index.js";


// GET /api/users/:userId/favorites
export const getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;

        const favorites = await Favorite.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: Product,
                    attributes: [
                        "id",
                        "name",
                        "price",
                        "description",
                        "image_url"
                    ]
                }
            ],
            order: [["created_at", "DESC"]]
        });

        res.status(200).json(favorites);
    } catch (error) {
        console.error("getFavorites error:", error);

        res.status(500).json({
            message: "Failed to get favorites"
        });
    }
};


// POST /api/users/:userId/favorites/:productId
export const addFavorite = async (req, res) => {
    try {
        const {
            userId,
            productId
        } = req.params;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const [favorite, created] =
            await Favorite.findOrCreate({
                where: {
                    user_id: userId,
                    product_id: productId
                },
                defaults: {
                    user_id: userId,
                    product_id: productId
                }
            });

        if (!created) {
            return res.status(409).json({
                message: "Product already in favorites"
            });
        }

        res.status(201).json(favorite);
    } catch (error) {
        console.error("addFavorite error:", error);

        res.status(500).json({
            message: "Failed to add favorite"
        });
    }
};


// DELETE /api/users/:userId/favorites/:productId
export const removeFavorite = async (req, res) => {
    try {
        const {
            userId,
            productId
        } = req.params;

        const favorite = await Favorite.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        if (!favorite) {
            return res.status(404).json({
                message: "Favorite not found"
            });
        }

        await favorite.destroy();

        res.status(200).json({
            message: "Favorite removed successfully"
        });
    } catch (error) {
        console.error("removeFavorite error:", error);

        res.status(500).json({
            message: "Failed to remove favorite"
        });
    }
};


// GET /api/users/:userId/favorites/:productId
export const checkFavorite = async (req, res) => {
    try {
        const {
            userId,
            productId
        } = req.params;

        const favorite = await Favorite.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        res.status(200).json({
            isFavorite: Boolean(favorite)
        });
    } catch (error) {
        console.error("checkFavorite error:", error);

        res.status(500).json({
            message: "Failed to check favorite"
        });
    }
};