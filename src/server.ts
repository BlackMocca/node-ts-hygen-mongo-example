import express from "express";
import bodyParser from "body-parser";
import { env } from "./common/constants/config";
import { MongoConnection } from "./common/utils/connection";
import mongoose, { Mongoose, MongooseError } from "mongoose";

var connectingMongo = async () => {
  var mongoClient = new MongoConnection(env.MONGODB_URI);
  await mongoClient.connect();
};

var serveApp = () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: "100mb" }));

  // respond with "hello world" when a GET request is made to the homepage
  app.get("/", (req, res) => {
    res.status(200).send("GET request to the homepage");
  });

  // POST method route
  app.post("/", (req, res) => {
    res.status(200).send("POST request to the homepage");
  });

  app.listen(env.PORT, () => {
    console.log(`server is running on http://127.0.0.1:${env.PORT}`);
  });
};

var bootstrapApp = async () => {
  await connectingMongo();
  await serveApp();
};

bootstrapApp();

// const shutdown = signals.init(async () => {
//   await db.close();
//   await server.close();
// });

// (async () => {
//   try {
//     await db.connect();
//   } catch (error) {
//     await shutdown();
//   }
// })();
