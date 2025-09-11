import { blogArticles } from "@/data";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { DateRange } from "react-day-picker";
import { addMonths, getWeek, startOfWeek, addDays } from "date-fns";
import countries from "i18n-iso-countries";
import frLocale from "i18n-iso-countries/langs/fr.json";

// Étendre dayjs avec le plugin weekOfYear
dayjs.extend(weekOfYear);

export interface WeekMetadata {
  selectedMonth: number;
  selectedYear: number;
  selectedWeekNumber: number;
}

interface BlogArticle {
  slug: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const formatDate = (input: Date | string): string => {
  const date = typeof input === "string" ? new Date(input) : input;

  const day = date.getDate();
  const month = date.toLocaleString("fr-FR", { month: "short" });
  const year = date.getFullYear();

  // Capitalize first letter, remove trailing period, and limit to 3 characters
  const formattedMonth = (
    month.charAt(0).toUpperCase() + month.slice(1).replace(".", "")
  ).substring(0, 3);

  return `${day} ${formattedMonth}, ${year}`;
};

export function getBlogSlugs() {
  return (blogArticles as unknown as BlogArticle[]).map((post) => ({
    slug: post.slug,
  }));
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDateLocaleFr = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR");
};

export function getSelectedWeekMetadata(
  range: DateRange | undefined
): WeekMetadata | null {
  if (!range?.from) {
    return null;
  }

  const selectedDate = dayjs(range.from);

  return {
    selectedMonth: selectedDate.month() + 1, // dayjs.month() retourne 0-11, on veut 1-12
    selectedYear: selectedDate.year(),
    selectedWeekNumber: selectedDate.week(),
  };
}

//  Vérifie si une semaine donnée (par son numéro) fait partie des 4 dernières semaines du mois.
//  Cela permet d'éviter de compter deux fois la même semaine répartie sur deux mois.
export function isWeekInLastFourOfMonth(
  weekNumber: number,
  month: number,
  year: number
): boolean {
  const weeksInMonth = new Set<number>();

  // Boucle sur tous les jours du mois
  const daysInMonth = new Date(year, month, 0).getDate(); // nb de jours du mois
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day); // JS: mois 0-indexé
    const week = getWeek(date, { weekStartsOn: 1 }); // semaine commençant le lundi
    weeksInMonth.add(week);
  }

  // Trie et récupère les 4 dernières semaines du mois
  const sortedWeeks = Array.from(weeksInMonth).sort((a, b) => a - b);
  const lastFourWeeks = new Set(sortedWeeks.slice(-4));

  return lastFourWeeks.has(weekNumber);
}

export function isPeriodAfterPaymentStart(
  contractStart: Date,
  selectedWeek: number,
  selectedMonth: number,
  selectedYear: number,
  frequency: "weekly" | "monthly"
): boolean {
  const paymentStartDate = addMonths(new Date(contractStart), 1);

  if (frequency === "weekly") {
    const selectedDate = getDateFromWeekNumber(selectedWeek, selectedYear);
    return selectedDate >= startOfWeek(paymentStartDate, { weekStartsOn: 1 });
  }

  if (frequency === "monthly") {
    const paymentStartMonth = paymentStartDate.getMonth() + 1;
    const paymentStartYear = paymentStartDate.getFullYear();
    return (
      selectedYear > paymentStartYear ||
      (selectedYear === paymentStartYear && selectedMonth >= paymentStartMonth)
    );
  }

  return false;
}

export function getDateFromWeekNumber(week: number, year: number): Date {
  const januaryFirst = new Date(year, 0, 1);
  const daysOffset = (week - 1) * 7;
  return addDays(startOfWeek(januaryFirst, { weekStartsOn: 1 }), daysOffset);
}

// Filtrer par recherche (nom/prénom)
export function normalizeString(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function formatMonthYear(month: number, year: number): string {
  const monthName = new Date(year, month - 1)
    .toLocaleString("fr-FR", { month: "long" })
    .replace(/^\w/, (c) => c.toUpperCase());

  return `${monthName} ${year}`;
}

let isCountriesLocaleRegistered = false;
function ensureCountriesLocaleRegistered() {
  if (!isCountriesLocaleRegistered) {
    countries.registerLocale(frLocale as any);
    isCountriesLocaleRegistered = true;
  }
}

// Convertit un code ISO (ex: "MQ") en nom officiel français (ex: "Martinique").
// Si la valeur est déjà un nom de pays, la retourne telle quelle.
export function getCountryDisplayName(value?: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.length === 2) {
    ensureCountriesLocaleRegistered();
    const names = countries.getNames("fr", { select: "official" }) as Record<
      string,
      string
    >;
    return names[trimmed.toUpperCase()] ?? trimmed;
  }
  return trimmed;
}

// Met en Capitalize chaque mot (gère espaces, tirets et apostrophes)
export function capitalizeWords(input?: string | null): string {
  if (!input) return "";
  const lower = input.trim().toLowerCase();
  if (!lower) return "";

  function capitalizeToken(token: string): string {
    return token
      .split("'")
      .map((part) =>
        part ? part.charAt(0).toUpperCase() + part.slice(1) : part
      )
      .join("'");
  }

  // Conserver les séparateurs (espaces/tirets) et capitaliser les autres segments
  const segments = lower.split(/([\s-]+)/);
  return segments
    .map((seg) => (/^[\s-]+$/.test(seg) ? seg : capitalizeToken(seg)))
    .join("");
}
