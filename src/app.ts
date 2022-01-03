import express from 'express'

import { linkRouter, userRouter } from './routes'

const app = express()
app.use(express.json())

app.use('/user', userRouter)
app.use('/link', linkRouter)

export default app;