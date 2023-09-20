import User from "../models/UserSchema.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users were found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: Users not found",
    });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const singleUser = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "User was found",
      data: singleUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User was not found",
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully user updated",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully user deleted",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};
