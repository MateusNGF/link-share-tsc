import { Link } from "../../../entity";
import BaseRepository from "./BaseRepository";

export default abstract class RepositoryLink extends BaseRepository<Link> {
  public abstract delete(id_link: string) : Promise<Boolean>
}