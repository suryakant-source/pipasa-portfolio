export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Apply with proof of work.",
      description:
        "Submit links to software you have built, code repositories, financial models, or structured teardowns. We do not accept resumes or cover letters.",
    },
    {
      number: "2",
      title: "Receive an anonymous builder ID.",
      description:
        "Admitted builders receive a pseudonymous identifier (such as SC-ENG-08). Your college, gender, and social profiles are completely removed before the sprint begins.",
    },
    {
      number: "3",
      title: "Work seven days in a group of four on a real problem.",
      description:
        "You collaborate text-first with three matched teammates on an industry brief with clear constraints, daily milestones, and explicit evaluation criteria.",
    },
    {
      number: "4",
      title: "Judges review the evidence; top builders introduced.",
      description:
        "A panel of judges, announced before the sprint, evaluates your final output and individual contributions. We aim to introduce top builders to founders and operators.",
    },
  ];

  return (
    <section id="how-it-works" className="border-t border-[#1A1A1A]/12 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[680px] px-5 sm:px-6">
        <div className="mb-8">
          <span className="font-mono text-xs font-semibold text-[#D9822B]">
            02
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
            How it works
          </h2>
        </div>

        <div className="divide-y divide-[#1A1A1A]/10">
          {steps.map((step) => (
            <div key={step.number} className="py-6 first:pt-0 last:pb-0 space-y-1.5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-[#D9822B] font-medium">
                  {step.number}.
                </span>
                <h3 className="font-sans text-[17px] font-semibold text-[#1A1A1A]">
                  {step.title}
                </h3>
              </div>
              <p className="text-[17px] leading-[1.6] text-[#333333] pl-5">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
