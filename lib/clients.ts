import { prisma } from "@/lib/prisma";

export interface ClientRow {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate?: Date | null;
  address?: string | null;
  city?: string | null;
  zipCode?: string | null;
  country?: string | null;
  investedAmount?: number | null;
  yieldRate?: number | null; // fraction (0.10)
  frequency?: "weekly" | "monthly" | null;
  amountAlreadyPaid?: number | null;
  contractStartDate?: Date | null;
}

export async function getClientsWithMainContract(): Promise<ClientRow[]> {
  const clients = await prisma.client.findMany({
    include: {
      contract: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return clients.map((c) => {
    const main = c.contract[0];
    const investedAmount = main ? Number(main.investedAmount) : null;
    const yieldRate = main ? Number(main.yieldRate) : null; // keep percentage value
    const frequency = main ? (main.frequency as "weekly" | "monthly") : null;
    const amountAlreadyPaid = main ? Number(main.amountAlreadyPaid) : null;
    const contractStartDate = main ? main.createdAt : null;

    return {
      id: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
      fullName: `${c.firstName} ${c.lastName}`.trim(),
      email: c.email,
      phone: c.phone,
      birthDate: c.birthDate,
      address: c.address ?? null,
      city: c.city ?? null,
      zipCode: c.zipCode ?? null,
      country: c.country ?? null,
      investedAmount,
      yieldRate,
      frequency,
      amountAlreadyPaid,
      contractStartDate,
    };
  });
}
