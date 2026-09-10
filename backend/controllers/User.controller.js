import { User } from "../models/index.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["password_hash"]
            }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("getUsers error:", error);

        res.status(500).json({
            message: "Failed to get users"
        });
    }
};

export async function getUserById(req, res, next) {
    try {
        const user = await User.findByPk(
            req.user.id,
            {
                attributes: {
                    exclude: ['password_hash'],
                }
            }
        )
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json(user);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
}
export const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "name, email and password are required"
            });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            phone,
            password_hash
        });

        const response = user.toJSON();
        delete response.password_hash;

        res.status(201).json(response);
    } catch (error) {
        console.error("createUser error:", error);

        res.status(500).json({
            message: "Failed to create user"
        });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const {
            name,
            email,
            phone
        } = req.body;

        await user.update({
            name,
            email,
            phone
        });

        const response = user.toJSON();
        delete response.password_hash;

        res.status(200).json(response);
    } catch (error) {
        console.error("updateUser error:", error);

        res.status(500).json({
            message: "Failed to update user"
        });
    }
};