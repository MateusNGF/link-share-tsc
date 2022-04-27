import moment from "moment";
import { getCustomRepository } from "typeorm";
import { Link } from "../../../entity";
import { LinkRepository } from "../../../repository";
import { File, Messenger, typeCustomRequest, typeCustomResponse } from "../../../utils";
import { Excel } from "../../../utils/Spreadsheets/Excel";
import { IController } from "../../protocols";

export class LinksExportsToExcel implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const userID = request.header["user"]["id"]
      const repositoryLink = getCustomRepository(LinkRepository)

      let links = await repositoryLink.find({ where : { owner : userID }})
  
      let CollumnsNames = ["type", "url", "createAt"]
      let CollumnsData = links.map((link : Link) => {
        return [link.type, link.url, moment(link.createdAt).format("D/M/YY HH:mm")]
      })

      let sheetLinks = new Excel("Links createded", CollumnsNames, CollumnsData)
      await sheetLinks.generate({type: "buffer"})

      let documentUploaded = await sheetLinks.upload(`reports/${userID}/${File.generateHashName()}.xlsx`)
      return Messenger.success({ url : documentUploaded.Location || null});
    } catch (error) {
      return Messenger.error(error);
    }
  }
}