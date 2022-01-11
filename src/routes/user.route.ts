import multer from "multer"
import { Router } from "express"

import { verify } from "../utils"
import { ExpressAdapterRouter } from "../utils/adapter"
import { Create, Access, Refresh } from '../controllers/user'
import { StoragePicBanner, StoragePicProfile } from "../database/configs/multer"

export const userRouter = Router()


userRouter.post('/register',
  multer(new StoragePicProfile().config()).single("pic_profile"),
  ExpressAdapterRouter.adapt(new Create()))

userRouter.post('/access', ExpressAdapterRouter.adapt(new Access()))
userRouter.get('/refresh', verify, ExpressAdapterRouter.adapt(new Refresh()))

userRouter.post('/pic', multer(new StoragePicProfile().config()).single("pic_profile"), (req, res) => {
  console.log(req.file)
})
