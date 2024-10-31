import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Test database connection
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log("Error: " + err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
