import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoute.js';
import authRoutes from './routes/AuthRoute.js';

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to the DataBase");
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Hey there!!!");
})

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
