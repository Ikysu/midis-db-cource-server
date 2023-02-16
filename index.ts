import Fastify from "fastify";
import App from "./src/app";

async function start() {
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname,reqId,res",
        },
      },
    },
    disableRequestLogging: true,
  });

  await fastify.register(App);

  const port = Number(process.env.PORT) || 10000;
  const host = "0.0.0.0";

  fastify.listen({ port, host }, (err) => {
    if (err) throw err;
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});