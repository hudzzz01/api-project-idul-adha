import cors from "cors"
import app from "./app.js";
import routerUser from "./router/router.user.js";
import routerAuth from "./router/router.auth.js";
import routerJamaah from "./router/router.jamaah.js";
import routerMasjid from "./router/router.masjid.js";
import routerPenerima from "./router/router.penerima.js";
import routerTokenKupon from "./router/router.token.kupon.js";
import routerFamily from "./router/router.family.js";
import routerZakat from "./router/router.zakat.js"; 
import routerSodakoh from "./router/router.sodakoh.js";
import routerFidyah from "./router/router.fidyah.js"; 
import routerInputZakat from "./router/v1_Router_InputZakat/router.input.zakat.js";

const port = 5000;
app.use(cors({
  origin: '*',
}));
app.use("/user",routerUser);
app.use("/auth",routerAuth);
app.use("/jamaah",routerJamaah);
app.use("/masjid",routerMasjid);
app.use("/penerima",routerPenerima);
app.use("/token-Kupon",routerTokenKupon);
app.use("/family",routerFamily);
app.use("/zakat",routerZakat);
app.use("/sodakoh",routerSodakoh);
app.use("/input-zakat",routerInputZakat);
app.use("/fidyah",routerFidyah);


app.listen(port)
console.log(`listen in ${port}`)
