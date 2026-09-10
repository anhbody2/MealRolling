import {
    Order,
    OrderItem,
    Product,
    User
} from "../models/index.js";


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: OrderItem,
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
                }
            ],
            order: [["id", "DESC"]]
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error("getOrders error:", error);

        res.status(500).json({
            message: "Failed to get orders"
        });
    }
};


export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: OrderItem,
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
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("getOrderById error:", error);

        res.status(500).json({
            message: "Failed to get order"
        });
    }
};


export const createOrder = async (req, res) => {
    try {
        const {
            user_id,
            recipient_name,
            phone,
            address,
            items
        } = req.body;

        if (
            !user_id ||
            !recipient_name ||
            !phone ||
            !address ||
            !items ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                message: "Invalid order data"
            });
        }

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findByPk(item.product_id);

            if (!product) {
                return res.status(404).json({
                    message: `Product ${item.product_id} not found`
                });
            }

            if (item.quantity <= 0) {
                return res.status(400).json({
                    message: "Quantity must be greater than 0"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`
                });
            }

            const subtotal =
                Number(product.price) * item.quantity;

            totalAmount += subtotal;

            orderItems.push({
                product_id: product.id,
                quantity: item.quantity,
                unit_price: product.price
            });
        }

        const order = await Order.create({
            user_id,
            recipient_name,
            phone,
            address,
            status: "pending",
            total_amount: totalAmount
        });

        for (const item of orderItems) {
            await OrderItem.create({
                order_id: order.id,
                ...item
            });
        }

        const createdOrder = await Order.findByPk(order.id, {
            include: [
                {
                    model: OrderItem,
                    include: [Product]
                }
            ]
        });

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("createOrder error:", error);

        res.status(500).json({
            message: "Failed to create order"
        });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "confirmed",
            "preparing",
            "shipping",
            "completed",
            "cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        await order.update({
            status
        });

        res.status(200).json(order);
    } catch (error) {
        console.error("updateOrderStatus error:", error);

        res.status(500).json({
            message: "Failed to update order status"
        });
    }
};


// DELETE /api/orders/:id
export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (
            order.status === "completed" ||
            order.status === "cancelled"
        ) {
            return res.status(400).json({
                message: "Order cannot be cancelled"
            });
        }

        await order.update({
            status: "cancelled"
        });

        res.status(200).json({
            message: "Order cancelled successfully",
            order
        });
    } catch (error) {
        console.error("cancelOrder error:", error);

        res.status(500).json({
            message: "Failed to cancel order"
        });
    }
};