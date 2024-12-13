"use client";

import * as React from "react";
import Link from "next/link";


export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="flex justify-between items-center mt-6 px-4 sm:px-10">
      <Link href="/" className="text-lg font-medium text-black hover:text-zinc-700">
        <span className="bg-gradient-to-r from-black via-zinc-800 to-zinc-700 text-transparent bg-clip-text font-bold text-2xl">
          SealNotes
        </span>
      </Link>
      <button
        onClick={toggleMenu}
        className="sm:hidden text-black dark:text-white focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col sm:flex sm:flex-row sm:space-x-16 items-center space-y-4 sm:space-y-0 absolute sm:relative bg-white dark:bg-black sm:bg-transparent w-full sm:w-auto top-16 sm:top-auto left-0 sm:left-auto p-4 sm:p-0 shadow-md sm:shadow-none`}
      >
        <li>
          <Link
            href="https://github.com/harshsbhat/sealnotes"
            className="text-lg font-medium text-black hover:text-zinc-700"
          >
            Github
          </Link>
        </li>
      </ul>
    </nav>
  );
}
