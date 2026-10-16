export function FactsStrip() {
  const specs = [
    { label: "Seats", value: "36 builders (18 engineering, 18 business)" },
    { label: "Group size", value: "9 groups of 4 builders" },
    { label: "Duration", value: "7 days, text-first" },
    { label: "Judges", value: "A panel of judges, announced before the sprint" },
    { label: "Evaluation", value: "100% identity-blind via anonymous IDs" },
    { label: "Cost", value: "No application fee." },
    { label: "Dates", value: "Cohort 1 - dates announced to selected applicants" },
  ];

  return (
    <section id="cohort-1" className="border-t border-[#1A1A1A]/12 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[680px] px-5 sm:px-6">
        <div className="mb-8">
          <span className="font-mono text-xs font-semibold text-[#D9822B]">
            04
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
            Cohort 1 specifications
          </h2>
        </div>

        <div className="border-t border-[#1A1A1A]/10">
          <dl className="divide-y divide-[#1A1A1A]/10">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[16px] sm:text-[17px]"
              >
                <dt className="font-sans font-medium text-[#1A1A1A] sm:w-1/3">
                  {spec.label}
                </dt>
                <dd className="font-sans text-[#333333] sm:w-2/3">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
