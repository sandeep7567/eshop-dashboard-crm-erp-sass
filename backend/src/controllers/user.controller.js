import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose"

// @desc - Register User
// @route - POST /api/v1/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, userName } = req.body;
  if (!email || !password || !userName || typeof email !== 'string'
    || typeof password !== 'string' || typeof userName !== 'string') {
    throw new ApiError(400, "All fields are required");
  };

  // existing user?
  const existingUser = await User.findOne({ email }).select("-password");

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists")
  };

  const user = await User.create({
    userName,
    email,
    password
  })

  const createdUser = await User.findById(user._id).select(
    "-password -token"
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully",)
  )

});

// @desc - Admin only Login User
// @route - POST /api/v1/auth/admin/login
// @access Admin/Private
const adminLogin = asyncHandler(async (req, res) => {
  const adminId = req.adminId;
  const { email, password } = req.body;

  if (!adminId || !email || !password) {
    throw new ApiError("301", "Invalid admin")
  };

  const adminLogin = await User.findById(adminId).exec();

  if (!adminLogin) {
    throw new ApiError(404, "User Not Found");
  };

  if (!adminLogin.email.includes(email)) {
    throw new ApiError(400, "Admin only login Credentials");
  }

  const isPasswordChecked = await adminLogin.isPasswordCorrect(password);

  if (!isPasswordChecked) {
    throw new ApiError(400, "Invalid Credentials");
  };

  const token = adminLogin.generateToken();

  const admin = await User.findOneAndUpdate(
    { _id: adminLogin?._id },
    { $set: { isLoggedIn: 1 }, $push: { loggedSessions: token } },
    { new: true }
  ).select("-password -loggedSessions").exec();

  if (!admin) {
    throw new ApiError(400, "admin error for update to login");
  };

  if (admin && admin?.isLoggedIn > 1) {
    throw new ApiError(400, "admin is login more than 1 Device at a time")
  }

  const options = {
    maxAge: null,
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
    httpOnly: process.env.NODE_ENV === 'production' ? true : false,
    secure: true,
    domain: req.hostname,
    Path: '/',
  };

  return res
    .status(200)
    .cookie("token", token, options) // set the access token in the cookie
    .json(
      new ApiResponse(
        200,
        {
          admin: {
            _id: admin._id,
            userName: admin?.userName,
            email: admin?.email,
            isAdmin: admin?.isAdmin,
            role: admin?.role,
            active: admin?.active,
            isLoggedIn: admin.isLoggedIn > 0 ? true : false,
            updatedAt: admin.updatedAt,
          }
        }, // send access and refresh token in response if client decides to save them by themselves
        "Admin logged in successfully",
      )
    );

});

// @desc - Login User
// @route - POST /api/v1/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || typeof email !== 'string'
    || typeof password !== 'string') {
    throw new ApiError(400, "All fields are required");
  };

  // // // URL address
  // const address = req.get("origin");

  // // Call parse() method using url module
  // let urlObject = url.parse(address, true);

  // const orginalHostname = urlObject.hostname;

  // let isLocalhost = false;
  // if (orginalHostname === '127.0.0.1' || orginalHostname === 'localhost') {
  //   // Connection is from localhost
  //   isLocalhost = true;
  // }

  const loginUser = await User.findOne({ email }).exec();

  if (!loginUser) {
    throw new ApiError(404, "User Not Found");
  };

  const isPasswordChecked = await loginUser.isPasswordCorrect(password);

  if (!isPasswordChecked) {
    throw new ApiError(400, "Invalid Credentials");
  };

  const token = loginUser.generateToken();

  const user = await User.findOneAndUpdate(
    { _id: loginUser?._id },
    { $set: { isLoggedIn: 1 }, $push: { loggedSessions: token } },
    { new: true }
  ).select("-password -token").exec();

  if (!user) {
    throw new ApiError(400, "User error for update to login");
  };

  if (user && user?.isLoggedIn > 1) {
    throw new ApiError(400, "User is login more than 1 Device at a time")
  }

  const options = {
    maxAge: null,
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
    httpOnly: process.env.NODE_ENV === 'production' ? true : false,
    secure: true,
    domain: req.hostname,
    Path: '/',
  };

  return res
    .status(200)
    .cookie("token", token, options) // set the access token in the cookie
    .json(
      new ApiResponse(
        200,
        {
          user: {
            _id: user._id,
            userName: user?.userName,
            email: user?.email,
            isAdmin: user?.isAdmin,
            role: user?.role,
            active: user?.active,
            isLoggedIn: user.isLoggedIn > 0 ? true : false,
          }
        }, // send access and refresh token in response if client decides to save them by themselves
        "User logged in successfully",
      )
    );
});

