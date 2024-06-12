import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: 3600,
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, surname } = req.body;
  try {
    // check if user email exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "This email already exists",
      });
    }

    user = new User({
      name,
      surname,
      email,
      password,
    });

    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
      message: "User is registered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message + "Internal server error, Try again",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      // If password match, generate token
      const token = generateToken(user);

      const { password, role, ...rest } = user._doc;

      return res.status(200).json({
        status: true,
        message: "Successfully login",
        token,
        data: { ...rest },
        role,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
  });
};
