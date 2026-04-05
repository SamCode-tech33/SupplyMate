"use client";

import Link from "next/link";
import {
  MarketingCardsAnimation,
  MarketingStatementsAnimation,
} from "@/components/MarketingAnimations";
import PricingCard from "@/components/PricingCard";

export default function Home() {
  return (
    <main>
      {/* Navigation Section */}
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

      {/* Header Section */}
      <div className="flex justify-end items-end z-[-2] h-[89.5vh]">
        <div className="text-white font-bold text-[64px] opacity-70 z-10 ml-10 mb-12">
          Centralize your supply requisitions with SupplyMate
        </div>
        <div className="bg-slate-900 w-1/2 h-[85vh] z-[-1] opacity-60">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="isolate w-full h-full z-0 rounded-md absolute object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <source src="/supply-panning.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex flex-col mb-16 mr-16">
          <div className="text-white font-semibold text-3xl opacity-80 z-10 w-[512px] h-36">
            Single destination for all your payments.
          </div>
          <div className="flex items-center">
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border border-white w-48 p-2 rounded-lg justify-center mr-4"
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
              className="flex items-center border border-white w-48 p-2 rounded-lg justify-center"
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

      {/* Marketing Section */}
      <MarketingCardsAnimation />
      <MarketingStatementsAnimation />

      {/* Pricing Section */}

      <div className="flex justify-around items-center bg-slate-300 h-[90vh]">
        <PricingCard offsetX={500}>
          <h1 className="text-4xl">Studio Plan</h1>
          <div className="text-left text-lg">
            <p>- 10 Requisitions a month</p>
            <p>- Paid supply upgrades</p>
            <p>- Returns unavailable</p>
          </div>
          <p className="text-2xl">$50/Mo.</p>
          <div className="p-4 border border-slate-200 rounded-xl w-1/2 hover:bg-slate-600">
            Inquire
          </div>
        </PricingCard>
        <PricingCard offsetX={0}>
          <h1 className="text-4xl">Office Plan</h1>
          <div className="text-left text-lg">
            <p>- 50 requisitions a month</p>
            <p>- Paid supply upgrades</p>
            <p>- Return supplies for 50% cost</p>
          </div>
          <p className="text-2xl">$200/Mo.</p>
          <div className="p-4 border border-slate-200 rounded-xl w-1/2 hover:bg-slate-600">
            Inquire
          </div>
        </PricingCard>
        <PricingCard offsetX={-500}>
          <h1 className="text-4xl">Enterprise Plan</h1>
          <div className="text-left text-lg">
            <p>- Unlimited requisitions</p>
            <p>- Free supply upgrades</p>
            <p>- Return supplies for 50% cost</p>
          </div>
          <p className="text-2xl">$500/Mo.</p>
          <div className="p-4 border border-slate-200 rounded-xl w-1/2 hover:bg-slate-600">
            Inquire
          </div>
        </PricingCard>
      </div>
    </main>
  );
}
