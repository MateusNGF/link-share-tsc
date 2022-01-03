import { Router } from "express"
import { create, access, refresh } from '../controllers/user'
import { verify } from "../utils"

export const userRouter = Router()

userRouter.post('/register', create)
userRouter.get('/access', access)
userRouter.get('/refresh', verify, refresh)