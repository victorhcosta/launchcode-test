export interface IUser {
	id: string;
	name: string;
	surname: string;
	username: string;
	password?: string;
	createdAt: Date;
}
