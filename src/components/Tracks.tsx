export function Tracks() {
  const tracks = [
    {
      name: "Engineering",
      seats: "18 seats",
      focus:
        "For students who write software. Evaluated on system architecture, code clarity, pull request discipline, and debugging under real constraints.",
    },
    {
      name: "Business",
      seats: "18 seats",
      focus:
        "For students focused on commercial judgment. Evaluated on market reasoning, quantitative unit economics, pricing logic, and written strategy memos.",
    },
    {
      name: "Mixed (2 + 2)",
      seats: "Integrated pods",
      focus:
        "Cross-functional groups pairing two engineers with two business students to take an industry brief from technical build to commercial positioning.",
    },
  ];

  return (
    <section id="tracks" className="border-t border-[#1A1A1A]/12 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[680px] px-5 sm:px-6">
        <div className="mb-8">
          <span className="font-mono text-xs font-semibold text-[#D9822B]">
            03
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
            Tracks
          </h2>
        </div>

        <div className="divide-y divide-[#1A1A1A]/10">
          {tracks.map((track) => (
            <div key={track.name} className="py-6 first:pt-0 last:pb-0 space-y-2">
              <div className="flex items-baseline justify-between">
                <h3 className="font-sans text-[18px] font-semibold text-[#1A1A1A]">
                  {track.name}
                </h3>
                <span className="font-mono text-xs text-[#666666]">
                  {track.seats}
                </span>
              </div>
              <p className="text-[17px] leading-[1.6] text-[#333333]">
                {track.focus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
