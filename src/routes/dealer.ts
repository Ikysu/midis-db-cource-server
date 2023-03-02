import { FastifyPluginAsync } from "fastify";
import { Dealer } from "../database/Dealer";

export const autoPrefix = "dealer";

const DealerRoute: FastifyPluginAsync = async (fastify) => {
  // Create
  type PutDealerDto = {
    Body: {
      фамилия: string;
      имя: string;
      отчество: string;
      фотография: string;
      адрес: string;
      телефон: string;
    };
  };

  fastify.put<PutDealerDto>("/", async (req, res) => {
    let { фамилия, имя, отчество, фотография, адрес, телефон } = req.body;
    if (!фамилия || !имя || !отчество || !фотография || !адрес || !телефон)
      throw fastify.httpErrors.badRequest("Переданы не все поля");

    let query = await Dealer.query(
      `INSERT INTO dealer (\`id\`, \`фамилия\`, \`имя\`, \`отчество\`, \`фотография\`, \`адрес\`, \`телефон\`) VALUES (NULL, '${фамилия}', '${имя}', '${отчество}', '${фотография}', '${адрес}', '${телефон}')`
    );

    return query;
  });

  // =====================================
  // Read List
  type GetDealerListDto = {
    Querystring: {
      limit?: number;
      offset?: number;
    };
  };

  fastify.get<GetDealerListDto>("/list", async (req, res) => {
    let { limit, offset } = req.query;
    if (!limit || limit < 0) limit = 10;
    if (!offset || offset < 0) offset = 0;

    let query = await Dealer.query(
      `SELECT * FROM dealer`
    );
    return query;
  });

  // =====================================
  // Read
  type GetDealerDto = {
    Querystring: {
      id: number;
    };
  };

  fastify.get<GetDealerDto>("/", async (req, res) => {
    let { id } = req.query;

    let query: any = await Dealer.query(
      `SELECT * FROM dealer WHERE \`id\` = ${id} LIMIT 1;`
    );
    if(!query.length) return fastify.httpErrors.notFound("Dealer not found")
    return query[0];
  });

  // =====================================
  // Update
  type UpdateDealerDto = {
    Body: {
      id: number;
      фамилия?: string;
      имя?: string;
      отчество?: string;
      фотография?: string;
      адрес?: string;
      телефон?: string;
    };
  };
  
  fastify.post<UpdateDealerDto>("/", async (req, res) => {
    let { id, фамилия, имя, отчество, фотография, адрес, телефон } = req.body;
    let queryString = "UPDATE dealer SET ",
        updateList: string[] = [];

    if(фамилия) updateList.push(`\`фамилия\` = '${фамилия}'`)
    if(имя) updateList.push(`\`имя\` = '${имя}'`)
    if(отчество) updateList.push(`\`отчество\` = '${отчество}'`)
    if(фотография) updateList.push(`\`фотография\` = '${фотография}'`)
    if(адрес) updateList.push(`\`адрес\` = '${адрес}'`)
    if(телефон) updateList.push(`\`телефон\` = '${телефон}'`)

    if(updateList.length){
      queryString+=updateList.join(", ");
      queryString+=` WHERE \`id\` = ${id};`
      let query = await Dealer.query(
        queryString
      );
      return query;
    }else{
      let query = await Dealer.query(
        `SELECT * FROM dealer WHERE \`id\` = ${id} LIMIT 1;`
      );
      return query;
    }
  });

};

export default DealerRoute;
