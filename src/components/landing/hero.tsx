"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      window.location.href = `/${inputValue.trim()}`;
    }
  };

  return (
    <main className="flex justify-center items-center mt-5">
      <div className="w-[1000px]">
        <Navbar />
        <div className="flex justify-center items-center mt-20 md:mt-30 lg:mt-40 px-4 ">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
                <Link href="https://github.com/harshsbhat/sealnotes" target="_blank">
              <Button
                variant="outline"
                className="dark:bg-black bg-white text-black dark:text-white flex justify-center items-center rounded-full px-6 py-3 text-lg"
              >
                Star us on Github ⭐
              </Button>
              </Link>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto text-center mt-4 relative z-20 py-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              Lightweight encrypted notepad.
            </h1>

            <p className="text-center text-base sm:text-lg md:text-xl pb-4 transition-colors first:mt-0 bg-gradient-to-r from-black to-zinc-950 text-transparent bg-clip-text">
              Fully open-source encrypted notepad with rich text support. No login required.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-3 mt-8"
            >
              <span className="text-lg sm:text-xl font-medium tracking-tight transition-colors bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-700">
                sealnotes.com/
              </span>
              <Input
                type="text"
                placeholder="mynotes"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full sm:w-auto max-w-sm py-2 text-lg"
              />
              <Button type="submit" className="w-full sm:w-auto py-2 text-lg">
                Get Started
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
