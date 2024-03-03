import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = UserModel({username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(201).json({message: "User Created Successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
};
