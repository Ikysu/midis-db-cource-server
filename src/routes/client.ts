import { FastifyPluginAsync } from "fastify";
import { Client } from "../database/Client";

export const autoPrefix = "client";

const ClientRoute: FastifyPluginAsync = async (fastify) => {
  type GetClietnListDto = {
    Querystring: {
      limit: number;
      offset: number;
    };
  };

  fastify.get<GetClietnListDto>("/", async (req, res) => {
    let { limit, offset } = req.query;
    if (!limit || limit < 0) limit = 10;
    if (!offset || offset < 0) offset = 0;

    let query = await Client.query(
      `SELECT * FROM client LIMIT ${limit} OFFSET ${offset}`
    );

    console.log(query);
    return query;
  });

  type PutClientListDto = {
    Body: {
      фамилия: string;
      имя: string;
      отчество: string;
      город: string;
      адрес: string;
      телефон: string;
    };
  };

  fastify.put<PutClientListDto>("/", async (req, res) => {
    let { фамилия, имя, отчество, город, адрес, телефон } = req.body;
    if (!фамилия || !имя || !отчество || !город || !адрес || !телефон)
      throw fastify.httpErrors.badRequest("Переданы не все поля");

    let query = await Client.query(
      `INSERT INTO client (\`id\`, \`фамилия\`, \`имя\`, \`отчество\`, \`город\`, \`адрес\`, \`телефон\`) VALUES (NULL, '${фамилия}', '${имя}', '${отчество}', '${город}', '${адрес}', '${телефон}')`
    );

    console.log(query);
    return query;
  });
};

export default ClientRoute;
