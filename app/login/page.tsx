"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useId } from "react";
import Link from "next/link";

// Login Page ───────────────────────────────────────────────────────────────
// Login credentials are checked against data in DB and if correct user is sent to the dashboard
// ログインページ ───────────────────────────────────────────────────────────────
// ログイン情報はデータベース内のデータと照合され、正しい場合はダッシュボードへ遷移する
export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const id = useId();
  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;
  const errorId = `${id}-error`;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
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
      {/* Auth Section  ───────────────────────────────────────────────── */}
      {/* 認証セクション  ───────────────────────────────────────────────── */}
      <section
        aria-label="login"
        className="w-[40vw] h-screen bg-slate-200 p-12 flex flex-col min-h-screen"
      >
        {/* Brand / Home link */}
        {/* ブランド / ホームリンク */}
        <header>
          <Link href="/" className="text-4xl font-bold text-slate-800">
            SupplyMate
          </Link>
        </header>

        {/* Page heading */}
        {/* ページ見出し */}
        <h1 className="text-[48px] text-black my-16 font-bold">ログイン</h1>

        {/* Form */}
        {/* フォーム */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          {/* Input group */}
          {/* 入力グループ */}
          <fieldset className="space-y-4">
            <legend className="sr-only">ログイン情報</legend>

            {/* Email */}
            {/* メール */}
            <div>
              <label htmlFor={emailId} className="sr-only">
                メールアドレス
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                placeholder="メール *"
                required
                autoComplete="email"
                className="w-full p-3 border text-black border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            {/* パスワード */}
            <div>
              <label htmlFor={passwordId} className="sr-only">
                パスワード
              </label>
              <input
                id={passwordId}
                name="password"
                type="password"
                placeholder="パスワード *"
                required
                autoComplete="current-password"
                className="w-full p-3 border text-black border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>

            {/* Error message */}
            {/* エラーメッセージ */}
            {error && (
              <p
                id={errorId}
                role="alert"
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              >
                {error}
              </p>
            )}
          </fieldset>

          {/* Submit */}
          {/* 送信 */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full bg-slate-500 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition-colors mt-auto"
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        {/* Demo accounts */}
        {/* デモ口座 */}
        <aside className="mt-6 pt-6 border-t border-gray-100">
          <h2 className="text-xs text-gray-900 mb-2 font-medium">デモ口座</h2>
          <ul className="space-y-1 text-xs text-black">
            <li>admin@example.com / admin1234</li>
            <li>alice@example.com / employee1234</li>
          </ul>
        </aside>
      </section>

      {/* Visual Marketing Section ───────────────────────────────────────────────── */}
      {/* ビジュアルマーケティングのセクション ───────────────────────────────────────────────── */}
      <aside
        aria-hidden="true"
        className="flex justify-center items-center bg-slate-200 w-[60vw] z-[-2] h-screen"
      >
        <div className="relative w-[56vw] h-[92vh]">
          {/* Decorative video */}
          {/* 装飾用動画 */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/poster.jpg"
            className="w-full h-full rounded-3xl object-cover"
          >
            <source src="/supply-panning.mp4" type="video/mp4" />
          </video>

          {/* Overlay content */}
          {/* オーバーレイコンテンツ */}
          <div className="absolute inset-0 flex flex-col justify-top items-left z-10">
            <div>
              <p className="text-white font-bold text-[36px] mx-16 mt-12">
                あらゆる必要なものに対応するワンストップサービス。
              </p>
              <p className="text-white font-semibold text-xl z-10 mx-16 border-b border-gray-300 pb-4">
                すべての備品を一つのアカウントで管理。
              </p>
            </div>

            {/* Store links */}
            {/* リンクを保存 */}
            <nav className="flex items-center mx-16 mt-[600px]">
              <Link
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-2 border-white w-48 p-2 rounded-lg justify-center mr-4"
              >
                <span className="sr-only">App Storeからダウンロード</span>
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
                <span className="sr-only">Google Playで入手</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-google-play mr-4"
                  viewBox="0 0 16 16"
                >
                  <title>Google Playのロゴ</title>
                  <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27" />
                </svg>
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <p className="text-lg">Google Play</p>
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </aside>
    </main>
  );
}
