const navLinks = [
  ["About", "#about"],
  ["Credit Score", "#credit-score"],
  ["Benefits", "#benefits"],
  ["Policies", "#policies"],
  ["Contact", "#contact"],
];

const trustItems = [
  "RBI Compliant",
  "256-bit Encryption",
  "Real-time Score Updates",
  "Expert Credit Advisors",
  "Experian & CRIF High Mark",
];

const scoreRanges = [
  ["Poor", "300 - 549", "w-1/5 bg-[#FF5B5B]", "text-[#FF5B5B]"],
  ["Fair", "550 - 649", "w-2/5 bg-[#FFB347]", "text-[#FFB347]"],
  ["Good", "650 - 699", "w-3/5 bg-[#4FC3F7]", "text-[#4FC3F7]"],
  ["Very Good", "700 - 749", "w-4/5 bg-[#81C784]", "text-[#81C784]"],
  ["Excellent", "750 - 900", "w-full bg-[#2EC4A0]", "text-[#2EC4A0]"],
];

const creditFactors = [
  ["35%", "Payment History", "On-time payments are the biggest factor. Never miss an EMI or bill due date.", "Card"],
  ["30%", "Credit Utilization", "Keep card usage below 30% of your limit to maintain a healthy score.", "Chart"],
  ["15%", "Credit Age", "Older accounts signal experience. Avoid closing old credit accounts unnecessarily.", "Age"],
  ["10%", "Credit Mix", "A healthy blend of secured and unsecured loans shows responsible borrowing.", "Mix"],
  ["10%", "New Enquiries", "Too many hard inquiries in a short time can temporarily lower your score.", "Check"],
];

const benefits = [
  ["Free Credit Score Check", "Check your Experian and CRIF High Mark credit score for free, anytime. No hidden charges, no credit card required."],
  ["Personalised Improvement Plan", "Get a step-by-step, account-level action plan created by our expert team for your credit report."],
  ["Monthly Score Tracking", "Stay on top of your credit health with monthly updates and progress tracking toward a 750+ score."],
  ["Dispute Assistance", "Found an error on your report? Our team helps you file disputes with credit bureaus quickly and easily."],
  ["Smart Credit Insights", "Understand exactly which factors are hurting your score with clear, actionable tips."],
  ["Loan & Card Eligibility", "Know which loans and credit cards you are eligible for before you apply."],
];

const policies = [
  ["Privacy Policy", "Your information is encrypted, never sold, and can be deleted on request."],
  ["Terms of Service", "ScoreCare is for personal credit monitoring and education purposes only."],
  ["Cookie Policy", "We use essential cookies and optional analytics to improve your experience."],
  ["Refund Policy", "Core features are free. Premium subscriptions include a 7-day refund window."],
  ["Disclaimer", "ScoreCare is an education and monitoring platform. Results vary by credit profile."],
  ["Data Sharing Policy", "Data is shared only with RBI-authorized bureaus to fetch your credit report."],
];

