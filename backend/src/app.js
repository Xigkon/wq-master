import Koa from "koa";
import userRoutes from "./routes/useRoutes.js";
import koaBodyparser from 'koa-bodyparser';

const app = new Koa();

app.use(koaBodyparser());
app.use(userRoutes.routes());

app.listen(3000, () => {
  console.log("Server is running on http://0.0.0.0:3000");
});
