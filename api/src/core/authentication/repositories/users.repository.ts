import { EntityRepository, Repository } from 'typeorm';

import { Users } from '../entities/user.entity';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
	finndByUsername(username: string) {
		return this.findOne({
			where: { username },
			select: ['name', 'surname', 'username', 'id'],
		});
	}

	finndByUsernameWithPassword(username: string) {
		return this.findOne({
			where: { username },
			select: ['name', 'surname', 'username', 'id', 'password'],
		});
	}
}
