import { DataSource } from "typeorm";

export const fonteDeDados = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "gab",
  password: "password",
  database: "dev-database.cdcqeugo8lpb.us-east-2.rds.amazonaws.com",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});
