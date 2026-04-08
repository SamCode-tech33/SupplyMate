import { auth } from "@/lib/auth";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Role } from "../generated/prisma/enums";
import type { RequestStatus } from "../generated/prisma/enums";
import RequestList from "@/components/RequestList";

// Prisma client ─────────────────────────────────────────────────────────────
// Instantiated at module level — reused across requests in the same process
// Prisma クライアント ─────────────────────────────────────────────────────────────
// モジュールレベルでインスタンス化 — 同じプロセス内のリクエスト間で再利用される
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Status badge styles ───────────────────────────────────────────────────────
// Defined here and passed down so RequestList stays presentational
// ステータスバッジのスタイル ───────────────────────────────────────────────────────
// ここで定義し、下位レイヤーに渡すことで、RequestListはプレゼンテーション層の役割に専念できるようにする
const statusStyles: Record<RequestStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default async function DashboardPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === Role.ADMIN;

  // Employees only see their own requests — admins see all
  // 従業員は自分のリクエストのみ表示され、管理者はすべて表示されます
  const requests = await prisma.purchaseRequest.findMany({
    where: isAdmin ? {} : { requesterId: session?.user?.id },
    include: { requester: true, reviewer: true },
    orderBy: { createdAt: "desc" },
  });

  // Serialize Prisma types before passing to the client component boundary.
  // Decimal and Date are not plain objects and cannot cross the server/client boundary.
  // クライアントコンポーネントの境界に渡す前に、Prismaの型をシリアライズします。
  // Decimal型とDate型はプレーンなオブジェクトではないため、サーバーとクライアントの境界を越えることはできません。
  const serializedRequests = requests.map((req) => ({
    ...req,
    amount: Number(req.amount),
    requestDate: req.requestDate.toISOString(),
    reviewedAt: req.reviewedAt?.toISOString() ?? null,
    createdAt: req.createdAt.toISOString(),
    updatedAt: req.updatedAt.toISOString(),
  }));

  return (
    <main>
      {/* Page header ──────────────────────────────────────────── */}
      {/* ページヘッダー ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between w-[50vw] my-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-300">
            {isAdmin ? "All Requests" : "My Requests"}
          </h1>
          {/* Request count as status message for screen readers */}
          {/* スクリーンリーダー向けのステータスメッセージとしてリクエスト数を表示 */}
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-md text-slate-300 mt-2"
          >
            {requests.length} request{requests.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Only employees can create requests */}
        {/* リクエストを作成できるのは従業員のみです */}
        {!isAdmin && (
          <a
            href="/dashboard/new"
            className="bg-slate-300 hover:bg-slate-400 text-black text-md font-medium px-4 py-2 rounded-lg transition-colors"
          >
            New request
          </a>
        )}
      </div>

      {/* Request list ─────────────────────────────────────────── */}
      {/* リクエスト一覧 ─────────────────────────────────────────── */}
      {requests.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">No requests yet</p>
        </div>
      ) : (
        <RequestList
          requests={serializedRequests}
          isAdmin={isAdmin}
          statusStyles={statusStyles}
        />
      )}
    </main>
  );
}
