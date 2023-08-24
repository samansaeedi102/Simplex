import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/simplex")
  .then(() => {
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  })
app.get('/', (req, res) => {
  res.send(JSON.stringify({ name: "saman", family: "saeedi" }));
});


