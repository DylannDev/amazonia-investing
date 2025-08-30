import { z } from "zod";

export const addClientSchema = z.object({
  // client
  firstName: z.string().min(1, "Requis"),
  lastName: z.string().min(1, "Requis"),
  email: z.email("Veuillez saisir un email valide"),
  phone: z
    .string()
    .min(7, "Numéro de téléphone trop court")
    .max(20, "Numéro de téléphone trop long")
    .regex(/^[+0-9 ()\-.]+$/, "Format du numéro de téléphone invalide"),
  birthDate: z.date("Date de naissance invalide"),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  zipCode: z.string().nullable().optional(),
  // Code ISO du pays (ex: "FR", "US")
  country: z
    .string()
    .length(2, "Veuillez sélectionner un pays valide")
    .optional(),
  // contract numbers (match Prisma decimals as numbers in app layer)
  investedAmount: z
    .number()
    .gt(0, "Le montant doit être strictement supérieur à 0"),
  yieldRate: z
    .number()
    .gt(0, "Le taux doit être strictement supérieur à 0")
    .max(100, "Le taux ne peut pas dépasser 100%"),
  amountAlreadyPaid: z
    .number()
    .min(0, "Le montant doit être supérieur ou égal à 0"),
  frequency: z.union([z.literal("weekly"), z.literal("monthly")]),
  contractStartDate: z.date("Date de début du contrat invalide"),
});

export type AddClientFormValues = z.infer<typeof addClientSchema>;
