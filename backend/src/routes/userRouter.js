import axios from "axios";
import cookie from "cookie";
import { insertUser } from "../sqlite/queries/userQuery.js";
import { generateToken } from "../common/jwt.js";

async function wqLogin(username, password) {
  try {
    const response = await axios.post(
      "https://api.worldquantbrain.com/authentication",
      null,
      {
        auth: {
          username,
          password
        }
      }
    );

    const cookies = response.headers["set-cookie"];
    const jwtCookie = cookies.find(cookieStr => cookieStr.startsWith("t="));

    if (jwtCookie) {
      const parsedCookie = cookie.parse(jwtCookie);
      const jwtToken = parsedCookie.t;
      return jwtToken;
    } else {
      throw new Error("JWT not found in the response cookies");
    }
  } catch (error) {
    throw error;
  }
}

async function login(ctx) {
  const { username, password } = ctx.request.body;

  try {
    const jwtCookie = await wqLogin(username, password);
    await insertUser(ctx.db, username, password, jwtCookie);
    const token = generateToken(username);

    ctx.body = { message: "Login successful", data: { username, token } };
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = "Wrong username or password";
  }
}

export { login };
