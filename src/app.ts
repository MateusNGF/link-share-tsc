import express from 'express'

import { adapterRouter, linkRouter, userRouter } from './routes'

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRouter)
app.use('/link', linkRouter)
app.use('/adapter', adapterRouter)

export default app;
