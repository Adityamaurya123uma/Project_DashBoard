import { errorHandler } from "../utils/ErrorHandler.js";
import bcryptjs from 'bcryptjs';
import UserModel from "../models/UserModel.js";

export const userController = (req, res) => {
    res.json({
        message: "API in Controller",
    });
};


export const updateUser = async (req, res, next) => {
    if (res.user.id !== req.params.id) {
        return next(errorHandler(401,"You can update only your account!"))
    }
    try {
        if (req.body.password) {
          req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
    
        const updatedUser = await UserModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              profilePicture: req.body.profilePicture,
            },
          },
          { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
      } catch (error) {
        next(error);
      }  

}

