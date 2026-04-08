import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

// Create a PostgreSQL adapter for Prisma using DATABASE_URL
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

// Main NextAuth configuration
export const authOptions: NextAuthConfig = {
  // Connect NextAuth to Prisma for DB sessions/users
  adapter: PrismaAdapter(prisma),

  // Use JWT instead of database sessions
  session: {
    strategy: "jwt",
  },

  // Authentication providers (only credentials here)
  providers: [
    CredentialsProvider({
      name: "credentials",

      // Define expected login fields
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // Runs when user attempts to log in
      async authorize(credentials): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
      } | null> {
        if (!credentials?.email || !credentials?.password) return null;

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        // Compare hashed password with input
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!passwordMatch) return null;

        // Return minimal user object for JWT
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    //　JWT callback Runs whenever a token is created/updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    //　Session callback　Controls what is exposed to the client
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
