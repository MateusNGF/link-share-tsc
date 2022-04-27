import { getCustomRepository } from "typeorm";
import { Link } from "../../../entity";
import { LinkRepository } from "../../../repository";
import { File, Messenger, typeCustomRequest, typeCustomResponse } from "../../../utils";
import { Excel } from "../../../utils/Excel";
import { IController } from "../../protocols";

export class LinksExportsToExcel implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const userID = request.header["user"]["id"]
      const repositoryLink = getCustomRepository(LinkRepository)

      let links = await repositoryLink.find({ where : { owner : userID }})
      console.log(links)
      let CollumnsNames = ["type", "url", "createAt"]
      let CollumnsData = links.map((link : Link) => {
        return [link.type, link.url, link.createdAt]
      })

      let sheetLinks = new Excel("Links Creteded", CollumnsNames, CollumnsData)
      await sheetLinks.generate({type: "buffer"})

      let documentUploaded = await sheetLinks.upload(`reports/${userID}/excel/${File.generateHashName()}.xlsx`)
      return Messenger.success({ url : documentUploaded.Location || null});
    } catch (error) {
      return Messenger.error(error);
    }
  }
}