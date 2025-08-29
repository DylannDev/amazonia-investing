// Types pour les modèles Prisma
// Ces types sont générés automatiquement par Prisma, mais nous les définissons ici pour la documentation

export type Payment = {
  id: string;
  contractId: string;
  clientName: string;
  investedAmount: number;
  yieldRate: number;
  frequency: "weekly" | "monthly";
  amountToPay: number;
  weekNumber: number;
  month: number;
  year: number;
  status: "pending" | "paid" | "late";
};

export type Contract = {
  id: string;
  createdAt: Date;
  clientName: string;
  investedAmount: number;
  yieldRate: number;
  frequency: "weekly" | "monthly";
  amountToPay: number;
  status: "pending" | "paid" | "late";
};
