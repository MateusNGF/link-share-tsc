import { EntityRepository, Repository } from "typeorm";
import { InvalidCredencial, DataNotFound, ParamExists, Unauthorized } from "../utils";
import { User } from "../entity";

@EntityRepository(User)
export class UserReposiroty extends Repository<User> {

  public async findByEmail(email: string) : Promise<User> {
    return await this.findOne({ where: { email } })
  }

  public async findByNick(nickname: string) {
    return await this.findOne({ where: { nickname } })
  }

  public async findById(id: string) {
    const currentUserFound: User = await this.findOne({ id })
    if (!currentUserFound) throw new DataNotFound('User Not found !')
    return currentUserFound
  }

  public async validAccess(email: string, password: string) {
    const returnDB = await this.findByEmail(email)
    if (!returnDB) throw new InvalidCredencial("Email not registred.")
    if (returnDB.password !== password) throw new Unauthorized("Password invalid.")
    return returnDB
  }

  public async validCredencials(nickname: string, email: string) {
    if (await this.findByEmail(email))
      throw new ParamExists(`email ${email} has exist, try to swap.`)
    if (await this.findByNick(nickname))
      throw new ParamExists(`nickname ${nickname} has exist, try to swap.`)
  }
}