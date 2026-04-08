"use client";

import { motion } from "framer-motion";
import type { PurchaseRequest, User } from "../app/generated/prisma/client";
import { RequestStatus } from "../app/generated/prisma/enums";

// Extended request type with serialized dates for client usage
// クライアント用として、日付をシリアル化した拡張リクエストタイプ
type RequestWithRelations = Omit<
  PurchaseRequest,
  "amount" | "requestDate" | "reviewedAt" | "createdAt" | "updatedAt"
> & {
  amount: number;
  requestDate: string;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  requester: User;
  reviewer: User | null;
};

type StatusStyles = Record<RequestStatus, string>;

type Props = {
  requests: RequestWithRelations[];
  isAdmin: boolean;
  statusStyles: StatusStyles;
};

const RequestList = ({ requests, isAdmin, statusStyles }: Props) => {
  return (
    <section aria-label="Supply requests">
      <motion.ul className="bg-slate-200 rounded-xl border border-gray-200 divide-y divide-gray-100">
        {requests.map((req, index) => (
          <motion.li
            key={req.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="px-6 py-4 flex items-center justify-between gap-4"
          >
            {/* Main content */}
            {/* メインコンテンツ */}
            <div className="flex-1 min-w-0">
              {/* Header: title + status */}
              {/* ヘッダー：タイトル + ステータス */}
              <header className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {req.title}
                </h3>
                {/* Status badge */}
                {/* ステータスバッジ */}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[req.status]}`}
                >
                  {req.status}
                </span>
              </header>

              {/* Metadata */}
              {/* メタデータ */}
              <dl className="flex items-center gap-3 text-xs text-gray-400">
                {isAdmin && (
                  <div>
                    <dt className="sr-only">Requester</dt>
                    <dd>{req.requester.name}</dd>
                  </div>
                )}

                <div>
                  <dt className="sr-only">Amount</dt>
                  <dd>¥{Number(req.amount).toLocaleString()}</dd>
                </div>

                <div>
                  <dt className="sr-only">Category</dt>
                  <dd>{req.category.replace("_", " ")}</dd>
                </div>

                <div>
                  <dt className="sr-only">Request date</dt>
                  <dd>
                    <time dateTime={req.requestDate}>
                      {new Date(req.requestDate).toLocaleDateString()}
                    </time>
                  </dd>
                </div>
              </dl>

              {/* Optional review note */}
              {/* 任意のレビューメモ */}
              {req.reviewNote && (
                <p className="text-xs text-gray-400 mt-1 italic">
                  "{req.reviewNote}"
                </p>
              )}
            </div>
            {isAdmin && req.status === RequestStatus.PENDING && (
              <nav
                aria-label={`Actions for request ${req.title}`}
                className="flex gap-2 shrink-0"
              >
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
              </nav>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default RequestList;
