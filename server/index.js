import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import candidateRoutes from "./routes/candidateRoutes.js";

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoApi);
        console.log("MongoDB Connected!");
    } catch (err) {
        console.error("Connection Error:", err);
        process.exit(1);
    }
};

// routes
app.use("/api/candidates", candidateRoutes);

app.get("/", (req, res) => {
    res.send("API is Running...");
});

// start
const PORT = process.env.PORT || 3000;
connectDB();

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;