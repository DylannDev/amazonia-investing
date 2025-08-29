import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

// Extension pour obtenir le numéro de semaine
dayjs.extend(weekOfYear);

/**
 * Calcule le montant d'un paiement en fonction du contrat
 * @param investedAmount - Montant investi en euros
 * @param yieldRate - Rendement en pourcentage (ex: 10.5)
 * @param frequency - Fréquence des paiements ("weekly" ou "monthly")
 * @returns Montant fixe à verser à chaque échéance
 */
export function calculatePaymentAmount(
  investedAmount: number,
  yieldRate: number,
  frequency: "weekly" | "monthly"
): number {
  if (frequency === "weekly") {
    return (investedAmount * yieldRate * 0.25) / 100;
  } else {
    return (investedAmount * yieldRate) / 100;
  }
}

/**
 * Génère une série de dates à venir pour les paiements
 * @param startDate - Date de début
 * @param frequency - Fréquence des paiements
 * @param numberOfPayments - Nombre de paiements à générer
 * @returns Liste des dates générées
 */
export function generatePaymentDates(
  startDate: Date,
  frequency: "weekly" | "monthly",
  numberOfPayments: number
): Date[] {
  const dates: Date[] = [];
  const base = dayjs(startDate);

  for (let i = 0; i < numberOfPayments; i++) {
    const date =
      frequency === "weekly"
        ? base.add(i + 1, "week")
        : base.add(i + 1, "month");

    dates.push(date.toDate());
  }

  return dates;
}

/**
 * Extrait les métadonnées temporelles d'une date
 * @param date - Date à analyser
 * @returns Numéro de semaine, mois et année
 */
export function extractDateMetadata(date: Date): {
  weekNumber: number;
  month: number;
  year: number;
} {
  const d = dayjs(date);
  return {
    weekNumber: d.week(),
    month: d.month() + 1,
    year: d.year(),
  };
}

/**
 * Retourne le statut du paiement ("paid" si passé, sinon "pending")
 * @param date - Date théorique de paiement
 */
export function determinePaymentStatus(date: Date): "pending" | "paid" {
  return dayjs(date).isBefore(dayjs()) ? "paid" : "pending";
}

/**
 * Retourne la date effective de paiement si payé
 * @param date - Date prévue
 * @param status - Statut du paiement
 */
export function getEffectivePaidDate(
  date: Date,
  status: "pending" | "paid"
): Date | null {
  return status === "paid" ? date : null;
}

/**
 * Formate un montant en euros
 * @param amount - Montant brut
 */
export function formatAmount(amount: number): string {
  return `${amount.toFixed(2)}€`;
}

/**
 * Formate une date en format français (jj/mm/aaaa)
 * @param date - Date brute
 */
export function formatDate(date: Date): string {
  return dayjs(date).format("DD/MM/YYYY");
}

/**
 * Calcule le pourcentage de paiements effectués
 * @param paid - Nombre de paiements réalisés
 * @param total - Nombre total de paiements
 */
export function getPaidPercentage(paid: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((paid / total) * 100 * 100) / 100;
}
