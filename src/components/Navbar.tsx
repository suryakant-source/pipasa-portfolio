import Link from "next/link";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="w-full border-b border-[#1A1A1A]/10 bg-[#F6F2EA]">
      <div className="mx-auto flex w-full max-w-[680px] items-center justify-between px-5 sm:px-6 py-5 sm:py-8">
        <Link
          href="/"
          className="focus:outline-none"
          aria-label="Sadhna Circle"
        >
          <Logo />
        </Link>

        <Link
          href="#apply"
          className="text-sm font-medium tracking-normal text-[#D9822B] hover:underline underline-offset-4"
        >
          Apply &rarr;
        </Link>
      </div>
    </header>
  );
}
