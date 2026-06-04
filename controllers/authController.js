import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { User } from "../models/User.js";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn
    }
  );
};

// Register User
export const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role = "organizer"
  } = req.body;

  const existingUser = await User.findOne({
    email: email.toLowerCase()
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "Email already exists."
    );
  }

  if (password.length < 8) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters."
    );
  }

  const passwordHash = await bcrypt.hash(
    password,
    12
  );

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role
  });

  const token = generateToken(user);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Login User
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email.toLowerCase()
  }).select("+passwordHash");

  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password."
    );
  }

  console.log("User found:", user);
  console.log("Password from request:", password);
  console.log("Password hash from DB:", user.passwordHash);

  const isMatch = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isMatch) {
    throw new ApiError(
      401,
      "Invalid email or password."
    );
  }

  const token = generateToken(user);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Current Logged-in User
export const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

// Logout
export const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful"
  });
});