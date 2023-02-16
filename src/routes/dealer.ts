import { FastifyPluginAsync } from "fastify";
import { Dealer } from "../database/Dealer";

export const autoPrefix = "dealer";

const DealerRoute: FastifyPluginAsync = async (fastify) => {
  type GetDealerListDto = {
    Querystring: {
      limit: number;
      offset: number;
    };
  };

  fastify.get<GetDealerListDto>("/", async (req, res) => {
    let { limit, offset } = req.query;
    if (!limit || limit < 0) limit = 10;
    if (!offset || offset < 0) offset = 0;

    let query = await Dealer.query(
      `SELECT * FROM dealer LIMIT ${limit} OFFSET ${offset}`
    );

    console.log(query);
    return query;
  });

  type PutDealerListDto = {
    Body: {
      фамилия: string;
      имя: string;
      отчество: string;
      фотография: string;
      адрес: string;
      телефон: string;
    };
  };

  fastify.put<PutDealerListDto>("/", async (req, res) => {
    let { фамилия, имя, отчество, фотография, адрес, телефон } = req.body;
    if (!фамилия || !имя || !отчество || !фотография || !адрес || !телефон)
      throw fastify.httpErrors.badRequest("Переданы не все поля");

    let query = await Dealer.query(
      `INSERT INTO dealer (\`id\`, \`фамилия\`, \`имя\`, \`отчество\`, \`фотография\`, \`адрес\`, \`телефон\`) VALUES (NULL, '${фамилия}', '${имя}', '${отчество}', '${фотография}', '${адрес}', '${телефон}')`
    );

    console.log(query);
    return query;
  });
};

export default DealerRoute;
