import { User } from "../../../entity";
import BaseRepository from "./BaseRepository";

export default abstract class RepositoryUser extends BaseRepository<User> {
	public abstract findByEmail(email: string): Promise<User>
	public abstract findByNick(nickname: string): Promise<User>
	public abstract validAccess(email: string, password: string): Promise<User>
	public abstract validCredentials(nickname: string, email: string)
	public abstract validateDuplicatedNickName(nickname: string)
	public abstract updatePassword(userId: string, newPassword: string)
}