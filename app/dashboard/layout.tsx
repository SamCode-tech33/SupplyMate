import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

// Dashboard Layout ──────────────────────────────────────────────────────────
// Protects all dashboard routes — redirects to login if no session exists.
// Renders the top nav with user info and a sign out link.
// ダッシュボードのレイアウト ──────────────────────────────────────────────────────────
// すべてのダッシュボードのルーティングを保護します。セッションが存在しない場合はログインページにリダイレクトします。
// ユーザー情報とサインアウトリンクを含むトップナビゲーションを表示します。
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check — runs before any dashboard page renders
  // サーバーサイドの認証チェック — ダッシュボードのページがレンダリングされる前に実行される
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-600">
      {/* Top navigation ───────────────────────────────────────── */}
      {/* トップナビゲーション ───────────────────────────────────────── */}
      <nav
        aria-label="Dashboard navigation"
        className="bg-slate-100 border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        {/* Wordmark — links back to landing page */}
        {/* ワードマーク — ランディングページへのリンク */}
        <Link
          href="/"
          aria-label="SupplyMate home"
          className="text-lg font-semibold text-gray-900"
        >
          SupplyMate
        </Link>
        {/* User info and actions */}
        {/* ユーザー情報とアクション */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{session.user?.name}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            {session.user?.role}
          </span>
          {/* Sign out — native anchor is correct here since NextAuth
              handles this route outside of Next.js routing */}
          {/* サインアウト — ここではネイティブアンカーが適切です。NextAuthが
              このルートをNext.jsのルーティングとは別に処理するため */}
          <a
            href="/api/auth/signout"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Sign out
          </a>
        </div>
      </nav>
      {/* ── Page content ─────────────────────────────────────────── */}
      {/* ── ページコンテンツ ─────────────────────────────────────────── */}
      {/* children renders the active dashboard page (page.tsx, new/page.tsx etc.) */}
      {/* children はアクティブなダッシュボードページ（page.tsx、new/page.tsx など）をレンダリングします */}
      <div className="flex justify-center items-center px-6 py-8">
        {children}
      </div>
    </div>
  );
}
