/* eslint-disable no-console */
require("dotenv").config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

module.exports = {
  name: "default",
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  port: DB_PORT,
  password: DB_PASS,
  type: "postgres",
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
  uuidExtension: "pgcrypto",
};
