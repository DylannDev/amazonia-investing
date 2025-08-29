import { Prisma } from "@prisma/client";

export function getUserFriendlyError(error: unknown): string {
  let message = "Une erreur est survenue";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = error.meta?.target as string[] | string | undefined;
      const fields = Array.isArray(target) ? target : target ? [target] : [];
      if (fields.includes("email")) {
        return "Cet email est déjà utilisé. Veuillez en saisir un autre.";
      }
      return "Une contrainte d'unicité a échoué. Veuillez vérifier les champs uniques.";
    }

    // Autres erreurs Prisma connues
    return "Erreur de base de données. Veuillez réessayer.";
  }

  if (error instanceof Error) {
    if (
      error.message.includes("Unique constraint failed") &&
      error.message.includes("email")
    ) {
      return "Cet email est déjà utilisé. Veuillez en saisir un autre.";
    }
    return error.message || message;
  }

  return message;
}
