export function Problem() {
  const points = [
    {
      title: "Pedigree over proof.",
      text: "Resume screening prioritizes college brand names and alumni tags before anyone looks at actual work. An exceptional student from an unranked college gets filtered out before anyone reads a single line of their code or examines their models.",
    },
    {
      title: "Passive credentials.",
      text: "Diplomas, hackathon ribbons, and online certificates confirm attendance, not ability. They reveal nothing about how someone handles ambiguous requirements, debugs under pressure, or works with three other people under a hard deadline.",
    },
    {
      title: "Closed founder networks.",
      text: "Direct access to startup founders and technical leaders is mostly restricted to warm introductions and elite campus visits. Builders outside those circles are left sending cold emails that get ignored.",
    },
  ];

  return (
    <section id="problem" className="border-t border-[#1A1A1A]/12 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[680px] px-5 sm:px-6">
        <div className="mb-8">
          <span className="font-mono text-xs font-semibold text-[#D9822B]">
            01
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
            The problem
          </h2>
        </div>

        <div className="space-y-8">
          {points.map((point, index) => (
            <div key={index} className="space-y-1.5">
              <h3 className="font-sans text-[17px] font-semibold text-[#1A1A1A]">
                {point.title}
              </h3>
              <p className="text-[17px] leading-[1.6] text-[#333333]">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
