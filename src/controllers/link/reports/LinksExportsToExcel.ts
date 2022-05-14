import moment from "moment";
import { getCustomRepository } from "typeorm";
import { Link } from "../../../entity";
import { LinkRepository } from "../../../repository";
import { File, Messenger, typeCustomRequest, typeCustomResponse } from "../../../utils";
import { Excel } from "../../../utils/Spreadsheets";
import { IController } from "../../protocols";

export class LinksExportsToExcel implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const userID = request.header["user"]["id"]
      const repositoryLink = getCustomRepository(LinkRepository)

      let links = await repositoryLink.find({ where: { owner: userID } })

      let path = `reports/${userID}/${File.generateHashName()}.xlsx`
      let ColumnNames = ["TYPE", "TAG", "CONTEXT", "CREATE"]
      let CollumnsData = links.map((link: Link) => {
        return [link.type, link.tag, link.context, moment(link.createdAt).format("D/M/YY HH:mm")]
      })

      const document = await new Excel("Links", ColumnNames, CollumnsData, 
      [{
        column_name: "url",
        style: {
          width: 50
        }
      }]).build(path)

      return Messenger.success({ url : document.Location || null});
    } catch (error) {
      return Messenger.error(error);
    }
  }
}