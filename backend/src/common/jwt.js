import dotenv from "dotenv";
import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(username) {
  const payload = {
    username
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  return token;
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // 验证 token 并解码
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}

export { generateToken, verifyToken };
