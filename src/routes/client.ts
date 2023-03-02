import { FastifyPluginAsync } from "fastify";
import { Client } from "../database/Client";

export const autoPrefix = "client";

const ClientRoute: FastifyPluginAsync = async (fastify) => {

  // =====================================
  // Create
  type PutClientDto = {
    Body: {
      фамилия: string;
      имя: string;
      отчество: string;
      город: string;
      адрес: string;
      телефон: string;
    };
  };

  fastify.put<PutClientDto>("/", async (req, res) => {
    let { фамилия, имя, отчество, город, адрес, телефон }: any = req.body;
    if (!фамилия || !имя || !отчество || !город || !адрес || !телефон)
      throw fastify.httpErrors.badRequest("Переданы не все поля");

    let query = await Client.query(
      `INSERT INTO client (\`id\`, \`фамилия\`, \`имя\`, \`отчество\`, \`город\`, \`адрес\`, \`телефон\`) VALUES (NULL, '${фамилия}', '${имя}', '${отчество}', '${город}', '${адрес}', '${телефон}')`
    );

    return query;
  });

  // =====================================
  // Read List
  type GetClietnListDto = {
    Querystring: {
      limit?: number;
      offset?: number;
      search?: string;
    };
  };

  fastify.get<GetClietnListDto>("/list", async (req, res) => {
    let { limit, offset, search } = req.query;
    if (!limit || limit < 0) limit = 10;
    if (!offset || offset < 0) offset = 0;

    let theFind = "SELECT * FROM client ";
    if (search) {
      
      const findBy = search.split(",");
      function getStr(id: number): string {
        const word = findBy[id];
        if(word){
          let pre: string = getStr(id+1);
          return `SELECT \`id\` FROM client WHERE '${word}' IN (фамилия, имя, отчество, город, адрес, телефон) ${pre!="" ? `AND IN (${pre})` : ""}`
        }else{
          return "";
        }
      }
      let out = getStr(0);
      if(out!=""){
        theFind+=`WHERE \`id\` IN (`+out+`)`
      }
    }

    let query = await Client.query(
      theFind
    );
    return query;
  });

  // =====================================
  // Read
  type GetClientDto = {
    Querystring: {
      id: number;
    };
  };

  fastify.get<GetClientDto>("/", async (req, res) => {
    let { id } = req.query;
    let query: any = await Client.query(
      `SELECT * FROM client WHERE \`id\` = ${id} LIMIT 1;`
    );
    if(!query.length) return fastify.httpErrors.notFound("Client not found")
    return query[0];
  });

  // =====================================
  // Update
  type UpdateClientDto = {
    Body: {
      id: number;
      фамилия?: string;
      имя?: string;
      отчество?: string;
      город?: string;
      адрес?: string;
      телефон?: string;
    };
  };
  
  fastify.post<UpdateClientDto>("/", async (req, res) => {
    let { id, фамилия, имя, отчество, город, адрес, телефон } = req.body;
    let queryString = "UPDATE client SET ",
        updateList: string[] = [];

    if(фамилия) updateList.push(`\`фамилия\` = '${фамилия}'`)
    if(имя) updateList.push(`\`имя\` = '${имя}'`)
    if(отчество) updateList.push(`\`отчество\` = '${отчество}'`)
    if(город) updateList.push(`\`город\` = '${город}'`)
    if(адрес) updateList.push(`\`адрес\` = '${адрес}'`)
    if(телефон) updateList.push(`\`телефон\` = '${телефон}'`)

    if(updateList.length){
      queryString+=updateList.join(", ");
      queryString+=` WHERE \`id\` = ${id};`
      let query = await Client.query(
        queryString
      );
      return query;
    }else{
      let query = await Client.query(
        `SELECT * FROM client WHERE \`id\` = ${id} LIMIT 1;`
      );
      return query;
    }
  });
};

export default ClientRoute;
