import { auth } from "@/lib/auth";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Role, RequestStatus } from "../generated/prisma/enums";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
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
        <div className="bg-slate-200 rounded-xl border border-gray-200 divide-y divide-gray-100">
          {requests.map((req) => (
            <div
              key={req.id}
              className="px-6 py-4 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {req.title}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[req.status]}`}
                  >
                    {req.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  {isAdmin && <span>{req.requester.name}</span>}
                  <span>¥{Number(req.amount).toLocaleString()}</span>
                  <span>{req.category.replace("_", " ")}</span>
                  <span>{new Date(req.requestDate).toLocaleDateString()}</span>
                </div>
                {req.reviewNote && (
                  <p className="text-xs text-gray-400 mt-1 italic">
                    "{req.reviewNote}"
                  </p>
                )}
              </div>
              {isAdmin && req.status === RequestStatus.PENDING && (
                <div className="flex gap-2 shrink-0">
                  <a
                    href={`/dashboard/review/${req.id}?action=approve`}
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    Approve
                  </a>
                  <a
                    href={`/dashboard/review/${req.id}?action=reject`}
                    className="text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    Reject
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
