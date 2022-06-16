import { Router } from "express"
import { CreateNewLink, DeleteLinkById, LinksExportsToExcel } from "../controllers"
import { expressAdapterRouter } from "../utils"
import { verify } from "../utils/JsonWebToken"


export const linkRouter = Router()

linkRouter.post('/create', verify, expressAdapterRouter(new CreateNewLink()))
linkRouter.delete('/:idLink/*', verify, expressAdapterRouter(new DeleteLinkById()))
linkRouter.get('/report/spreadsheet', verify,expressAdapterRouter(new LinksExportsToExcel()))
