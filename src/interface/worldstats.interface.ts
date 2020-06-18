export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface UserUpdate {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}