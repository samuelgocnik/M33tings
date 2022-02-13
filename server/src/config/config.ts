import dotenv from "dotenv";

dotenv.config();

const POSTGRESQL_HOST = process.env.POSTGRESQL_HOST || "localhost";
const POSTGRESQL_PORT = Number(process.env.POSTGRESQL_PORT) || 5432;
const POSTGRESQL_DATABASE = process.env.POSTGRESQL_DATABASE || "m33tings-web";
const POSTGRESQL_USER = process.env.POSTGRESQL_USER || "postgres";
const POSTGRESQL_PASSWORD = process.env.POSTGRESQL_PASSWORD || "postgres";

const POSTGRESQL = {
  host: POSTGRESQL_HOST,
  port: POSTGRESQL_PORT,
  database: POSTGRESQL_DATABASE,
  user: POSTGRESQL_USER,
  password: POSTGRESQL_PASSWORD,
};

const SERVER_PORT = Number(process.env.SERVER_PORT) || 1337;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_TOKEN_EXPIRETIME =
  Number(process.env.SERVER_TOKEN_EXPIRETIME) || 3600; // 1 hour
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "coolIssuer";
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "sup3rstr0ng3ncrypt3ds3cr3t";
const SERVER_SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// update to match the domain you will make the request from
const ORIGIN = process.env.ORIGIN || "http://localhost:3000";

const SERVER = {
  port: SERVER_PORT,
  hostname: SERVER_HOSTNAME,
  saltRounds: SERVER_SALT_ROUNDS,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};

const config = {
  server: SERVER,
  postgresql: POSTGRESQL,
  origin: ORIGIN,
};

export default config;
