import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";

import { authConfig } from "./auth.config";
import prisma from "./db";

function getUser(email: string): Promise<any> {
  return prisma.user.findUnique({
    where: { email },
  });
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcryptjs.compare(password, user.password as string);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
  ],
});
