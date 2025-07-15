import User from "../models/User.js";

// Description Get current user profile
// Route -> GET /api/users/me
// Access -> Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error!",
      error: error.message
    });
  }
};

// Description Get all users
// Route GET /api/users
// Access Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Description Get recent users (last 5 days)
// Route GET /api/users/recent
// Access Private/Admin
export const getRecentUsers = async (req, res) => {
  try {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const users = await User.find({
      createdAt: { $gte: fiveDaysAgo },
    }).select("-password");
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Description Delete user
// Route DELETE /api/users/:id
// Access Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }
    await user.deleteOne();
    res.json({
      success: true,
      message: "User removed!"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Description Update user photo
// Route POST /api/users/me/photo
// Access Private
export const updateUserPhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (req.file) {
      user.photo = req.file.path;
      await user.save();
    }

    res.json({
      success: true,
      photo: user.photo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// export default {
//   deleteUser,
//   getMe,
//   getUsers,
//   getRecentUsers,
//   updateUserPhoto
// };