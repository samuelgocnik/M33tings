import { Pool } from "pg";
import config from "./config";

const pool = new Pool({
  ...config.postgresql,
  connectionTimeoutMillis: 2000,
});

export default pool;
