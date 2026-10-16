import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#1A1A1A] select-none ${className}`}>
      Sadhna Circle
    </span>
  );
}
