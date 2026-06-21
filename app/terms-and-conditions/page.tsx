import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | ScoreCare",
  description: "Terms and conditions for using ScoreCare services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#F5F9F9] px-5 py-16 text-[#1B3A57] sm:py-20">
      <article className="mx-auto max-w-4xl rounded-2xl border border-[#E1EAEF] bg-white p-6 shadow-[0_18px_50px_rgba(27,58,87,0.07)] sm:p-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#15977A]">
          ScoreCare Legal
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
          Terms and Conditions
        </h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-[#52677C]">
          <p>
            By accessing or using ScoreCare, you agree to use the platform only for
            lawful, personal credit-monitoring and educational purposes.
          </p>
          <p>
            Credit information is provided by authorized credit bureaus and may change
            as those bureaus update their records. ScoreCare does not guarantee loan or
            credit-card approval and does not provide financial or legal advice.
          </p>
          <p>
            You are responsible for providing accurate information, safeguarding your
            account, and complying with applicable laws while using the services.
          </p>
          <p>
            Your use of personal information is governed by our{" "}
            <Link href="/privacy-policy" className="font-bold text-[#15977A] hover:text-[#2EC4A0]">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-[#2EC4A0] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#20A882]"
        >
          Back to home
        </Link>
      </article>
    </main>
  );
}
