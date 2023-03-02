import { FastifyPluginAsync } from "fastify";
import { Contract } from "../database/Contract";

export const autoPrefix = "contract";

const ContractRoute: FastifyPluginAsync = async (fastify) => {
  // Create

  // =====================================
  // Read
  type GetContractListDto = {
    Querystring: {
      limit?: number;
      offset?: number;
    };
  };

  fastify.get<GetContractListDto>("/", async (req, res) => {
    let { limit, offset } = req.query;
    if (!limit || limit < 0) limit = 10;
    if (!offset || offset < 0) offset = 0;

    let query = await Contract.query(
      `SELECT * FROM contract LIMIT ${limit} OFFSET ${offset}`
    );
    return query;
  });

  // =====================================
  // Update
};

export default ContractRoute;
