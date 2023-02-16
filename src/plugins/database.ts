import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { BaseEntity, DataSource, EntitySchema } from "typeorm";
import fs from "fs";
import path from "path";

const DatabasePlugin: FastifyPluginAsync = async (fastify) => {
  const logger = fastify.log.child({ name: "Database" });

  type EntityClass = { new (): EntitySchema };
  type ImportModule = Record<string, EntityClass>;

  const entities: EntityClass[] = [];

  const entityPath = path.resolve("src/database");
  const files = fs
    .readdirSync(entityPath)
    .map((file) => path.join(entityPath, file));

  for (const file of files) {
    const module: ImportModule = await import(file);
    Object.values(module).forEach((entity) => {
      if (entity.prototype instanceof BaseEntity) {
        entities.push(entity);
        logger.info(`Table ${entity.name} loaded`);
      }
    });
  }

  const dataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities,
  });

  await dataSource.initialize();
  if (dataSource.isInitialized) {
    logger.info("MySQL initialized");
  } else {
    throw Error(`Can't connect to MySQL server`);
  }
};

export default fp(DatabasePlugin);
