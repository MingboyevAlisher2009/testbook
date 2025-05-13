import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECKRET, {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return token;
  } catch (error) {
    console.log("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

export const verifyToken = (token) => {
  try {
    if (!token) throw new Error("The token is invalid");

    return jwt.verify(token, process.env.JWT_SECKRET);
  } catch (error) {
    console.error("JWT verification error:", error);
    return new Error("Invalid token");
  }
};