// @desc - Logout User/ Clear Cookie
// @route - POST /api/v1/auth/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  const {userId} = req.params;
  if (!isValidObjectId(userId)) {
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  };

  const user = await User.findById(userId);

  const token = user?.loggedSessions[0] ? user?.loggedSessions[0] : null;

  // updating before logout user
  const logoutUser = await User.findOneAndUpdate(
    { loggedSessions: user?.loggedSessions[0] },
    { $set: { isLoggedIn: 0 }, $pull: { loggedSessions: token } },
    { new: true },
  ).select("-password -loggedSessions").exec();

  if (!logoutUser) {
    throw new ApiError(404, "User already logged out");
  };

  const isLoggedOut = logoutUser?.isLoggedIn ? false : true;

  // res of logout
  return res.clearCookie('token', {
    maxAge: null,
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    domain: req.hostname,
    Path: '/',
    expires: new Date(0),
  }).json(
    new ApiResponse("200", { isLoggedOut }, "User Logged out")
  );

});

// @desc - Get User/Customer Self Profile
// @route - GET /api/v1/auth/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
})

// @desc - Update User/Customer Self Update Profiles
// @route - PUT /api/v1/auth/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
})

// @desc - Get Users
// @route - PUT /api/v1/auth/users
// @access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  if (!(req.user?._id)) {
    throw new ApiError(404, "User/Admin not found");
  }

  const getAllUsers = await User.find({}).select("-password -loggedSessions");

  return res.status(200).json(
    new ApiResponse(200, getAllUsers, "All users found By Admin Only successfully")
  );
});

// @desc - Get Users By Id
// @route - PUT /api/v1/auth/user/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new ApiError(404, "User not found");
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  };

  const userByID = await User.findById(id).select("-password -loggedSessions");

  if ((userByID?._id).toString() === id) {
    return res.status(200).json(
      new ApiResponse(200, userByID, "single user find through ID By Admin Only successfully")
    );
  } else {
    throw new ApiError(404, "User By Id Not Found, Verfiy Your ID");
  }

});

// @desc - Update User
// @route - PUT /api/v1/auth/user/:id
// @access Private/Admin
const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const { userName, email, password, isAdmin, role } = req.body;

  if (user) {
    user.email = email || user.email;
    user.userName = userName || user.userName;
    user.password = password || user.password;
    user.isAdmin = isAdmin || user.isAdmin;
    user.role = role || user.role;
  };

  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new ApiError(404, "User updation not done yet, try after sometime later");
  }

  return res.status(201).json(
    new ApiResponse(201, updateUser, "User Updation done by Admin")
  );

});

// @desc - Delete User
// @route - DELETE /api/v1/auth/users/:id
// @access Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findOneAndDelete({ _id: id });

  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  } else {
    return res.status(200).json(
      new ApiResponse(200, deletedUser, "User deleted By Admin successfully")
    );
  };
});

// @desc - Create User
// @route - POST /api/v1/auth/user/create
// @access Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const {
    email,
    userName,
    password,
    isAdmin,
    role,
    active
  } = req.body;

  const createUser = await new User({
    email,
    userName,
    password,
    isAdmin,
    role,
    active,
  }).save();

  const userCreatedByAdmin = createUser.toObject();

  if (userCreatedByAdmin) {
    return res.status(201).json(
      new ApiResponse(201, userCreatedByAdmin, "UserCreated By Admin Success")
    )
  } else {
    throw new ApiError(404, "User creation failed By Admin");
  };

});

export {
  adminLogin,
  registerUser,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  createUser,
  getUserByID,
  updateUserById,
  deleteUserById,
};