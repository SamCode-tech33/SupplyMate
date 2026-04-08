import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

// ── Dashboard Layout ──────────────────────────────────────────────────────────
// Protects all dashboard routes — redirects to login if no session exists.
// Renders the top nav with user info and a sign out link.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check — runs before any dashboard page renders
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-600">
      {/* Top navigation ───────────────────────────────────────── */}
      <nav
        aria-label="Dashboard navigation"
        className="bg-slate-100 border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        {/* Wordmark — links back to landing page */}
        <Link
          href="/"
          aria-label="SupplyMate home"
          className="text-lg font-semibold text-gray-900"
        >
          SupplyMate
        </Link>
        {/* User info and actions */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{session.user?.name}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            {session.user?.role}
          </span>
          {/* Sign out — native anchor is correct here since NextAuth
              handles this route outside of Next.js routing */}
          <a
            href="/api/auth/signout"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Sign out
          </a>
        </div>
      </nav>
      {/* ── Page content ─────────────────────────────────────────── */}
      {/* children renders the active dashboard page (page.tsx, new/page.tsx etc.) */}
      <div className="flex justify-center items-center px-6 py-8">
        {children}
      </div>
    </div>
  );
}
