import {
    OrderItem,
    Product
} from "../models/index.js";


// GET /api/orders/:orderId/items
export const getOrderItems = async (req, res) => {
    try {
        const { orderId } = req.params;

        const items = await OrderItem.findAll({
            where: {
                order_id: orderId
            },
            include: [
                {
                    model: Product,
                    attributes: [
                        "id",
                        "name",
                        "price",
                        "image_url"
                    ]
                }
            ]
        });

        res.status(200).json(items);
    } catch (error) {
        console.error("getOrderItems error:", error);

        res.status(500).json({
            message: "Failed to get order items"
        });
    }
};


// GET /api/order-items/:id
export const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await OrderItem.findByPk(id, {
            include: [Product]
        });

        if (!item) {
            return res.status(404).json({
                message: "Order item not found"
            });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error("getOrderItemById error:", error);

        res.status(500).json({
            message: "Failed to get order item"
        });
    }
};