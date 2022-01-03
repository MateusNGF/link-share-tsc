import { Router } from "express"
import { deletar, insert } from "../controllers/link"
import { verify } from "../utils/JsonWebToken"


export const linkRouter = Router()

linkRouter.post('/create', verify, insert)
linkRouter.delete('/:idLink/*', verify, deletar)