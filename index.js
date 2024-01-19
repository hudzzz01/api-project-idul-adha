import cors from "cors"
import app from "./app.js";
import routerUser from "./router/router.user.js";
import routerAuth from "./router/router.auth.js";
import routerJamaah from "./router/router.jamaah.js";

const port = 5000;
app.use(cors({
  origin: '*',
}));
app.use("/user",routerUser);
app.use("/auth",routerAuth);
app.use("/jamaah",routerJamaah);


app.listen(port)
console.log(`listen in ${port}`)
