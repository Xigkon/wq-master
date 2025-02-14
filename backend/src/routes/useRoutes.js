import Router from "koa-router";
import { login } from "./userRouter.js";

const router = new Router();

// router.get("/test", test)
router.post("/login", login);

export default router;
