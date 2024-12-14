"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa"; // Import GitHub icon from Font Awesome

export function Navbar() {
  return (
    <nav className="flex justify-between items-center mt-6 px-4 sm:px-10">
      <Link href="/" className="text-lg font-medium text-black hover:text-zinc-700">
        <span className="bg-gradient-to-r from-black via-zinc-800 to-zinc-700 text-transparent bg-clip-text font-bold text-2xl">
          SealNotes
        </span>
      </Link>
      <Link
        href="https://github.com/harshsbhat/sealnotes"
        target="_blank"
        className="text-black dark:text-white hover:text-zinc-700 flex items-center"
      >
        <FaGithub className="w-6 h-6 sm:mr-2" /> 
        <span className="hidden sm:inline text-lg font-medium">GitHub</span>
      </Link>
    </nav>
  );
}
