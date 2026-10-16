export function Faq() {
  const faqs = [
    {
      question: "What does identity-blind mean?",
      answer:
        "During the seven days, neither your teammates nor the judges see your name, college, gender, GPA, or social profiles. You are known only by a pseudonymous builder ID (such as SC-ENG-08). Only the code, models, reasoning, and documentation you produce are evaluated.",
    },
    {
      question: "How much does it cost?",
      answer:
        "No application fee. Admission is based on submitted proof of work.",
    },
    {
      question: "What is the time commitment?",
      answer:
        "Seven consecutive days. The format is asynchronous-first and text-first so you can manage regular classes, but you should expect to spend three to four focused hours each day collaborating with your group of four.",
    },
    {
      question: "Who judges the work?",
      answer:
        "A panel of judges, announced before the sprint. They evaluate submissions against transparent rubrics for technical rigor, commercial logic, and execution discipline.",
    },
    {
      question: "What do top builders receive?",
      answer:
        "Top submissions receive feedback from the judging panel. We aim to introduce top builders to founders and operators. Every participant leaves with documented evidence of what they built during the seven days.",
    },
  ];

  return (
    <section id="faq" className="border-t border-[#1A1A1A]/12 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[680px] px-5 sm:px-6">
        <div className="mb-8">
          <span className="font-mono text-xs font-semibold text-[#D9822B]">
            07
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
            Frequently asked questions
          </h2>
        </div>

        <div className="divide-y divide-[#1A1A1A]/10">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6 first:pt-0 last:pb-0 space-y-2">
              <h3 className="font-sans text-[17px] font-semibold text-[#1A1A1A]">
                {faq.question}
              </h3>
              <p className="text-[17px] leading-[1.6] text-[#333333]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
