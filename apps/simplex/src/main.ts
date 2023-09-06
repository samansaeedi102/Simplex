import express, {Express} from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {blogApi} from "../../../libs/mainLib/src/api/blog/index";
import {userApi} from "../../../libs/mainLib/src/api/user/index";
import { redisConnections } from "../../../libs/utils/src/lib/connection/redis"
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const appp = express();
const app = async (
  app: Express,
  redisConnection: any
) => {
  app.use(bodyParser.json());
  mongoose.connect("mongodb://127.0.0.1:27017/simplex")
  .then(() => {
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
    app.get('/', (req, res) => {
      res.send(JSON.stringify({ name: "saman", family: "saeedi" }));
    });
    blogApi(app, redisConnection);
    userApi(app, redisConnection);
  })
}

app(appp, redisConnections)




