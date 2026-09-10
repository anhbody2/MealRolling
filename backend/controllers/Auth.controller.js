import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { User } from "../models/index.js"

export async function register(req, res) {
    try {
        const {
            name,
            email,
            phone,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            phone: phone || null,
            password_hash: passwordHash
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                created_at: user.created_at
            }
        });

    } catch (error) {
        console.error("Create user error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    }
};
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(401).json({
                message: "Email or password incorrect"
            })
        };
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({
                message: "Email or password incorrect"
            })
        };
        const payload = {
            id: user.id,
            username: user.name,
        };
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRED_IN,
            }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '7d',
            }
        );
        await user.update({ refreshToken: refreshToken });
        res.status(200).json(
            { message: "Login successfully", accessToken }

        )
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Fail to login"
        })
    }
}
export async function refreshAccessToken(req, res) {
    const { token } = req.body;

    if (!token) return res.sendStatus(401);

    try {
        const user = await User.findOne({ where: { refreshToken: token } });
        if (!user || !user.refreshToken) return res.sendStatus(401);

        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        if (user.id !== decoded.id) {
            return res.sendStatus(403);
        }

        const payload = { id: user.id, username: user.username, role: user.role };

        const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.JWT_EXPIRED_IN
        });

        const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d'
        });

        await user.update({ refreshToken: newRefreshToken });

        return res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        if (req.body.token) {
            await User.update({ refreshToken: null }, { where: { refreshToken: token } });
        }
        return res.status(403).json({ message: 'Invalid or expired refresh token.' });
    }
}