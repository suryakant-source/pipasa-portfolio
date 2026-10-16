export function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A]/12 py-16 sm:py-20 bg-[#F6F2EA]">
      <div className="mx-auto w-full max-w-[680px] px-5 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <span className="font-serif text-lg font-normal text-[#1A1A1A]">
              Sadhna Circle
            </span>
            <p className="mt-1 text-xs text-[#666666]">
              Selective. Not for everyone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
            <a
              href="https://instagram.com/suryakant.notes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] hover:text-[#D9822B] hover:underline underline-offset-4"
            >
              @suryakant.notes
            </a>
            <a
              href="mailto:xbsuryakant@gmail.com"
              className="text-[#1A1A1A] hover:text-[#D9822B] hover:underline underline-offset-4"
            >
              xbsuryakant@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A]/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#666666]">
          <span>Cohort 1 - dates announced to selected applicants</span>
          <span>&copy; 2026 Sadhna Circle. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
