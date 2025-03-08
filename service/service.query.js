import prisma from "../prisma/client/client.js";


export const ServiceQuery = {
    queryExecute : async (query) => {
        return await prisma.$queryRawUnsafe(query)
    }
}