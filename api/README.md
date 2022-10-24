# Wet Bat APIs

## Runing

Dependencies:
1. [Node](https://nodejs.org/en/download) in version 14.17.0
2. [NPM](https://www.npmjs.com) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
3. [Docker](https://www.docker.com)
4. [Postman](https://www.postman.com/downloads)

## Instructions:

You should create a .env file and .env.test and populate with your local configurations, then after installing all dependencies and create the environment files run "docker-compose up -d" to run all dependencies startup externals like database, then if you doing it for the first time run "npm install" or "yarn install" to install the app internal dependencies.
If you will run the application for the first time or need to create a new database run "yarn create:database", then run "yarn sync:db" and then "yarn seed" to create the new database and populate it with the user.
Then run "yarn start:dev" for running the application in development mode with debugging and auto-reload, or "yarn start" for running the application in production mode.

## Config

### Env
The environments variables will be documented in the ".env.example" file, create a ".env" file and populate it with the same variables (keys) but your local values for development, avoid using development, homologation, or production values if this be necessary contact me (Victor Costa) and we will make that.
Because the typeorm just creates the database with the name in lowercase you will need to use the name for the DB in lowercase in the env vars or create manually the database.

### Docker
All docker configurations it's in the "docker-compose.yml" and don't need to be changed. All the variable parameters will come from values from the .env file.
