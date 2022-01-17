import multer from "multer"
import { Router } from "express"

import { ExpressAdapterRouter, verify } from "../utils"
import { Create, Access, Refresh, Update } from '../controllers/user'
import { StoragePicProfile } from "../database/configs/multer"

export const userRouter = Router()


userRouter.post('/register', ExpressAdapterRouter.adapt(new Create()))
userRouter.post('/access', ExpressAdapterRouter.adapt(new Access()))
userRouter.get('/refresh', verify, ExpressAdapterRouter.adapt(new Refresh()))
userRouter.put('/update', verify, ExpressAdapterRouter.adapt(new Update()))

userRouter.post('/pic', multer(new StoragePicProfile().config()).single("pic_profile"), (req, res) => {
  console.log(req.file)
})
