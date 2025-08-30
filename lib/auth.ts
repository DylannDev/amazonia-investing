import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

// Auth server instance configured for email+password only. No public signup UI.
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    password: {
      // ⚠️ on aligne Better Auth sur les hashes existants
      hash: async (plain: string) => bcrypt.hash(plain, 12),
      verify: async (data: { hash: string; password: string }) =>
        bcrypt.compare(data.password, data.hash),
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
    },
  },
});
