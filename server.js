import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import { fileURLToPath } from 'url'; // Import fileURLToPath from url module
import { dirname } from 'path'; // Import dirname from path module
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path';

// Get the current module file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current module file
const __dirname = dirname(__filename);

// Configure env
dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Rest API
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// PORT
const PORT = process.env.PORT || 8080;

// Run server
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
