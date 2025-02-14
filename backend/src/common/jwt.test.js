import { expect } from "chai";
import { generateToken, verifyToken } from "./jwt.js";
import jwt from "jsonwebtoken";

describe("JWT Token functions", () => {
  const testUsername = "testuser";
  let token;

  it("should generate a token", () => {
    token = generateToken(testUsername);
    expect(token).to.be.a("string");
    expect(token).to.have.length.greaterThan(0); // 生成的 token 应该是一个非空字符串
  });

  it("should verify a valid token", () => {
    const decoded = verifyToken(token);
    expect(decoded).to.be.an("object");
    expect(decoded.username).to.equal(testUsername);
  });

  it("should throw error for invalid token", () => {
    const invalidToken = "invalid_token";
    try {
      verifyToken(invalidToken);
    } catch (err) {
      expect(err).to.be.an("error");
    }
  });
});
