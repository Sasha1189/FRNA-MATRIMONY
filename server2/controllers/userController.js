const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
// const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");
//middleware
const requireSingIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
//AI provided function
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔹 Input validation
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    if (!password || (password.length < 8 && password.length > 20)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and not more than 20",
      });
    }

    // 🔹 Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this Email",
      });
    }

    // 🔹 Hash password
    const hashedPassword = await hashPassword(password);

    // ✅ Create new User
    const user = await User.create({ name, email, password: hashedPassword });

    // ✅ Auto-create an empty Profile
    const profile = await Profile.create({ userId: user._id });

    // ✅ Link Profile to User
    user.profile = profile._id;
    await user.save();

    // 🔹 Return success response with user details
    return res.status(201).json({
      success: true,
      message: "Registration successful! Please log in.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

//Login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide Email or Password",
      });
    }
    // find user-exist or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not registered with this Email",
      });
    }
    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    //TOKEN JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //undefined password-to hide password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login API",
      error,
    });
  }
};

//update user credentials
const updateUserController = async (req, res) => {
  try {
    //get updated data from request body
    const { name, password, email } = req.body;
    //validate password from client side
    if (password && password.length < 8) {
      return res.status(400).send({
        success: false,
        message: "Password required and minimum 8 character long",
      });
    }
    //find user from databae with the help of email
    const user = await userModel.findOne({ email });
    //Hash the password from request body..undefined means do not do any changes
    const hashedPassword = password ? await hashPassword(password) : undefined;
    //updated user
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { name: name || user.name, password: hashedPassword || user.password },
      { new: true }
    );
    updatedUser.password = undefined;
    //send responce
    res.status(200).send({
      success: true,
      message: "Profile updated please login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};
module.exports = {
  requireSingIn,
  registerController,
  loginController,
  updateUserController,
};
