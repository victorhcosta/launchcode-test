import { IUser } from '../../core/authentication/authentication.interface';

export const mockUser: IUser = {
	id: 'someUserID',
	name: 'User',
	surname: 'Mock',
	username: 'mock.user',
	password: 'userpass',
	createdAt: new Date(),
};
