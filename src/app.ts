import express from 'express'
import path from 'path'

import { linkRouter, userRouter } from './routes'
import { verify } from './utils';

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/d/documents/*", verify,express.static(path.resolve(__dirname, "database", "documents")))

app.use('/user', userRouter)
app.use('/link', linkRouter)

export default app;
