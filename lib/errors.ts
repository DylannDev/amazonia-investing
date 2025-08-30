export function getUserFriendlyError(error: unknown): string {
  let message = "Une erreur est survenue";

  // Detect Prisma known request error without importing Prisma types
  const isPrismaKnownRequestError = (
    e: unknown
  ): e is { code: string; meta?: Record<string, unknown> } => {
    const obj = e as Record<string, unknown> | null;
    return (
      !!obj &&
      typeof obj === "object" &&
      typeof (obj as any).code === "string" &&
      // Heuristic: class name often "PrismaClientKnownRequestError"
      ((obj as any)?.constructor?.name === "PrismaClientKnownRequestError" ||
        "meta" in obj)
    );
  };

  if (isPrismaKnownRequestError(error)) {
    if (error.code === "P2002") {
      const target = (error.meta as any)?.target as
        | string[]
        | string
        | undefined;
      const fields = Array.isArray(target) ? target : target ? [target] : [];
      if (fields.includes("email"))
        return "Cet email est déjà utilisé. Veuillez en saisir un autre.";
      return "Une contrainte d'unicité a échoué. Veuillez vérifier les champs uniques.";
    }

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
