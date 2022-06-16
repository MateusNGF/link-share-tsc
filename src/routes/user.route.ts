import multer from "multer";
import { Router } from "express";

import { ExpressAdapterRouter, verify } from "../utils";
import { CreateUserAccountController, AccessUserAccountController, Refresh, UpdateUserAccountDataController, ValidateUserAccountEmailController, ChangeProfilePictureUserController, ResetUserAccountPasswordController, GetUserAccountController } from "../controllers/user";
import { StoragePicProfile } from "../database/configs/multer";

export const userRouter = Router();

userRouter.post("/register", ExpressAdapterRouter.adapt(new CreateUserAccountController()));
userRouter.post("/access", ExpressAdapterRouter.adapt(new AccessUserAccountController()));
userRouter.post("/validate", ExpressAdapterRouter.adapt(new ValidateUserAccountEmailController()));
userRouter.get("/refresh", verify, ExpressAdapterRouter.adapt(new Refresh()));
userRouter.put("/update", verify, ExpressAdapterRouter.adapt(new UpdateUserAccountDataController()));
userRouter.get("/visitor/:nickname", ExpressAdapterRouter.adapt(new GetUserAccountController()))
userRouter.post("/pic", verify,
   multer(
      new StoragePicProfile().config()
   ).single("pic_profile"),
   ExpressAdapterRouter.adapt(new ChangeProfilePictureUserController())
);

userRouter.put("/reset_password/:step", ExpressAdapterRouter.adapt(new ResetUserAccountPasswordController()))