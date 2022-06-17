import { Router } from "express"
import { CreateLinkInUserAccountController, DeleteLinkUserAccountController, LinksExportsToExcel } from "../controllers"
import { expressAdapterRouter } from "../utils"
import { verify } from "../utils/JsonWebToken"


export const linkRouter = Router()

linkRouter.post('/create', verify, expressAdapterRouter(new CreateLinkInUserAccountController()))
linkRouter.delete('/:idLink/*', verify, expressAdapterRouter(new DeleteLinkUserAccountController()))
linkRouter.get('/report/spreadsheet', verify,expressAdapterRouter(new LinksExportsToExcel()))
