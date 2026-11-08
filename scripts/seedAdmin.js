
import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import User from "../models/user.model.js";

const seedAdmin = async () => {
    try {
        const name = process.env.SEED_ADMIN_NAME?.trim();
        const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
        const password = process.env.SEED_ADMIN_PASSWORD;

        // Check required environment variables
        if (!name || !email || !password) {
            throw new Error("Please provide all SEED_ADMIN environment variables.");
        }

        if (password.length < 8) {
            throw new Error("Admin password must be at least 8 characters.");
        }

        // Connect to MongoDB
        await connectDB();

        // Prevent duplicate admin creation
        const existingAdmin = await User.findOne({ role: "admin" });

        if (existingAdmin) {
            throw new Error("An admin account already exists. Seed operation cancelled.");
        }

        // Prevent duplicate email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("This email is already registered.");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin account created successfully!");
        console.log(`Admin Email: ${admin.email}`);
        console.log(`Admin ID: ${admin._id}`);

    } catch (error) {
        console.error("Admin seed failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seedAdmin();
