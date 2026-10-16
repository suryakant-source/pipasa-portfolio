export function WhoShouldApply() {
  const criteria = [
    {
      label: "Students who ship.",
      detail:
        "You have built things that exist in the world: a live web tool, active GitHub commits, a published library, financial analysis, or case competition placements.",
    },
    {
      label: "Any college, any year.",
      detail:
        "Whether you are in your first year or final semester, studying at an unranked local institute or self-taught. Your college name is never used to judge your application.",
    },
    {
      label: "High agency and follow-through.",
      detail:
        "You take responsibility for outcomes. When an API breaks or an assumption fails, you troubleshoot the problem instead of going silent.",
    },
    {
      label: "Text-first and low ego.",
      detail:
        "You communicate clearly in writing, argue from evidence rather than seniority, and accept critique without taking it personally.",
    },
  ];

  return (
    <section className="border-t border-[#1A1A1A]/12 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[680px] px-5 sm:px-6">
        <div className="mb-8">
          <span className="font-mono text-xs font-semibold text-[#D9822B]">
            05
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
            Who should apply
          </h2>
          <p className="mt-3 text-[17px] leading-[1.6] text-[#333333]">
            Sadhna Circle is designed for students who want their work evaluated
            on its own merits, without pedigree bias.
          </p>
        </div>

        <div className="divide-y divide-[#1A1A1A]/10">
          {criteria.map((item) => (
            <div key={item.label} className="py-6 first:pt-0 last:pb-0 space-y-1.5">
              <h3 className="font-sans text-[17px] font-semibold text-[#1A1A1A]">
                {item.label}
              </h3>
              <p className="text-[17px] leading-[1.6] text-[#333333]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
