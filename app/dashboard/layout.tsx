import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-700">
      <nav className="bg-slate-100 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-gray-900">
          SupplyMate
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{session.user?.name}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            {session.user?.role}
          </span>
          <a
            href="/api/auth/signout"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Sign out
          </a>
        </div>
      </nav>
      <main className="flex justify-center items-center px-6 py-8">
        {children}
      </main>
    </div>
  );
}
