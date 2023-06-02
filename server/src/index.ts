import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { connect } from "./database/DbConnection";
import router from "./router/routes";
import { config } from "./config";

const app = express();
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
// Starting server only when db connected
connect()
  .then(() => {
    try {
      app.listen(config.PORT, () => {
        console.log(`server connected at http://localhost:${config.PORT}`);
      });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => {
    console.error("Cant establish db connection", error);
  });
