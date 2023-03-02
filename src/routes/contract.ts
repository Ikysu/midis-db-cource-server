import { FastifyPluginAsync } from "fastify";
import { Contract } from "../database/Contract";

export const autoPrefix = "contract";

const ContractRoute: FastifyPluginAsync = async (fastify) => {
  // =====================================
  // Create
  type PutContractDto = {
    Body: {
      клиентId: number;
      дилерId: number;
      дата_заключения_договора: string;
      дата_выпуска: string;
      дата_продажи: string;
      фото_автомобиля: string;
      марка_автомобиля: string;
      пробег: number;
      цена_продажи: number;
      размер_комиссионных: number;
      примечание: string;
    };
  };

  fastify.put<PutContractDto>("/", async (req, res) => {
    let { клиентId, дилерId, дата_заключения_договора, дата_выпуска, дата_продажи, фото_автомобиля, марка_автомобиля, пробег, цена_продажи, размер_комиссионных, примечание } = req.body;
    if (клиентId == undefined || дилерId  == undefined || дата_заключения_договора  == undefined || дата_выпуска  == undefined || дата_продажи == undefined || фото_автомобиля  == undefined || марка_автомобиля  == undefined || пробег  == undefined || цена_продажи  == undefined || размер_комиссионных  == undefined || примечание  == undefined)
      throw fastify.httpErrors.badRequest("Переданы не все поля");

    let query = await Contract.query(
      `INSERT INTO contract (\`id\`, \`клиентId\`, \`дилерId\`, \`дата_заключения_договора\`, \`дата_выпуска\`, \`дата_продажи\`, \`фото_автомобиля\`, \`марка_автомобиля\`, \`пробег\`, \`цена_продажи\`, \`размер_комиссионных\`, \`примечание\`) VALUES (NULL, ${клиентId}, ${дилерId}, ${дата_заключения_договора}, ${дата_выпуска}, ${дата_продажи}, '${фото_автомобиля}', '${марка_автомобиля}', ${пробег}, ${цена_продажи}, ${размер_комиссионных}, '${примечание}')`
    );

    return query;
  });

  // =====================================
  // Read List
  type GetContractListDto = {
    Querystring: {
      limit?: number;
      offset?: number;
    };
  };

  fastify.get<GetContractListDto>("/list", async (req, res) => {
    let { limit, offset } = req.query;
    if (!limit || limit < 0) limit = 10;
    if (!offset || offset < 0) offset = 0;

    let query = await Contract.query(
      `SELECT * FROM contract`
    );
    return query;
  });

  // =====================================
  // Read
  type GetContractDto = {
    Querystring: {
      id: number;
    };
  };

  fastify.get<GetContractDto>("/", async (req, res) => {
    let { id } = req.query;
    let query: any = await Contract.query(
      `SELECT * FROM contract WHERE \`id\` = ${id} LIMIT 1;`
    );
    if(!query.length) return fastify.httpErrors.notFound("Contract not found")
    return query[0];
  });

    // =====================================
  // Update
  type UpdateContractDto = {
    Body: {
      id: number;
      клиентId?: number;
      дилерId?: number;
      дата_заключения_договора?: string;
      дата_выпуска?: string;
      дата_продажи?: string;
      фото_автомобиля?: string;
      марка_автомобиля?: string;
      пробег?: number;
      цена_продажи?: number;
      размер_комиссионных?: number;
      примечание?: string;
    };
  };

  fastify.post<UpdateContractDto>("/", async (req, res) => {
    let { id, клиентId, дилерId, дата_заключения_договора, дата_выпуска, дата_продажи, фото_автомобиля, марка_автомобиля, пробег, цена_продажи, размер_комиссионных, примечание } = req.body;
    let queryString = "UPDATE contract SET ",
        updateList: string[] = [];

    console.log(req.body)

    if(клиентId) updateList.push(`\`клиентId\` = ${клиентId}`)
    if(дилерId) updateList.push(`\`дилерId\` = ${дилерId}`)
    if(дата_заключения_договора) updateList.push(`\`дата_заключения_договора\` = ${дата_заключения_договора}`)
    if(дата_выпуска) updateList.push(`\`дата_выпуска\` = ${дата_выпуска}`)
    if(дата_продажи) updateList.push(`\`дата_продажи\` = ${дата_продажи}`)
    if(фото_автомобиля) updateList.push(`\`фото_автомобиля\` = '${фото_автомобиля}'`)
    if(марка_автомобиля) updateList.push(`\`марка_автомобиля\` = '${марка_автомобиля}'`)
    if(пробег) updateList.push(`\`пробег\` = ${пробег}`)
    if(цена_продажи) updateList.push(`\`цена_продажи\` = ${цена_продажи}`)
    if(размер_комиссионных) updateList.push(`\`размер_комиссионных\` = ${размер_комиссионных}`)
    if(примечание) updateList.push(`\`примечание\` = '${примечание}'`)

    if(updateList.length){
      queryString+=updateList.join(", ");
      queryString+=` WHERE \`id\` = ${id};`
      let query = await Contract.query(
        queryString
      );
      return query;
    }else{
      let query = await Contract.query(
        `SELECT * FROM contract WHERE \`id\` = ${id} LIMIT 1;`
      );
      return query;
    }
  });
};

export default ContractRoute;
