import express from 'express'
import path from 'path'

import { linkRouter, userRouter } from './routes'
import { verify } from './utils';

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/files/:colletion/:filename", (req, res) => {
  res.sendFile(path.resolve(__dirname, "database", "documents", req.params.colletion, req.params.filename), (e) => {
    if (e) res.status(404).json({ status: false, message: "Colletion or name document not found." })
  })
})

app.use('/user', userRouter)
app.use('/link', linkRouter)

export default app;
