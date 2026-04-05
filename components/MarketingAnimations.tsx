"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export const MarketingCardsAnimation = () => {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ vw: 1920, vh: 1080 });

  useEffect(() => {
    setDimensions({
      vw: window.innerWidth,
      vh: window.innerHeight,
    });
  }, []);

  const centerX = dimensions.vw / 2;
  const centerY = dimensions.vh / 2;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // h1s shrink as divs converge while the user scrolls
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  // each div will transform X and Y to appear from the corners while scrolling until converging in the center
  // X Axis transformations
  const x1 = useTransform(scrollYProgress, [0, 1], [-128, centerX + 88]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-128, centerX]);
  const x3 = useTransform(scrollYProgress, [0, 1], [128, -centerX - 264]);
  const x4 = useTransform(scrollYProgress, [0, 1], [64, -128]);
  const x5 = useTransform(scrollYProgress, [0, 1], [128, -centerX + 64]);

  const smoothX1 = useSpring(x1, { stiffness: 40, damping: 10, mass: 1 });
  const smoothX2 = useSpring(x2, { stiffness: 40, damping: 10, mass: 1 });
  const smoothX3 = useSpring(x3, { stiffness: 40, damping: 10, mass: 1 });
  const smoothX4 = useSpring(x4, { stiffness: 40, damping: 10, mass: 1 });
  const smoothX5 = useSpring(x5, { stiffness: 40, damping: 10, mass: 1 });

  // Y Axis transformations
  const y1 = useTransform(scrollYProgress, [0, 1], [-128, centerY]);
  const y2 = useTransform(scrollYProgress, [0, 1], [128, -centerY - 20]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, centerY + 48]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -centerY - 32]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -centerY + 32]);

  const smoothY1 = useSpring(y1, { stiffness: 40, damping: 10, mass: 1 });
  const smoothY2 = useSpring(y2, { stiffness: 40, damping: 10, mass: 1 });
  const smoothY3 = useSpring(y3, { stiffness: 40, damping: 10, mass: 1 });
  const smoothY4 = useSpring(y4, { stiffness: 40, damping: 10, mass: 1 });
  const smoothY5 = useSpring(y5, { stiffness: 40, damping: 10, mass: 1 });

  return (
    <div ref={ref} className="relative h-[200vh]">
      {/* sticky container so content stays in view while scrolling */}
      <div className="sticky top-0 h-screen w-full bg-slate-800 flex items-center justify-center overflow-hidden">
        {/* h1s shrink as divs converge */}
        <motion.div
          style={{ scale: textScale }}
          className="flex flex-col items-center z-10"
        >
          <h1 className="text-[80px] font-extrabold text-white">
            Simple & secure systems
          </h1>
          <h1 className="text-[80px] font-extrabold text-white">
            Same day delivery
          </h1>
        </motion.div>

        <motion.div
          className="h-64 w-64 bg-red-900 absolute rounded-3xl"
          style={{
            x: smoothX1,
            y: smoothY1,
            top: "-10%",
            left: "-10%",
          }}
        >
          <Image
            src="/laptop-supply.png"
            alt="Missing picture"
            fill
            className="object-cover rounded-3xl"
          ></Image>
        </motion.div>

        <motion.div
          className="h-64 w-72 bg-blue-900 absolute rounded-3xl"
          style={{
            x: smoothX2,
            y: smoothY2,
            top: "90%",
            left: "-10%",
          }}
        >
          <Image
            src="/package-delivery.png"
            alt="Missing picture"
            fill
            className="object-cover rounded-3xl"
          ></Image>
        </motion.div>

        <motion.div
          className="h-64 w-64 bg-yellow-900 absolute flex flex-col justify-around items-center rounded-3xl"
          style={{
            x: smoothX3,
            y: smoothY3,
            top: "-10%",
            left: "110%",
          }}
        >
          <div className="flex flex-col justify-center items-center text-center p-4 bg-yellow-800 rounded-lg">
            <p>Apple Laptop - $900</p>
            <p>- -</p>
            <p>
              Purchase automatically <br /> added to PnL!
            </p>
          </div>
          <div className="py-2 px-12 bg-yellow-800 rounded-lg border border-gray-800">
            Confirm
          </div>
        </motion.div>

        <motion.div
          className="h-64 w-56 bg-green-900 absolute flex flex-col items-center rounded-3xl justify-around"
          style={{
            x: smoothX4,
            y: smoothY4,
            top: "90%",
            left: "50%",
          }}
        >
          <div className="flex items-center flex-col bg-green-600/50 px-12 py-2 rounded-lg">
            <Image
              src="/profile-pic.png"
              alt="Missing image"
              className="rounded-full mb-4"
              width={60}
              height={60}
            />
            <p>Kimi Suzuki</p>
          </div>
          <p className="text-xs">Request for standing desk</p>
          <div className="flex ">
            <div className="p-3 border border-gray-800 rounded-lg mr-4 bg-white text-black">
              Accept
            </div>
            <div className="p-3 border border-gray-800 rounded-lg bg-white text-black">
              Reject
            </div>
          </div>
        </motion.div>

        <motion.div
          className="h-64 w-64 bg-white absolute rounded-3xl"
          style={{
            x: smoothX5,
            y: smoothY5,
            top: "90%",
            left: "90%",
          }}
        >
          <Image
            src="/office-setup.png"
            alt="Missing picture"
            fill
            className="object-cover rounded-3xl"
          ></Image>
        </motion.div>
      </div>
    </div>
  );
};

export const MarketingStatementsAnimation = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // each h1 gets its own range — they trigger one after the other
  const y1 = useTransform(scrollYProgress, [0, 0.2], [600, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4], [600, 0]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.55], [600, 0]);

  const smoothY1 = useSpring(y1, { stiffness: 60, damping: 20, mass: 1 });
  const smoothY2 = useSpring(y2, { stiffness: 60, damping: 20, mass: 1 });
  const smoothY3 = useSpring(y3, { stiffness: 60, damping: 20, mass: 1 });

  return (
    <div ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 flex justify-center flex-col items-center h-screen bg-slate-800">
        <motion.div
          style={{ y: smoothY1 }}
          className="text-[80px] text-white font-extrabold flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-24 mr-4"
          >
            <title>arrows-right-left</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>

          <h1>Request & Recieve</h1>
        </motion.div>
        <motion.div
          style={{ y: smoothY2 }}
          className="text-[80px] text-white font-extrabold flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-24 mr-4"
          >
            <title>key</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>

          <h1>With Secured Approval</h1>
        </motion.div>
        <motion.div
          style={{ y: smoothY3 }}
          className="text-[80px] text-white font-extrabold flex items-center mb-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-24 mr-4"
          >
            <title>calculator</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
            />
          </svg>

          <h1>And No Hassle Auto-Accounting</h1>
        </motion.div>
      </div>
    </div>
  );
};
