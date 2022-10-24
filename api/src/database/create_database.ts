import { createConnection } from 'typeorm';

import { TYPEORM } from '../constants';

console.info('start to create the database if they not exist');
createConnection({
	type: 'postgres',
	password: TYPEORM.PASS,
	username: TYPEORM.USER,
	database: '',
})
	.then(async (connection) => {
		console.info('connected with success');
		const dbs = await connection.query(`SELECT * FROM pg_database`);
		const database = dbs.filter((db: any) => db.datname === TYPEORM.DB)[0];
		const databaseExist = !!database;

		if (databaseExist)
			return console.info(`the ${TYPEORM.DB} allready exist`);

		await connection.query(`CREATE DATABASE WetBat`);
		console.info(`database ${TYPEORM.DB} created with success`);
	})
	.finally(() => {
		console.info('connection has been closed');
		process.exit(0);
	});
