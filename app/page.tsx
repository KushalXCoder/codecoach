"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import userStore from "@/store/user.store";
import { useEffect, useState } from "react";
import Toast from "@/components/toast";

const animatedContainer: Variants = {
  hidden: () => ({
    opacity: 0,
    y: 20,
    filter: "blur(12px)"
  }),
  visible: (delayValue) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeInOut", delay: delayValue }
  }),
}

export default function Home() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const justRegistered = userStore((state) => state.justRegistered);
  const { setJustRegistered } = userStore();

  useEffect(() => {
    if(justRegistered) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setJustRegistered(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
    }
  }, [justRegistered, setJustRegistered]);

  return (
    <div className="h-screen w-full relative flex flex-col justify-center items-center">
      <motion.h1
       className="text-green-400 text-6xl z-10 font-display"
       variants={animatedContainer}
       initial="hidden"
       animate="visible"
       custom={0}
      >
        CodeCoach
      </motion.h1>
      <motion.p
       className="font-sans text-gray-500 text-xl"
       variants={animatedContainer}
       initial="hidden"
       animate="visible"
       custom={0.2}
      >
        A better way to solve <span className="font-display text-white">codeforces</span> problems
      </motion.p>
      <motion.button
        type="button"
        className="relative px-6 py-3 mt-3 font-sans text-white cursor-pointer border border-gray-700 rounded-lg overflow-hidden"
        variants={animatedContainer}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        custom={0.4}
      >
        <motion.span
          className="absolute inset-0 bg-green-500/50 rounded-lg z-0"
          variants={{
            hidden: { x: "100%", y: "100%" },
            hover: { x: "0%", y: "0%" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        
        <Link href="/" className="relative z-10">Let&apos;s Code</Link>
      </motion.button>
      {showToast && <Toast text="Verification successful, welcome to CodeCoach!" />}
    </div>
  );
}