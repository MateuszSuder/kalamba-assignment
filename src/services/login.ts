import fetcher from "../utils/fetcher";
import {User} from "../types/User";

export default async function login(email: string, password: string): Promise<{ user: User }> {
	return await fetcher(`users/login`, "POST", {
		user: {
			email, password
		}
	});
}