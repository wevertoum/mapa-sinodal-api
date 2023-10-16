import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllIgrejas(app: FastifyInstance) {
  // @ts-ignore
  app.get("/igrejas", async () => {
    const igrejas = await prisma.igreja.findMany();
    return igrejas;
  });
}

export async function getIgrejaById(app: FastifyInstance) {
  // @ts-ignore
  app.get<{
    Params: {
      id: string;
    };
    // @ts-ignore
  }>("/igrejas/:id", async (request) => {
    const { id } = request.params;
    const igreja = await prisma.igreja.findUnique({
      where: {
        id: Number(id),
      },
    });
    return igreja;
  });
}
