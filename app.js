import express from "express"
import cors from "cors"

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
}));

app.get('/', function (req, res) {
  res.send({"key":"it's work"})
})

export default app;

