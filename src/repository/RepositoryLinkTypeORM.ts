import { EntityRepository, Repository } from "typeorm";

import { Link } from "../entity";
import { DataNotFound } from "../utils";
import IRepositoryLink from "./contracts/IRepositoryLink";

@EntityRepository(Link)
export class RepositoryLinkTypeORM extends Repository<Link> implements IRepositoryLink {

  async deleteLinkById(id_link: string) {
    const idSearched: Link = await this.findOne({ where: { id_link } })
    if (!idSearched) throw new DataNotFound("Link não foi encontrado.")
    this.remove(idSearched)
    return true
  }
}