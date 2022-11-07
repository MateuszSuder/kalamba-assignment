import {User} from "./User";
import {HttpMethods} from "./HttpMethods";

export interface AuthContextType {
	user?: User | null;
	loginUser?: (email: string, password: string) => Promise<void>;
	logout?: () => void;
	fetcher: <T>(url: string, method: HttpMethods, body?: Record<string, unknown>) => Promise<T>;
}