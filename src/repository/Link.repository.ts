import { EntityRepository, Repository } from "typeorm";

import { Link } from "../entity";
import { DataNotFound } from "../utils";
import message from '../utils/configs/texts.config'

@EntityRepository(Link)
export class LinkRepository extends Repository<Link> {

  async deleteLinkById(id_link: string) {
    const idSearched: Link = await this.findOne({ where: { id_link } })
    if (!idSearched) throw new DataNotFound(message.ptbr.entities.link.errors.notFound)
    this.remove(idSearched)
    return true
  }
}