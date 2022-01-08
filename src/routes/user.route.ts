import { Router } from "express"
import { Create, Access, Refresh } from '../controllers/user'
import { verify } from "../utils"
import { ExpressAdapterRouter } from "../utils/adapter"

export const userRouter = Router()

userRouter.post('/register', ExpressAdapterRouter.adapt(new Create()))
userRouter.post('/access', ExpressAdapterRouter.adapt(new Access()))
userRouter.get('/refresh', verify, ExpressAdapterRouter.adapt(new Refresh()))