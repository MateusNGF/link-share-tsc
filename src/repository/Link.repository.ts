import { Link } from "../entity";
import { DataNotFound } from "../utils";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Link)
export class LinkRepository extends Repository<Link> {

  async deleteLinkById(id_link: string) {
    const idSearched: Link = await this.findOne({ where: { id_link } })
    if (!idSearched) throw new DataNotFound(" Link not found ... ! ) ")
    this.remove(idSearched)
    return true
  }
}