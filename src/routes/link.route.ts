import { Router } from "express"
import { DeleteLinkById, CreateNewLink } from "../controllers/link"
import { ExpressAdapterRouter } from "../utils/adapter"
import { verify } from "../utils/JsonWebToken"


export const linkRouter = Router()

linkRouter.post('/create', verify, ExpressAdapterRouter.adapt(new CreateNewLink()))
linkRouter.delete('/:idLink/*', verify, ExpressAdapterRouter.adapt(new DeleteLinkById()))