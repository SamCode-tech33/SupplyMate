import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

// Create a PostgreSQL adapter for Prisma using DATABASE_URL
// DATABASE_URL を使用して Prisma 用の PostgreSQL アダプタを作成する
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Initialize Prisma Client with the adapter
// アダプターを使用してPrisma Clientを初期化する
const prisma = new PrismaClient({ adapter });

// Main NextAuth configuration
// NextAuth のメイン設定
export const authOptions: NextAuthConfig = {
  // Connect NextAuth to Prisma for DB sessions/users
  // DBのセッションおよびユーザー管理のためにNextAuthをPrismaに接続する
  adapter: PrismaAdapter(prisma),

  // Use JWT instead of database sessions
  // データベースのセッションの代わりにJWTを使用する
  session: {
    strategy: "jwt",
  },

  // Authentication providers (only credentials here)
  // 認証プロバイダー（ここには認証情報のみ）
  providers: [
    CredentialsProvider({
      name: "credentials",

      // Define expected login fields
      // ログインに必要な入力項目を定義する
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // Runs when user attempts to log in
      // ユーザーがログインを試みた際に実行される
      async authorize(credentials): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
      } | null> {
        if (!credentials?.email || !credentials?.password) return null;

        // Find user by email
        // メールアドレスでユーザーを検索
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        // Compare hashed password with input
        // ハッシュ化されたパスワードと入力値を照合する
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!passwordMatch) return null;

        // Return minimal user object for JWT
        // JWT用の最小限のユーザーオブジェクトを返す
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
    //　JWTコールバック　トークンが作成または更新されるたびに実行されます
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    //　Session callback　Controls what is exposed to the client
    //　セッションコールバック　クライアントに公開する内容を制御します
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
