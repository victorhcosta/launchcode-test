import { createConnection } from 'typeorm';
import { hashSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { TYPEORM } from '../constants';
import { Users } from '../core/authentication/entities/user.entity';
import { IUser } from '../core/authentication/authentication.interface';

const userEntity: IUser = {
	id: uuid(),
	name: 'Victor',
	surname: 'Costa',
	username: 'admin',
	password: hashSync('adminPass', 8),
	createdAt: new Date(),
};

console.info('start to seeding users database');
createConnection({
	type: 'postgres',
	password: TYPEORM.PASS,
	username: TYPEORM.USER,
	database: TYPEORM.DB,
	entities: [Users],
})
	.then(async (connection) => {
		console.info('connected with success');
		await connection.synchronize();

		const repository = connection.getRepository(Users);

		console.info({ repository: !!repository });
		const userAlreadySeeded = await repository.findOne({
			where: {
				username: userEntity.username,
			},
		});

		if (userAlreadySeeded)
			return console.info('A user with this username already exists');

		await repository.save([userEntity]);
		console.info('user create with success');
	})
	.catch((error) => console.error(`error: ${new Error(error).message}`))
	.finally(() => {
		console.info('connection has been closed');
		process.exit(0);
	});
