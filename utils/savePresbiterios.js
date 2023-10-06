const presbiterios = require("./lista_presbiterios_sbc");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findPastorByConditions(nome) {
  const pastor = await prisma.pastor.findFirst({
    where: {
      nome,
    },
  });

  return pastor.id || null;
}

async function savePresbiterios() {
  for (const presbiterio of presbiterios) {
    const findedPresidente = await findPastorByConditions(
      presbiterio.presidente?.nome
    );

    const findedSecretarioExecutivo = await findPastorByConditions(
      presbiterio.secretario_executivo?.nome
    );

    await prisma.presbiterio.create({
      data: {
        nome: presbiterio.nome_presbiterio,
        sinodo: {
          connect: { id: 1 },
        },
        presidente: {
          connect: {
            id: findedPresidente || undefined,
          },
        },
        secretarioExecutivo: {
          connect: {
            id: findedSecretarioExecutivo || undefined,
          },
        },
      },
    });

    console.log(
      `Presbiterio ${presbiterio.nome_presbiterio} inserido no banco.`
    );
  }
}

async function main() {
  try {
    await savePresbiterios();
    console.log("Dados populados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
