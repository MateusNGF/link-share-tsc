"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressAdapterRouter {
    static adapt(controller) {
        return async (req, res) => {
            const customRequest = {
                body: req.body, params: req.params, query: req.query, header: req.header, file: req.file, files: req.files
            };
            const httpResponse = await controller.exec(customRequest);
            res.status(httpResponse.statusCode).json(httpResponse.body);
        };
    }
}
exports.ExpressAdapterRouter = ExpressAdapterRouter;