const faqs = [
  ["Is checking my credit score on ScoreCare free?", "Yes, checking your credit score on ScoreCare is always free and does not affect your credit score."],
  ["Will checking my score lower it?", "No. Checking your own score is a soft inquiry and has zero impact on your score."],
  ["Which credit bureaus does ScoreCare use?", "ScoreCare is powered by Experian and CRIF High Mark, two RBI-authorized credit bureaus."],
  ["How long does it take to improve my score?", "Most users see meaningful improvement within 3 to 6 months of following their action plan consistently."],
  ["Is my data safe with ScoreCare?", "Yes. We use bank-grade encryption and never sell your personal data to advertisers or third parties."],
  ["What is a good credit score in India?", "In India, a score of 750 and above is considered excellent for loans and credit card offers."],
];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  center = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2EC4A0]">{eyebrow}</p>
      <h2 className={`font-serif text-3xl font-black leading-tight md:text-4xl ${light ? "text-white" : "text-[#1B3A57]"}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base leading-7 md:text-lg ${light ? "text-white/65" : "text-[#6B7F94]"}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}

function StoreButton({ label, subLabel }: { label: string; subLabel: string }) {
  return (
    <a
      href="#"
      className="flex min-h-16 min-w-[180px] items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 text-white transition hover:-translate-y-0.5 hover:bg-white/15"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-white text-sm font-black text-[#1B3A57]">{label[0]}</span>
      <span>
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/60">{subLabel}</span>
        <strong className="block text-base">{label}</strong>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#1B3A57]">
      <nav className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-[#EEF2F6] bg-white/95 px-5 backdrop-blur md:px-10 lg:px-[5%]">
        <a href="#" className="flex items-center gap-3" aria-label="ScoreCare home">
          <span className="grid size-11 rounded-2xl bg-[#2EC4A0] text-center text-sm font-black leading-[44px] text-white">SC</span>
          <span className="text-xl font-black tracking-tight text-[#1B3A57]">ScoreCare</span>
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium text-[#3D5066] transition hover:text-[#2EC4A0]">
              {label}
            </a>
          ))}
        </div>
        <a href="#download" className="hidden rounded-full bg-[#2EC4A0] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#20A882] sm:inline-flex">
          Download App
        </a>
        <button className="flex flex-col gap-1.5 lg:hidden" aria-label="Open menu">
          <span className="h-0.5 w-6 rounded bg-[#1B3A57]" />
          <span className="h-0.5 w-6 rounded bg-[#1B3A57]" />
          <span className="h-0.5 w-6 rounded bg-[#1B3A57]" />
        </button>
      </nav>

      <section className="relative grid min-h-[calc(100vh-72px)] items-center gap-12 overflow-hidden bg-[linear-gradient(135deg,#1B3A57_0%,#254D6E_60%,#1B3A57_100%)] px-5 py-16 md:px-10 lg:grid-cols-[1fr_420px] lg:px-[5%] lg:py-24">
        <div className="absolute right-[-160px] top-[-160px] size-[420px] rounded-full bg-[#2EC4A0]/15 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2EC4A0]/30 bg-[#2EC4A0]/15 px-4 py-2 text-xs font-bold tracking-wide text-[#2EC4A0]">
            <span className="size-2 rounded-full bg-[#2EC4A0]" />
            India&apos;s Trusted Credit Score Platform
          </div>
          <h1 className="font-serif text-4xl font-black leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Know Your Score.
            <br />
            <span className="text-[#2EC4A0]">Own Your Future.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            ScoreCare by Scoresathi Technologies gives you free access to your credit score, expert insights, and a personalised roadmap to reach 750+.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#download" className="inline-flex items-center justify-center rounded-full bg-[#2EC4A0] px-7 py-4 text-sm font-black text-white shadow-[0_4px_20px_rgba(46,196,160,0.4)] transition hover:-translate-y-0.5 hover:bg-[#20A882]">
              Download Free
            </a>
            <a href="#credit-score" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15">
              Learn More
            </a>
          </div>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 sm:gap-9">
            {[
              ["5L+", "Users Served"],
              ["750+", "Avg Score After 6 Months"],
              ["Free", "Always Free to Check"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="font-serif text-2xl font-black text-[#2EC4A0] md:text-3xl">{value}</div>
                <div className="mt-1 text-xs leading-4 text-white/55">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[420px] rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/55">Your Credit Score</p>
          <div className="relative mx-auto mb-7 size-44">
            <svg className="size-full -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
              <circle cx="80" cy="80" r="70" fill="none" stroke="#2EC4A0" strokeWidth="12" strokeLinecap="round" strokeDasharray="440" strokeDashoffset="110" />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="font-serif text-5xl font-black leading-none text-white">742</div>
                <div className="mt-1 text-xs font-black text-[#2EC4A0]">EXCELLENT</div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["Payment History", "Low Utilization", "Credit Mix", "Improving"].map((item) => (
              <span key={item} className="rounded-full border border-[#2EC4A0]/25 bg-[#2EC4A0]/15 px-3 py-1.5 text-xs font-bold text-[#2EC4A0]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-b border-[#EEF2F6] bg-[#F8FAFB] px-5 py-6 text-center text-sm font-semibold text-[#3D5066] md:px-10 lg:px-[5%]">
        {trustItems.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-full bg-[#2EC4A0] text-xs text-white">✓</span>
            {item}
          </div>
        ))}
      </section>

      <section id="download" className="flex flex-col items-center justify-center gap-8 bg-[#1B3A57] px-5 py-14 text-center md:flex-row md:px-10 md:text-left lg:px-[5%]">
        <div>
          <h2 className="font-serif text-3xl font-black text-white">Get ScoreCare on Your Phone</h2>
          <p className="mt-2 text-sm text-white/60">Available on Android and iOS. Free to download, forever free to use.</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <StoreButton label="App Store" subLabel="Download on the" />
          <StoreButton label="Google Play" subLabel="Get it on" />
        </div>
      </section>

      <section id="credit-score" className="px-5 py-16 md:px-10 md:py-20 lg:px-[5%]">
        <SectionHeading eyebrow="Credit Education" title="What is a Credit Score?" subtitle="A credit score is a 3-digit number from 300 to 900 that tells lenders how creditworthy you are." />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="font-serif text-2xl font-black text-[#1B3A57]">Score Ranges Explained</h3>
            <div className="mt-8 space-y-4">
              {scoreRanges.map(([label, range, width, color]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span>{label}</span>
                    <span className={color}>{range}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#EEF2F6]">
                    <div className={`h-full rounded-full ${width}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-black text-[#1B3A57]">What Affects Your Score?</h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {creditFactors.map(([percent, title, copy, icon]) => (
                <div key={title} className="rounded-2xl border border-[#EEF2F6] bg-[#F8FAFB] p-5 transition hover:-translate-y-0.5 hover:border-[#2EC4A0] hover:shadow-[0_4px_24px_rgba(27,58,87,0.10)]">
                  <div className="mb-3 grid size-10 place-items-center rounded-xl bg-[#E6FAF5] text-xs font-black text-[#2EC4A0]">{icon}</div>
                  <div className="font-serif text-2xl font-black text-[#2EC4A0]">{percent}</div>
                  <h4 className="mt-1 text-sm font-black text-[#1B3A57]">{title}</h4>
                  <p className="mt-1 text-xs leading-5 text-[#6B7F94]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-[#F8FAFB] px-5 py-16 md:px-10 md:py-20 lg:px-[5%]">
        <SectionHeading eyebrow="Why ScoreCare" title="Benefits of Using ScoreCare" subtitle="Everything you need to understand, protect, and grow your credit score in one easy-to-use app." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([title, copy]) => (
            <div key={title} className="rounded-3xl border border-[#EEF2F6] bg-white p-7 transition hover:-translate-y-1 hover:border-[#2EC4A0] hover:shadow-[0_12px_48px_rgba(27,58,87,0.16)]">
              <div className="mb-5 grid size-14 place-items-center rounded-2xl bg-[#E6FAF5] text-sm font-black text-[#2EC4A0]">SC</div>
              <h3 className="font-serif text-lg font-black text-[#1B3A57]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7F94]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-20 lg:px-[5%]">
        <SectionHeading eyebrow="How It Works" title="Up and running in 3 minutes" subtitle="Getting your credit score has never been this fast, free, or easy." />
        <div className="relative mt-14 grid gap-8 md:grid-cols-4">
          {["Download & Sign Up", "Verify Your Identity", "See Your Score", "Follow Your Plan"].map((step, index) => (
            <div key={step} className="text-center">
              <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-[#2EC4A0] font-serif text-xl font-black text-white shadow-[0_0_0_6px_#E6FAF5]">{index + 1}</div>
              <h4 className="font-serif font-black text-[#1B3A57]">{step}</h4>
              <p className="mt-2 text-sm leading-6 text-[#6B7F94]">
                {index === 0 ? "Install ScoreCare and create your free account in seconds." : index === 1 ? "Enter your PAN and basic details to fetch your report securely." : index === 2 ? "Instantly see your score with a full credit health breakdown." : "Use your personalised plan to start reaching 750+ today."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[linear-gradient(135deg,#1B3A57_0%,#254D6E_100%)] px-5 py-16 md:px-10 md:py-20 lg:px-[5%]">
        <SectionHeading eyebrow="About Us" title="Scoresathi Technologies" subtitle="We are a fintech company headquartered in India, making credit health accessible and understandable for every Indian." light center={false} />
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <ul className="space-y-4 text-white/80">
              {[
                "Founded with the belief that every Indian deserves to understand and improve their credit standing.",
                "ScoreCare is our flagship product, a free and simple credit management platform.",
                "Integrated with Experian and CRIF High Mark, two RBI-authorized credit bureaus in India.",
                "Guided by transparency, privacy, and impact.",
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <span className="font-black text-[#2EC4A0]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#download" className="rounded-full bg-[#2EC4A0] px-7 py-4 text-center text-sm font-black text-white">Get Started Free</a>
              <a href="#contact" className="rounded-full border border-white/25 bg-white/10 px-7 py-4 text-center text-sm font-bold text-white">Talk to Us</a>
            </div>
          </div>
          <div className="space-y-5">
            {[
              ["Our Mission", "To democratize credit knowledge, making it free, simple, and actionable for every Indian household."],
              ["Our Vision", "A financially literate India where no one is denied opportunity because of a misunderstood credit score."],
              ["Our Values", "Transparency, privacy by design, and empowerment over dependency."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur">
                <h3 className="font-black text-[#2EC4A0]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="policies" className="bg-[#F8FAFB] px-5 py-16 md:px-10 md:py-20 lg:px-[5%]">
        <SectionHeading eyebrow="Our Commitments" title="Policies & Legal" subtitle="We operate with full transparency about how we handle your data, your rights, and our terms." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {policies.map(([title, copy]) => (
            <div key={title} className="rounded-3xl border border-[#EEF2F6] bg-white p-7 transition hover:border-[#2EC4A0] hover:shadow-[0_4px_24px_rgba(27,58,87,0.10)]">
              <h3 className="font-serif text-lg font-black text-[#1B3A57]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7F94]">{copy}</p>
              <a href="#" className="mt-4 inline-block text-sm font-bold text-[#2EC4A0]">Read More</a>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-20 lg:px-[5%]">
        <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-2xl border border-[#EEF2F6] bg-white p-6 transition open:border-[#2EC4A0]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-[#1B3A57]">
                {question}
                <span className="text-xl font-medium text-[#2EC4A0] group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-[#6B7F94]">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="px-5 py-16 md:px-10 md:py-20 lg:px-[5%]">
        <SectionHeading eyebrow="Get In Touch" title="Contact Us" subtitle="Have a question, need support, or want to partner with us? We would love to hear from you." center={false} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="space-y-7">
            {[
              ["Email Us", "support@scorecareapp.com", "partnerships@scorecareapp.com"],
              ["Call Us", "+91 7799440408", "Mon-Sat, 9am - 6pm IST"],
              ["WhatsApp Support", "Message us on WhatsApp for quick help.", ""],
              ["Office Address", "Scoresathi Technologies Pvt. Ltd., Hyderabad, Telangana, India", ""],
            ].map(([title, lineOne, lineTwo]) => (
              <div key={title} className="flex gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#E6FAF5] text-xs font-black text-[#2EC4A0]">SC</div>
                <div>
                  <h4 className="font-black text-[#1B3A57]">{title}</h4>
                  <p className="mt-1 text-sm leading-6 text-[#6B7F94]">{lineOne}</p>
                  {lineTwo ? <p className="text-sm leading-6 text-[#6B7F94]">{lineTwo}</p> : null}
                </div>
              </div>
            ))}
          </div>
          <form className="rounded-3xl border border-[#EEF2F6] bg-[#F8FAFB] p-6 sm:p-8">
            <h3 className="font-serif text-2xl font-black text-[#1B3A57]">Send us a message</h3>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold text-[#1B3A57]">
                First Name
                <input className="mt-2 w-full rounded-xl border border-[#D6DFE8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2EC4A0]" type="text" placeholder="Rahul" />
              </label>
              <label className="text-sm font-bold text-[#1B3A57]">
                Last Name
                <input className="mt-2 w-full rounded-xl border border-[#D6DFE8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2EC4A0]" type="text" placeholder="Sharma" />
              </label>
            </div>
            <label className="mt-4 block text-sm font-bold text-[#1B3A57]">
              Email Address
              <input className="mt-2 w-full rounded-xl border border-[#D6DFE8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2EC4A0]" type="email" placeholder="rahul@email.com" />
            </label>
            <label className="mt-4 block text-sm font-bold text-[#1B3A57]">
              Message
              <textarea className="mt-2 min-h-28 w-full resize-y rounded-xl border border-[#D6DFE8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2EC4A0]" placeholder="Tell us how we can help you..." />
            </label>
            <button className="mt-5 w-full rounded-full bg-[#2EC4A0] px-6 py-4 text-sm font-black text-white transition hover:bg-[#20A882]" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[#1B3A57] px-5 py-12 text-white/65 md:px-10 lg:px-[5%]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-white">
              <span className="grid size-11 rounded-2xl bg-[#2EC4A0] text-center text-sm font-black leading-[44px]">SC</span>
              <span className="text-xl font-black">ScoreCare</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">ScoreCare by Scoresathi Technologies, helping every Indian understand, monitor, and improve their credit score.</p>
          </div>
          {[
            ["Product", ["Credit Score", "Features", "Download App"]],
            ["Company", ["About Us", "Contact", "Careers"]],
            ["Legal", ["Privacy Policy", "Terms of Service", "Disclaimer"]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-white">{title}</h4>
              <ul className="space-y-3 text-sm">
                {(links as string[]).map((link) => (
                  <li key={link}>
                    <a href="#" className="transition hover:text-[#2EC4A0]">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Scoresathi Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Integrated with Experian & CRIF High Mark.</p>
        </div>
      </footer>
    </main>
  );
}
