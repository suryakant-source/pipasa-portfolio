import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-12 pb-16 sm:pt-24 sm:pb-28">
      <div className="mx-auto w-full max-w-[680px] px-5 sm:px-6">
        <h1 className="font-serif text-[28px] sm:text-5xl md:text-[54px] font-normal leading-[1.18] sm:leading-[1.12] tracking-tight text-[#1A1A1A]">
          Prove what you can build,<br className="sm:hidden" /> not where you studied.
        </h1>

        <p className="mt-6 text-[17px] sm:text-[18px] leading-[1.6] text-[#333333]">
          A seven-day, identity-blind builder circle for 36 engineering and
          business students. Work on real problems in small groups, evaluated on
          verifiable evidence. We aim to introduce top builders to founders and operators.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href="#apply"
            className="inline-flex items-center justify-center rounded-[2px] bg-[#D9822B] px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#C27122] active:bg-[#AA6018]"
          >
            Apply for Cohort 1 &rarr;
          </Link>
          <span className="text-xs text-[#666666] tracking-tight font-sans">
            Cohort 1 - dates announced to selected applicants
          </span>
        </div>
      </div>
    </section>
  );
}
