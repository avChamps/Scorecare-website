import Image from "next/image";
import Link from "next/link";
import scorecareLogo from "../assets/scorecare-logo.png";
import { PLAY_STORE_URL } from "./api/api";
import LegalDocument from "./legal-document";

const navLinks = [
  ["About", "/#about"],
  ["Credit Score", "/#credit-score"],
  ["Benefits", "/#benefits"],
  ["Policies", "/#policies"],
  ["Contact", "/#contact"],
];

const legalLinks = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms of Service", "/terms-and-conditions"],
  ["Disclaimer", "/disclaimer"],
  ["Account Deletion", "/account-deletion"],
];

export default function LegalPageShell({
  documentKey,
  eyebrow,
  title,
  description,
}: {
  documentKey: "privacyPolicy" | "termsOfService" | "disclaimer" | "accountDeletion";
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen bg-[#F5F9F9] text-[#1B3A57]">
      <nav className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-[#EEF2F6] bg-white/95 px-5 backdrop-blur md:px-10 lg:px-[5%]">
        <Link href="/" className="flex items-center" aria-label="ScoreCare home">
          <span className="flex h-14 w-40 origin-left items-center overflow-hidden">
            <Image
              src={scorecareLogo}
              alt="ScoreCare"
              className="h-10 w-40 origin-left scale-[2.1] object-contain object-left"
              priority
            />
          </span>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-[#3D5066] transition hover:text-[#2EC4A0]"
            >
              {label}
            </Link>
          ))}
        </div>
        <a
          href={PLAY_STORE_URL}
          className="hidden rounded-full bg-[#2EC4A0] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#20A882] sm:inline-flex"
        >
          Download App
        </a>
        <details className="group relative lg:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden">
            <span className="relative h-5 w-6">
              <span className="absolute left-0 top-0 h-0.5 w-6 rounded bg-[#1B3A57] transition group-open:translate-y-[9px] group-open:rotate-45" />
              <span className="absolute left-0 top-[9px] h-0.5 w-6 rounded bg-[#1B3A57] transition group-open:opacity-0" />
              <span className="absolute left-0 top-[18px] h-0.5 w-6 rounded bg-[#1B3A57] transition group-open:-translate-y-[9px] group-open:-rotate-45" />
            </span>
          </summary>
          <div className="absolute right-0 top-[50px] w-[min(320px,calc(100vw-40px))] rounded-2xl border border-[#EEF2F6] bg-white p-4 shadow-[0_16px_48px_rgba(27,58,87,0.16)]">
            <div className="grid gap-1">
              {navLinks.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-xl px-3 py-3 text-sm font-bold text-[#1B3A57] transition hover:bg-[#E6FAF5] hover:text-[#2EC4A0]"
                >
                  {label}
                </Link>
              ))}
              <a
                href={PLAY_STORE_URL}
                className="mt-2 rounded-full bg-[#2EC4A0] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#20A882]"
              >
                Download App
              </a>
            </div>
          </div>
        </details>
      </nav>

      <header className="relative overflow-hidden bg-[#102F49] px-5 py-16 sm:py-20">
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#63E2C4] shadow-lg shadow-black/10">
            <svg
              aria-hidden="true"
              className="size-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 12 1.6 1.6 3.7-4" />
            </svg>
          </div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#63E2C4]">
            {eyebrow}
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            {description}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 lg:py-14">
        <LegalDocument documentKey={documentKey} title={title} />
      </div>

      <footer className="bg-[#1B3A57] px-5 py-10 text-white/65 md:px-10 lg:px-[5%]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <span className="flex h-14 w-40 items-center overflow-hidden rounded-xl bg-white">
              <Image
                src={scorecareLogo}
                alt="ScoreCare"
                className="h-10 w-40 scale-[2.05] object-contain"
              />
            </span>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
              ScoreCare by Scoresathi Technologies, helping every Indian understand,
              monitor, and improve their credit score.
            </p>
          </div>
          {[
            ["Product", [["Credit Score", "/#credit-score"], ["Features", "/#benefits"], ["Download App", PLAY_STORE_URL]]],
            ["Company", [["About Us", "/#about"], ["Contact", "/#contact"], ["Careers", "/#contact"]]],
            ["Legal", legalLinks],
          ].map(([sectionTitle, links]) => (
            <div key={sectionTitle as string} className="min-w-0">
              <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-white">
                {sectionTitle as string}
              </h4>
              <ul className="space-y-3 text-sm">
                {(links as string[][]).map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="transition hover:text-[#2EC4A0]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-5 text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Scoresathi Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Integrated with Experian &amp; CRIF High Mark.</p>
        </div>
      </footer>
    </main>
  );
}
