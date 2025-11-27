"use client";
import { DottedGlowBackground } from "./components/background";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./components/loader";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const showLoader = setTimeout(() => {
      setLoading(true);
    }, 2000);
    const redirect = setTimeout(() => {
      router.push("/pages/slotPage");
    }, 5000);
    return () => {
      clearTimeout(showLoader);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="relative min-h-screen flex justify-center items-center flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DottedGlowBackground />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="w-full xl:text-9xl md:text-8xl text-4xl sm:tracking-[6px] sm:text-5xl tracking-[10px] uppercase text-center leading-[1.1em] animate-dimlight box-reflect text-white">
          Welcome to the game
        </h1>

        <div className="relative flex flex-col justify-center items-center md:pt-20">
          <p className="text-white mt-6 sm: text-sm md:pb-20">
            Soon you will be redirected
          </p>
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
}
