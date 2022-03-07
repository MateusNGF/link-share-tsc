import multer from "multer";
import { Router } from "express";

import { ExpressAdapterRouter, verify } from "../utils";
import { Create, Access, Refresh, Update, ValidateEmail ,PicProfiles} from "../controllers/user";
import { StoragePicProfile } from "../database/configs/multer";
import { GetUser } from "../controllers/user/GetUser";

export const userRouter = Router();

userRouter.post("/register", ExpressAdapterRouter.adapt(new Create()));
userRouter.post("/access", ExpressAdapterRouter.adapt(new Access()));
userRouter.post("/validate", ExpressAdapterRouter.adapt(new ValidateEmail()));
userRouter.get("/refresh", verify, ExpressAdapterRouter.adapt(new Refresh()));
userRouter.put("/update", verify, ExpressAdapterRouter.adapt(new Update()));
userRouter.get("/visitor/:nickname", ExpressAdapterRouter.adapt(new GetUser()))
userRouter.put("/pic", verify, multer(new StoragePicProfile().config()).single("pic_profile"), ExpressAdapterRouter.adapt(new PicProfiles()));
