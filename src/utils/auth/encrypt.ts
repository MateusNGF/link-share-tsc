import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
	return bcrypt.hashSync(password, 10);
}
export function comparePassword(password: string, hashPassword: string) {
	return bcrypt.compare(password, hashPassword);
}
