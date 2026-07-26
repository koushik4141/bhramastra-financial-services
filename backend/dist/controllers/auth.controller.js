"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.googleLogin = googleLogin;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-brahmastra-jwt-key";
async function register(req, res) {
    try {
        const { email, password, name, referrerId } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        // Create user. If it is the first user, make them ADMIN to allow admin dashboard operations
        const userCount = await prisma_1.default.user.count();
        const role = userCount === 0 ? "ADMIN" : "USER";
        const user = await prisma_1.default.user.create({
            data: {
                email,
                name,
                passwordHash,
                role,
            },
        });
        // Handle referral if referrerId is provided
        if (referrerId && referrerId !== user.id) {
            const referrer = await prisma_1.default.user.findUnique({ where: { id: referrerId } });
            if (referrer) {
                await prisma_1.default.referral.create({
                    data: {
                        referrerId,
                        referredUserId: user.id,
                    },
                });
            }
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Registration failed" });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValidPassword) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Login failed" });
    }
}
async function googleLogin(req, res) {
    try {
        const { googleId, email, name } = req.body;
        if (!googleId || !email) {
            return res.status(400).json({ error: "Google credentials missing" });
        }
        let user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma_1.default.user.create({
                data: {
                    email,
                    name,
                    googleId,
                    role: "USER",
                },
            });
        }
        else if (!user.googleId) {
            user = await prisma_1.default.user.update({
                where: { email },
                data: { googleId },
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).json({
            message: "Google login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Google OAuth failed" });
    }
}
