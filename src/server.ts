import dotenv from 'dotenv'
import app from './app'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection().then(sucess => {
  dotenv.config()
  app.listen(process.env.port || 3000, () => { console.log("===>  ✅  Running server.  ✅  <===") })
}).catch(error => {
  console.log("Error in connected database");
})







