import dotenv from "dotenv";
import app from "./app";
import "reflect-metadata";
import { createConnection } from "typeorm";

try {
   dotenv.config();
   createConnection();
   const port = process.env.PORT || 3000;
   app.listen(port, () => {
      console.log("===>  ✅  Running server (" + port + ")  ✅  <===");
   });
} catch (e) {
   console.log("Error in connected database");
}
