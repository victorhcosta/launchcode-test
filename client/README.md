# Wet Bat UI

## Runing

Dependencies:
1. [Node](https://nodejs.org/en/download) in version 14.17.0
2. [NPM](https://www.npmjs.com) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

## Instructions:

You should create a .env file and populate with your local configurations, then after installing all dependencies and create the environment files you should start the api project, if you doing it for the first time run "npm install" or "yarn install" to install the app internal dependencies.
Then run "yarn dev" for running the application in development mode with debugging and auto-reload, or "yarn start" for running the application in production mode.

## Config

### Env
The environments variables will be documented in the ".env.example" file, create a ".env" file and populate it with the same variables (keys) but your local values for development, avoid using development, homologation, or production values if this be necessary contact me (Victor Costa) and we will make that.
Because the typeorm just creates the database with the name in lowercase you will need to use the name for the DB in lowercase in the env vars or create manually the database.
