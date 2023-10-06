const sinodos = require("./lista_sinodos");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function saveSinodos() {
  for (const sinodo of sinodos) {
    await prisma.sinodo.create({
      data: {
        nome: sinodo.nome,
        abreviacao: sinodo.abreviacao,
      },
    });

    console.log(`Sinodo ${sinodo.nome} salvo.`);
  }
}

async function main() {
  try {
    await saveSinodos();
    console.log("Dados populados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
