import {User} from "./User";

export interface AuthContextType {
	user?: User | null;
	loginUser?: (email: string, password: string) => Promise<void>;
	logout?: () => void;
}