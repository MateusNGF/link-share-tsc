import { User } from "../../entity"

export default interface IRepositoryUser {
	findByEmail(email: string): Promise<User>
	findByNick(nickname: string): Promise<User>
	findById(id: string): Promise<User>
	validAccess(email: string, password: string): Promise<User>
	validCredentials(nickname: string, email: string)
	validateDuplicatedNickName(nickname: string)
	updatePassword(userId: string, newPassword: string)
}