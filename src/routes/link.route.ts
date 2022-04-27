import { Router } from "express"
import { CreateNewLink, DeleteLinkById, LinksExportsToExcel } from "../controllers"
import { ExpressAdapterRouter } from "../utils/adapter"
import { verify } from "../utils/JsonWebToken"


export const linkRouter = Router()

linkRouter.post('/create', verify, ExpressAdapterRouter.adapt(new CreateNewLink()))
linkRouter.delete('/:idLink/*', verify, ExpressAdapterRouter.adapt(new DeleteLinkById()))
linkRouter.get('/report/spreadsheet', verify,ExpressAdapterRouter.adapt(new LinksExportsToExcel()))
