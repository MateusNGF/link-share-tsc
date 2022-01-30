import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
	return bcrypt.hashSync(password, 10);
}
export async function comparePassword(password: string, hashPassword: string) {
	return await bcrypt.compare(password, hashPassword);
} 
