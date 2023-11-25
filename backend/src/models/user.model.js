import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isLoggedIn: { type: Number },
  loggedSessions: {
    type: [String],
    default: [],
  },
  active: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Seller", "Customer"],
    default: "Customer",
  },
  avatar: {
    type: String,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }
  ]
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.TOKEN_JWT_SECRET,
    { expiresIn: process.env.TOKEN_JWT_EXPIRY }
  )
};

const User = mongoose.model("User", UserSchema);

export default User;