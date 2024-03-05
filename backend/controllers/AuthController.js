import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = UserModel({username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(201).json({message: "User Created Successfully"});
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await UserModel.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials."));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECERET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now(), 3600000); // 1 hour
        res.cookie('access_token', token, { httponly: true }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

