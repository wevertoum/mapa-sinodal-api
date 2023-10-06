const igrejas = require("./lista_igrejas");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findPresbiterioByConditions(nome) {
  const presbiterio = await prisma.presbiterio.findFirst({
    where: {
      nome,
    },
  });

  return presbiterio.id || null;
}

async function findPastorByConditions(nome) {
  const pastor = await prisma.pastor.findFirst({
    where: {
      nome,
    },
  });

  return pastor?.id || null;
}

async function saveIgrejas() {
  for (const igreja of igrejas) {
    const { contato, pastor, ...restoIgreja } = igreja;

    // Crie o Contato para a igreja
    const contatoObj = await prisma.contato.create({
      data: {
        telefone: contato?.telefone || null,
        celular: contato?.celular || null,
        email: contato?.email || null,
      },
    });
    const findedPresbiterio = await findPresbiterioByConditions(
      restoIgreja.presbiterio
    );

    const findedPastor = await findPastorByConditions(pastor?.nome);

    await prisma.igreja.create({
      data: {
        nome: restoIgreja.nome,
        endereco: restoIgreja.endereco,
        cep: restoIgreja.cep,
        contato: {
          connect: { id: contatoObj.id }, // Conecta o contato a igreja
        },
        pastor: {
          connect: {
            id: findedPastor || undefined,
          },
        },
        presbiterio: {
          connect: {
            id: findedPresbiterio || undefined,
          },
        },
      },
    });

    console.log(`Igreja: ${restoIgreja.nome} salva.`);
  }
}

async function main() {
  try {
    await saveIgrejas();
    console.log("Dados populados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
