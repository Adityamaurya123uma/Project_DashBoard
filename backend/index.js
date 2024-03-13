import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoute.js';
import authRoutes from './routes/AuthRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to the DataBase");
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Hey there!!!");
})

//Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error..."
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});
