const { PrismaClient } = require("@prisma/client");

async function NewUser() {
  const prisma = new PrismaClient();

  await prisma.User.create({
    data: {
      username: "Mike",
      hash: "134has9djklz9",
    },
  });
}

NewUser();
