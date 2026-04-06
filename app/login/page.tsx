"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useId } from "react";
import Link from "next/link";
import { main } from "framer-motion/client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const id = useId();
  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex items-center justify-between w-[100vw] z-[-10]">
      {/* Login half */}
      <div className="w-[40vw] h-screen bg-slate-200 p-12">
        <Link href="/" className="text-4xl font-bold text-slate-800">
          SupplyMate
        </Link>
        <p className="text-[48px] text-black my-16 font-bold">Sign in</p>

        <form onSubmit={handleSubmit} className="flex flex-col space-around">
          <div className="space-y-4">
            <div>
              <input
                id={emailId}
                name="email"
                type="email"
                placeholder="Email *"
                required
                autoComplete="email"
                className="w-full p-3 border text-black border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>

            <div>
              <input
                id={passwordId}
                name="password"
                type="password"
                placeholder="Password *"
                required
                autoComplete="current-password"
                className="w-full p-3 border text-black border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-xl transition-colors mt-[360px]"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-900 mb-2">Demo accounts</p>
          <div className="space-y-1 text-xs text-black">
            <p>admin@example.com / admin1234</p>
            <p>alice@example.com / employee1234</p>
          </div>
        </div>
      </div>

      {/* Header half */}
      <div className="flex justify-center items-center bg-slate-200 w-[60vw] z-[-2] h-screen">
        <div className="relative w-[56vw] h-[92vh]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full rounded-3xl object-cover"
          >
            <source src="/supply-panning.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col justify-top items-left z-10">
            <h1 className="text-white font-bold text-[36px] mx-16 mt-12">
              One location for all needs.
            </h1>
            <div className="text-white font-semibold text-xl z-10 mx-16 border-b border-gray-300 pb-4">
              Single account for all your supplies.
            </div>
            <div className="flex items-center mx-16 mt-[600px]">
              <Link
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-2 border-white w-48 p-2 rounded-lg justify-center mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-apple mr-4 mb-1"
                  viewBox="0 0 16 16"
                >
                  <title>Apple Logo</title>
                  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                </svg>
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="text-lg">App Store</p>
                </div>
              </Link>
              <Link
                href="https://play.google.com/store/games"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-2 border-white w-48 p-2 rounded-lg justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-google-play mr-4"
                  viewBox="0 0 16 16"
                >
                  <title>Google Play Logo</title>
                  <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27" />
                </svg>
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <p className="text-lg">Google Play</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
