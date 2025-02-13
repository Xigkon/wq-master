import Router from "koa-router";

const router = new Router();

async function test(ctx) {
  try {
    let response = {
      status: "ok"
    };
    ctx.body = response;
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = "error";
  }
}

router.get("/test", test)

export default router;
