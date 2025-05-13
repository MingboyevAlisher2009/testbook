import { compare, hash } from "bcrypt";
import UserModel from "../model/users.model.js";
import { generateToken } from "../utils/token.js";

const errorResponse = (res, status, message) => {
  return res.status(status).json({
    status: "error",
    message,
  });
};

const successResponse = (res, status, data) => {
  return res.status(status).json({
    status: "success",
    data,
  });
};

export const signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return errorResponse(res, 400, {
        message: "User name and password are required.",
      });
    }
    const existUser = await UserModel.findOne({ username });

    if (existUser) {
      return errorResponse(res, 400, {
        message: "User already exist.",
      });
    }

    const hashedPassword = await hash(password, 10);

    const user = await UserModel.create({ username, password: hashedPassword });

    generateToken(res, user._id);

    successResponse(res, 201, { message: "User succefully created." });
  } catch (error) {
    console.log("Creating error:", error);

    return errorResponse(res, 500, error);
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return errorResponse(res, 400, {
        message: "User name and password are required.",
      });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return errorResponse(res, 404, { message: "User not found." });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return errorResponse(res, 401, {
        message: "Invalid credentials",
      });
    }

    generateToken(res, user._id);

    return successResponse(res, 200, { message: "Login successful" });
  } catch (error) {
    console.log("Sign in error:", error);

    return errorResponse(res, 500, error);
  }
};

export const getMe = async (req, res) => {
  const { userId } = req;
  try {
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return errorResponse(res, 404, { message: "User not found" });
    }

    return successResponse(res, 200, user);
  } catch (error) {
    console.log("Profile error:", error);
    return errorResponse(res, 500, error);
  }
};
