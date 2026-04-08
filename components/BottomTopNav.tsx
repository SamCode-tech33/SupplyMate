import Link from "next/link";
import { motion } from "framer-motion";

// Bottom Nav ────────────────────────────────────────────────────────────────
// Sticky nav that slides up from bottom after user scrolls past the hero
// ボトムナビゲーション ────────────────────────────────────────────────────────────────
// ユーザーがヒーローエリアをスクロールして通過すると、下から上にスライドして表示されるスティッキーナビゲーション
export const BottomNav = ({ show }: { show: boolean }) => {
  return (
    <nav
      aria-label="クイックナビゲーション"
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[20]"
    >
      <motion.div
        animate={{ y: show ? 0 : 100, opacity: show ? 1 : 0 }}
        initial={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        // aria-hidden when not visible — screen readers should not
        // navigate to links that are visually hidden off screen
        // 表示されていない場合は `aria-hidden` を設定する — スクリーンリーダーは、
        // 画面外で視覚的に非表示になっているリンクへ移動してはならない
        aria-hidden={!show}
        className="w-[16vw] bg-slate-600 rounded-3xl px-4 py-3 flex justify-around items-center"
      >
        <Link
          href="/"
          aria-label="ホーム"
          className="text-white font-bold text-sm relative overflow-hidden group nav-link border border-slate-200 p-2 rounded-full"
        >
          <span className="nav-text-default">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              aria-hidden="true"
            >
              <title>ホーム</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>
          <span className="nav-text-hover">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              aria-hidden="true"
            >
              <title>ホーム</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>
        </Link>
        <Link
          href="/login"
          className="text-white font-bold text-sm relative overflow-hidden group nav-link border border-slate-200 p-2 rounded-xl"
        >
          <span className="nav-text-default">ログイン</span>
          <span className="nav-text-hover">ログイン</span>
        </Link>
        <Link
          href="/dashboard"
          className="text-white font-bold text-sm relative overflow-hidden group nav-link border border-slate-200 p-2 rounded-xl"
        >
          <span className="nav-text-default">ダッシュボード</span>
          <span className="nav-text-hover">ダッシュボード</span>
        </Link>
      </motion.div>
    </nav>
  );
};

// Top Nav ───────────────────────────────────────────────────────────────────
// Primary navigation shown at the top of the landing page
// トップナビゲーション ───────────────────────────────────────────────────────────────────
// ランディングページの上部に表示されるメインナビゲーション
export const TopNav = () => {
  return (
    <nav
      aria-label="メインナビゲーション"
      className="flex flex-1 items-center justify-between font-sans p-6 z-[20]"
    >
      <div>
        {/* Logo / wordmark */}
        {/* ロゴ / ワードマーク */}
        <Link
          href="/"
          aria-label="SupplyMate ホーム"
          className="mx-4 text-3xl font-extrabold"
        >
          SupplyMate
        </Link>
      </div>

      {/* Auth links */}
      {/* 認証リンク */}
      <div className="flex items-center">
        <Link
          href="/login"
          className="mx-4 border py-3 px-14 border-white rounded-2xl text-lg font-bold relative overflow-hidden group nav-link"
        >
          <span className="nav-text-default">ログイン</span>
          <span className="nav-text-hover">ログイン</span>
        </Link>
        <Link
          href="/login"
          className="mx-4 border py-3 px-6 bg-white rounded-2xl text-black text-lg font-bold relative overflow-hidden group nav-link"
        >
          <span className="nav-text-default">ダッシュボード</span>
          <span className="nav-text-hover">ダッシュボード</span>
        </Link>
      </div>
    </nav>
  );
};
