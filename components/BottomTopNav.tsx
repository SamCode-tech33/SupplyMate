import Link from "next/link";
import { motion } from "framer-motion";

export const BottomNav = ({ show }: { show: boolean }) => {
  return (
    <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[20]">
      <motion.div
        animate={{ y: show ? 0 : 100, opacity: show ? 1 : 0 }}
        initial={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-[18vw] bg-slate-600 rounded-3xl px-4 py-3 flex justify-around items-center"
      >
        <Link
          href="/"
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
            >
              <title>home</title>
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
            >
              <title>home</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="text-white font-bold text-sm relative overflow-hidden group nav-link border border-slate-200 p-2 rounded-xl"
        >
          <span className="nav-text-default">Dashboard</span>
          <span className="nav-text-hover">Dashboard</span>
        </Link>
        <Link
          href="/login"
          className="text-white font-bold text-sm relative overflow-hidden group nav-link border border-slate-200 p-2 rounded-xl"
        >
          <span className="nav-text-default">Log in</span>
          <span className="nav-text-hover">Log in</span>
        </Link>
        <Link
          href="/signup"
          className="text-white font-bold text-sm relative overflow-hidden group nav-link border border-slate-200 p-2 rounded-xl"
        >
          <span className="nav-text-default">Sign up</span>
          <span className="nav-text-hover">Sign up</span>
        </Link>
      </motion.div>
    </nav>
  );
};

export const TopNav = () => {
  return (
    <nav className="flex flex-1 items-center justify-between font-sans p-6 z-[20]">
      <div>
        <Link href="/" className="mx-4 text-3xl font-extrabold">
          SupplyMate
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          href="/login"
          className="mx-4 border py-3 px-7 border-white rounded-2xl text-lg font-bold relative overflow-hidden group nav-link"
        >
          <span className="nav-text-default">Log in</span>
          <span className="nav-text-hover">Log in</span>
        </Link>
        <Link
          href="/signup"
          className="mx-4 border py-3 px-6 bg-white rounded-2xl text-black text-lg font-bold relative overflow-hidden group nav-link"
        >
          <span className="nav-text-default">Sign up</span>
          <span className="nav-text-hover">Sign up</span>
        </Link>
      </div>
    </nav>
  );
};
