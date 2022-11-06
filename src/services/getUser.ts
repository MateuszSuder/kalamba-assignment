import {User} from "../types/User";
import fetcher from "../utils/fetcher";

export default async function getUser(): Promise<User> {
	return await fetcher("user", "GET");
}