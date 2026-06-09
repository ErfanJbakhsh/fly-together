import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

const TOKEN_MAX_DAYS: number = Number(process.env.TOKEN_MAX_DAYS) || 7;

class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: TOKEN_MAX_DAYS * 24 * 60 * 60,
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.username || !credentials?.password) {
          throw new AuthorizationError(
            "لطفا شماره تلفن و رمز عبور را وارد کنید",
          );
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          const newUser = await prisma.user.create({
            data: { username: credentials.username },
          });
          return {
            id: String(newUser.id),
            name: newUser.username,
          };
        }

        if (!user.passwordHash?.length) {
          throw new AuthorizationError("رمز عبور و یا شماره تلفن اشتباه است");
        }

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new AuthorizationError("رمز عبور و یا شماره تلفن اشتباه است");
        }

        return {
          id: String(user.id),
          name: user.username,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? undefined;
        session.user.username = token.name ?? null;
      }
      return session;
    },
  },
};
