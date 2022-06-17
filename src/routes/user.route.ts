import multer from "multer";
import { Router } from "express";

import { CreateUserAccountController, AccessUserAccountController, Refresh, UpdateUserAccountDataController, ValidateUserAccountEmailController, ChangeProfilePictureUserController, ResetUserAccountPasswordController, GetUserAccountController } from "../controllers/user";
import { StoragePicProfile } from "../database/configs/multer";
import { expressAdapterRouter, verify } from "../utils";

export const userRouter = Router();

userRouter.post("/register", expressAdapterRouter(new CreateUserAccountController()));
userRouter.post("/access", expressAdapterRouter(new AccessUserAccountController()));
userRouter.post("/validate", expressAdapterRouter(new ValidateUserAccountEmailController()));
userRouter.get("/refresh", verify, expressAdapterRouter(new Refresh()));
userRouter.put("/update", verify, expressAdapterRouter(new UpdateUserAccountDataController()));
userRouter.get("/visitor/:nickname", expressAdapterRouter(new GetUserAccountController()))
userRouter.post("/pic", verify,
   multer(
      new StoragePicProfile().config()
   ).single("pic_profile"),
   expressAdapterRouter(new ChangeProfilePictureUserController())
);

userRouter.put("/reset_password/:step", expressAdapterRouter(new ResetUserAccountPasswordController()))