import { auth } from "@/lib/auth";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Role } from "../generated/prisma/enums";
import type { RequestStatus } from "../generated/prisma/enums";
import RequestList from "@/components/RequestList";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const statusStyles: Record<RequestStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default async function DashboardPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === Role.ADMIN;

  const requests = await prisma.purchaseRequest.findMany({
    where: isAdmin ? {} : { requesterId: session?.user?.id },
    include: { requester: true, reviewer: true },
    orderBy: { createdAt: "desc" },
  });

  const serializedRequests = requests.map((req) => ({
    ...req,
    amount: Number(req.amount),
    requestDate: req.requestDate.toISOString(),
    reviewedAt: req.reviewedAt?.toISOString() ?? null,
    createdAt: req.createdAt.toISOString(),
    updatedAt: req.updatedAt.toISOString(),
  }));

  return (
    <div>
      <div className="flex items-center justify-between w-[50vw] my-12">
        <div>
          <h2 className="text-4xl font-bold text-slate-300">
            {isAdmin ? "All Requests" : "My Requests"}
          </h2>
          <p className="text-md text-slate-300 mt-2">
            {requests.length} request{requests.length !== 1 ? "s" : ""}
          </p>
        </div>
        {!isAdmin && (
          <a
            href="/dashboard/new"
            className="bg-slate-300 hover:bg-slate-400 text-black text-md font-medium px-4 py-2 rounded-lg transition-colors"
          >
            New request
          </a>
        )}
      </div>

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
    </div>
  );
}
