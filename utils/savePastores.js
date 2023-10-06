const pastores = require("./lista_pastores");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function savePastores() {
  for (const pastorData of pastores) {
    const { nome, telefone, celular, email } = pastorData;

    // Crie o Contato para o Pastor
    const contato = await prisma.contato.create({
      data: {
        telefone,
        celular,
        email,
      },
    });

    // Crie o Pastor com o Contato relacionado
    await prisma.pastor.create({
      data: {
        nome,
        contato: {
          connect: { id: contato.id }, // Conecta o contato ao pastor
        },
      },
    });

    console.log(`Pastor ${nome} e seu contato foram inseridos no banco.`);
  }
}

async function main() {
  try {
    await savePastores();
    console.log("Dados populados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
