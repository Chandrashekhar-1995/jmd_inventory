import User from "../models/user.modal.js";

export const findUser = async (identifier) => {
    let user = await User.findOne({
        $or: [{ mobileNumber: identifier }, { email: identifier } ],
      });
      return user;
    };