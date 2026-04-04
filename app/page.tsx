import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-900">
      {/* Navigation Section */}
      <nav className="flex flex-1 items-center justify-between font-sans bg-slate-900 p-5">
        <div>
          <Link href="/" className="mx-4 text-2xl font-extrabold">
            SupplyMate
          </Link>
        </div>
        <div>
          <Link
            href="/dashboard"
            className="mx-4 border py-4 px-6 border-gray-400 rounded-2xl hover:bg-slate-700"
          >
            Login
          </Link>
          <Link
            href="/login"
            className="mx-4 border p-4 border-gray-400 bg-slate-400 hover:bg-slate-600 rounded-2xl text-black hover:text-white"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </main>
  );
}
