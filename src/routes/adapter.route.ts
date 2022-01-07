import { Router } from "express"
import { ExpressAdapterRouter } from "../utils/adapter"
import { AdapterTester } from "../utils/adapter/AdapterTesteController"


export const adapterRouter = Router()

adapterRouter.post('/', ExpressAdapterRouter.adapt(new AdapterTester()))