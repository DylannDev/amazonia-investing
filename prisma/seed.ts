import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {
  calculatePaymentAmount,
  generatePaymentDates,
  extractDateMetadata,
  determinePaymentStatus,
  getEffectivePaidDate,
} from "../lib/seed-payments";

// Configuration de dayjs pour gérer les semaines
dayjs.extend(weekOfYear);

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seeding...");

  // Nettoyage de la base
  await prisma.payment.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.client.deleteMany();
  console.log("🧹 Base de données nettoyée");

  // Clients
  const clients = [
    {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      phone: "06 12 34 56 78",
      birthDate: new Date("1985-03-15"),
    },
    {
      firstName: "Marie",
      lastName: "Martin",
      email: "marie.martin@email.com",
      phone: "06 23 45 67 89",
      birthDate: new Date("1990-07-22"),
    },
    {
      firstName: "Pierre",
      lastName: "Bernard",
      email: "pierre.bernard@email.com",
      phone: "06 34 56 78 90",
      birthDate: new Date("1982-11-08"),
    },
    {
      firstName: "Sophie",
      lastName: "Petit",
      email: "sophie.petit@email.com",
      phone: "06 45 67 89 01",
      birthDate: new Date("1988-05-14"),
    },
    {
      firstName: "Lucas",
      lastName: "Leroy",
      email: "lucas.leroy@example.com",
      phone: "06 11 22 33 44",
      birthDate: new Date("1992-02-10"),
    },
    {
      firstName: "Emma",
      lastName: "Moreau",
      email: "emma.moreau@example.com",
      phone: "06 55 66 77 88",
      birthDate: new Date("1995-09-05"),
    },
    {
      firstName: "Thomas",
      lastName: "Fournier",
      email: "thomas.fournier@example.com",
      phone: "06 98 76 54 32",
      birthDate: new Date("1987-12-01"),
    },
    {
      firstName: "Julie",
      lastName: "Lambert",
      email: "julie.lambert@example.com",
      phone: "06 10 20 30 40",
      birthDate: new Date("1993-04-18"),
    },
    {
      firstName: "Nicolas",
      lastName: "Riviere",
      email: "nicolas.riviere@example.com",
      phone: "06 22 44 66 88",
      birthDate: new Date("1981-06-27"),
    },
    {
      firstName: "Clara",
      lastName: "Rousseau",
      email: "clara.rousseau@example.com",
      phone: "06 33 44 55 66",
      birthDate: new Date("1996-11-11"),
    },
    {
      firstName: "Mathieu",
      lastName: "Blanc",
      email: "mathieu.blanc@example.com",
      phone: "06 77 66 55 44",
      birthDate: new Date("1984-08-08"),
    },
    {
      firstName: "Camille",
      lastName: "Garnier",
      email: "camille.garnier@example.com",
      phone: "06 12 98 76 54",
      birthDate: new Date("1991-01-25"),
    },
    {
      firstName: "Hugo",
      lastName: "Fontaine",
      email: "hugo.fontaine@example.com",
      phone: "06 21 43 65 87",
      birthDate: new Date("1989-09-19"),
    },
    {
      firstName: "Léa",
      lastName: "Caron",
      email: "lea.caron@example.com",
      phone: "06 56 78 12 34",
      birthDate: new Date("1994-03-03"),
    },
    {
      firstName: "Antoine",
      lastName: "Noel",
      email: "antoine.noel@example.com",
      phone: "06 65 43 21 09",
      birthDate: new Date("1986-07-30"),
    },
    {
      firstName: "Manon",
      lastName: "Roy",
      email: "manon.roy@example.com",
      phone: "06 32 10 98 76",
      birthDate: new Date("1997-10-12"),
    },
    {
      firstName: "Baptiste",
      lastName: "Charles",
      email: "baptiste.charles@example.com",
      phone: "06 41 52 63 74",
      birthDate: new Date("1983-05-06"),
    },
    {
      firstName: "Chloé",
      lastName: "Pires",
      email: "chloe.pires@example.com",
      phone: "06 74 85 96 10",
      birthDate: new Date("1998-12-20"),
    },
    {
      firstName: "Romain",
      lastName: "Colin",
      email: "romain.colin@example.com",
      phone: "06 80 70 60 50",
      birthDate: new Date("1980-02-22"),
    },
    {
      firstName: "Inès",
      lastName: "Robin",
      email: "ines.robin@example.com",
      phone: "06 09 18 27 36",
      birthDate: new Date("1993-09-09"),
    },
  ];

  console.log("👤 Création des clients...");
  const createdClients = await Promise.all(
    clients.map((c) => prisma.client.create({ data: c }))
  );

  // Contrats
  const contractsData = [
    {
      investedAmount: 10000,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 0,
    },
    {
      investedAmount: 15000,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 4500,
    },
    {
      investedAmount: 8000,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 1600,
    },
    {
      investedAmount: 25000,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 7500,
    },
    {
      investedAmount: 12000,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 1200,
    },
    {
      investedAmount: 18000,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 3600,
    },
    {
      investedAmount: 9000,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 900,
    },
    {
      investedAmount: 22000,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 6600,
    },
    {
      investedAmount: 14000,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 1400,
    },
    {
      investedAmount: 16000,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 3200,
    },
    {
      investedAmount: 11000,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 1100,
    },
    {
      investedAmount: 20000,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 5000,
    },
    {
      investedAmount: 13000,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 1300,
    },
    {
      investedAmount: 17000,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 3400,
    },
    {
      investedAmount: 9500,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 950,
    },
    {
      investedAmount: 24000,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 7200,
    },
    {
      investedAmount: 15500,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 1550,
    },
    {
      investedAmount: 14500,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 2900,
    },
    {
      investedAmount: 12500,
      yieldRate: 10.0,
      frequency: "weekly" as const,
      amountAlreadyPaid: 1250,
    },
    {
      investedAmount: 21000,
      yieldRate: 10.0,
      frequency: "monthly" as const,
      amountAlreadyPaid: 6300,
    },
  ];

  console.log("📄 Création des contrats...");
  const createdContracts = [];
  for (let i = 0; i < createdClients.length; i++) {
    const montant = contractsData[i].investedAmount;
    const taux = contractsData[i].yieldRate;
    const freq = contractsData[i].frequency;
    const amountAlreadyPaid = contractsData[i].amountAlreadyPaid;

    const amountToPay = calculatePaymentAmount(montant, taux, freq);

    const contract = await prisma.contract.create({
      data: {
        clientId: createdClients[i].id,
        investedAmount: montant,
        yieldRate: taux,
        amountToPay,
        amountAlreadyPaid,
        frequency: freq,
      },
    });

    createdContracts.push(contract);
    console.log(
      `✅ Contrat: ${montant}€ à ${taux}% (${freq}) - ${amountToPay.toFixed(
        2
      )}€`
    );
  }

  // Paiements
  console.log("💸 Création des paiements...");
  for (let i = 0; i < createdContracts.length; i++) {
    const contract = createdContracts[i];
    const client = createdClients[i];

    const frequency = contract.frequency as "weekly" | "monthly";
    const dates = generatePaymentDates(new Date(), frequency, 4);
    const paiements = [];

    for (const date of dates) {
      const meta = extractDateMetadata(date);
      const status = determinePaymentStatus(date);
      const paidAt = getEffectivePaidDate(date, status);

      const paiement = await prisma.payment.create({
        data: {
          contractId: contract.id,
          weekNumber: meta.weekNumber,
          month: meta.month,
          year: meta.year,
          status,
          paidAt,
        },
      });

      paiements.push(paiement);
    }

    console.log(
      `✅ ${paiements.length} paiements créés pour ${client.firstName} ${client.lastName}`
    );
  }

  console.log("🎉 Seeding terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
