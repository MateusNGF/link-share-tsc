import app from './app'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection().then(sucess => {
  app.listen(process.env.port, () => { console.log("====>===>===>==>==>=>=> Running server.") })
}).catch(error => {
  console.log("Error in connected in database");
})





