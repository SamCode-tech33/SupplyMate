import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";
import {
  Role,
  RequestStatus,
  Category,
} from "../app/generated/prisma/enums.js";
import { PrismaPg } from "@prisma/adapter-pg";

// Initialize Prisma with PostgreSQL adapter using env connection string
// 環境変数で指定された接続文字列を使用して、PostgreSQLアダプターでPrismaを初期化する
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  console.log("Seeding database...");

  // Hash passwords for demo users
  // デモユーザーのパスワードをハッシュ化
  const adminPassword = await bcrypt.hash("admin1234", 10);
  const employeePassword = await bcrypt.hash("employee1234", 10);

  // Upsert ensures users are created if they don't exist,
  // or left unchanged if they already exist (idempotent seed)
  // Upsert を使用すると、ユーザーがまだ存在しない場合は作成され、
  // すでに存在する場合は変更されません（冪等性のあるシード）
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice Tanaka",
      password: employeePassword,
      role: Role.EMPLOYEE,
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob Yamamoto",
      password: employeePassword,
      role: Role.EMPLOYEE,
    },
  });

  // Log created users for visibility during development
  // 開発中の可視性を確保するため、作成されたユーザーをログに記録する
  console.log(`Users: ${admin.email}, ${alice.email}, ${bob.email}`);

  // Seed purchase requests with various statuses and categories
  // ステータスやカテゴリが異なる種子の購入リクエスト
  await prisma.purchaseRequest.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "req_001",
        title: "Standing Desk",
        description: "Ergonomic height-adjustable standing desk",
        amount: 45000,
        category: Category.FURNITURE,
        status: RequestStatus.APPROVED,
        requesterId: alice.id,
        reviewerId: admin.id,
        reviewedAt: new Date("2024-11-10"),
        reviewNote: "Approved. Order from preferred vendor list.",
      },
      {
        id: "req_002",
        title: "External Monitor x2",
        description: "27-inch 4K monitors for development workstation",
        amount: 120000,
        category: Category.ELECTRONICS,
        status: RequestStatus.PENDING,
        requesterId: alice.id,
      },
      {
        id: "req_003",
        title: "Notion Team Plan",
        description: "Annual subscription for the engineering team (10 seats)",
        amount: 18000,
        category: Category.SOFTWARE,
        status: RequestStatus.REJECTED,
        requesterId: bob.id,
        reviewerId: admin.id,
        reviewedAt: new Date("2024-11-15"),
        reviewNote: "We already have Confluence.",
      },
      {
        id: "req_004",
        title: "Printer Paper (A4, 5 reams)",
        amount: 2500,
        category: Category.OFFICE_SUPPLIES,
        status: RequestStatus.PENDING,
        requesterId: bob.id,
      },
    ],
  });

  console.log("Sample requests created");
  console.log("\n Demo credentials:");
  console.log("   Admin    → admin@example.com  / admin1234");
  console.log("   Employee → alice@example.com  / employee1234");
  console.log("   Employee → bob@example.com    / employee1234");
}

// Execute seed script with proper error handling and cleanup
// 適切なエラー処理とクリーンアップを行ってシードスクリプトを実行する
main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
