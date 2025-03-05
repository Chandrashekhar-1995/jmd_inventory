import Customer from "../models/customer.model.js";
import User from "../models/user.modal.js";

export const findUser = async (identifier) => {
    let user = await User.findOne({
        $or: [{ mobileNumber: identifier }, { email: identifier } ],
      });
      return user;
    };
  
export const findUserOrCustomer = async (identifier) => {
  let user = await User.findOne({
    $or: [{ email: identifier }, { mobileNumber: identifier }],
  });

  if (!user) {
    user = await Customer.findOne({
      $or: [{ email: identifier }, { mobileNumber: identifier }],
    });
  }

  return user;
};