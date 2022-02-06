import { EntityRepository, Repository } from "typeorm";
import { Validate } from "../entity";


@EntityRepository(Validate)
export class ValidateRepository extends Repository<Validate> {


}
