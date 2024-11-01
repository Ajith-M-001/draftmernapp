import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import { notFound } from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/connectDB.js";
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/v1/auth", authRoute);

// Catch all undefined routes
app.use(notFound);

// Global error handling middleware (after all other middlewares and routes)
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
    process.exit(1);
  }
};

start();

export default app;
