import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const admins = [
    {
      email: "contact@vizionweb.fr",
      name: "Dylann",
      password: process.env.ADMIN1_PASSWORD || "Admin$2025!",
    },
    {
      email: "loryothily@yahoo.fr",
      name: "Lory",
      password: process.env.ADMIN2_PASSWORD || "Admin$2025!",
    },
    {
      email: "tcofficiel.guyane@gmail.com",
      name: "Christopher",
      password: process.env.ADMIN3_PASSWORD || "Admin$2025!",
    },
    {
      email: "louis.jonathan@hotmail.fr",
      name: "Louis",
      password: process.env.ADMIN4_PASSWORD || "Admin$2025!",
    },
  ];

  for (const admin of admins) {
    const email = admin.email.toLowerCase();
    const user = await prisma.user.upsert({
      where: { email },
      update: { name: admin.name, role: "ADMIN" },
      create: { email, name: admin.name, role: "ADMIN" },
    });

    const passwordHash = await bcrypt.hash(admin.password, 12);
    const now = new Date();

    await prisma.account.upsert({
      where: {
        providerId_accountId: { providerId: "credential", accountId: email },
      },
      update: { userId: user.id, password: passwordHash, updatedAt: now },
      create: {
        userId: user.id,
        providerId: "credential",
        accountId: email,
        createdAt: now,
        updatedAt: now,
        password: passwordHash,
      },
    });
  }

  console.log("✅ Seed des comptes admin effectué avec succès.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
