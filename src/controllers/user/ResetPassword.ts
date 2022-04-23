import { getCustomRepository } from "typeorm";
import { UserRepository, ValidateRepository } from "../../repository";
import {v4} from 'uuid'
import { typeCustomRequest, typeCustomResponse, Messenger, BadRequest, Email, create, decoded, Unauthorized} from "../../utils";
import { IController } from "../protocols";
import { User, Validate } from "../../entity";
import Mail from "nodemailer/lib/mailer";
import { Templates } from "../../utils/template/Enginer";

export class ResetPassword implements IController {

    private userRepository: UserRepository
    private validateRepository: ValidateRepository
    private email: Email = new Email()
    private readonly tokenPassword = "reset@Ed~4!édc"

    async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
        try {

            const step = Number(request.params.step)
            this.userRepository  = getCustomRepository(UserRepository)
            this.validateRepository = getCustomRepository(ValidateRepository)

            switch (step) {
                case 1:
                    return Messenger.success(await this.stepOne(request) || {});
                case 2:
                    return Messenger.success(await this.stepTwo(request) || {});
                default:
                    throw new BadRequest("Operação não encontrada.")
            }
        } catch (erro) {
            return Messenger.error(erro);
        }
    }

    private async stepOne(request : typeCustomRequest){
        let user : User = await this.userRepository.findByEmail(request.body.email)

        if(!user) throw new BadRequest("Email não encontrado.")
        
        const validateUUID: string = (await this.validateRepository.save({ uuid: v4(), owner: user, type : "reset-password" })).uuid;
        const validateToken: string = create({ id : user.id}, "24h", this.tokenPassword)
        
        const redirect = `${process.env.FRONTEND_HOST as string}/reset-password?tk=${validateUUID}&jwt=${validateToken}`

        let ConfigurationSMTP : Mail.Options = {
            to : user.email,
            subject : "Recuperação de conta.",
            html : Templates.build( "reset-password", { redirect })
        }

        this.email.send(ConfigurationSMTP)
        
        return { message : `Confira sua caixa de mensagens em ${user.email}.`}
    }


    private async stepTwo(request : typeCustomRequest){
        let token : string = request.query.jwt
        let validate:string =  request.query.tk

        let userId  = (decoded(token, this.tokenPassword)).id
        let changePassword : string = request.body.password
        
        let user : User = await this.userRepository.findById(userId)
        if(!user) throw new BadRequest("falha ao authenticar. Usuário não encontrado.")
        
        if (!changePassword) throw new BadRequest("Nova senha necesária.")
                
        const isValidate : Validate = await this.validateRepository.findByUUID(validate)
        if (!isValidate) throw new Unauthorized("Não foi possivel realizar essa operação.")

        await isValidate.remove()
        
        if (!await this.userRepository.updatePassword(user.id, changePassword)){
            throw new BadRequest("Não foi possivel atualizar sua senha.")
        }
        return {}
    }
}