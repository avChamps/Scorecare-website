"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconRosetteDiscountCheck } from "@tabler/icons-react";
import appleStoreLogo from "../assets/apple-store-badge.png";
import googlePlayLogo from "../assets/google-play-badge.png";
import scorecareLogo from "../assets/scorecare-logo.png";
import { API_BASE_URL, PLAY_STORE_URL } from "./api/api";

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
  ["01", "Free Credit Score Check", "Check your Experian and CRIF High Mark credit score for free, anytime. No hidden charges, no credit card required."],
  ["02", "Personalised Improvement Plan", "Get a step-by-step, account-level action plan created by our expert team for your credit report."],
  ["03", "Monthly Score Tracking", "Stay on top of your credit health with monthly updates and progress tracking toward a 750+ score."],
  ["04", "Dispute Assistance", "Found an error on your report? Our team helps you file disputes with credit bureaus quickly and easily."],
  ["05", "Smart Credit Insights", "Understand exactly which factors are hurting your score with clear, actionable tips."],
  ["06", "Loan & Card Eligibility", "Know which loans and credit cards you are eligible for before you apply."],
];

const policies = [
  ["Privacy Policy", "Your information is encrypted, never sold, and can be deleted on request."],
  ["Terms of Service", "ScoreCare is for personal credit monitoring and education purposes only."],
  ["Cookie Policy", "We use essential cookies and optional analytics to improve your experience."],
  ["Refund Policy", "Core features are free. Premium subscriptions include a 7-day refund window."],
  ["Disclaimer", "ScoreCare is an education and monitoring platform. Results vary by credit profile."],
  ["Data Sharing Policy", "Data is shared only with RBI-authorized bureaus to fetch your credit report."],
];

const policyRoutes: Record<string, string> = {
  "Privacy Policy": "/privacy-policy",
  "Terms of Service": "/terms-and-conditions",
  "Account Deletion": "/account-deletion",
};

const faqs = [
  ["Is checking my credit score on ScoreCare free?", "Yes, checking your credit score on ScoreCare is always free and does not affect your credit score."],
  ["Will checking my score lower it?", "No. Checking your own score is a soft inquiry and has zero impact on your score."],
  ["Which credit bureaus does ScoreCare use?", "ScoreCare is powered by Experian and CRIF High Mark, two RBI-authorized credit bureaus."],
  ["How long does it take to improve my score?", "Most users see meaningful improvement within 3 to 6 months of following their action plan consistently."],
  ["Is my data safe with ScoreCare?", "Yes. We use bank-grade encryption and never sell your personal data to advertisers or third parties."],
  ["What is a good credit score in India?", "In India, a score of 750 and above is considered excellent for loans and credit card offers."],
];

type ContactFormValues = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  message: string;
};

type WebsiteSettingsResponse = {
  status: string;
  data?: {
    privacyPolicy?: string;
    termsOfService?: string;
    disclaimer?: string;
    updatedAt?: string;
  };
};

const initialContactFormValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  message: "",
};

const initialContactTouched = {
  firstName: false,
  lastName: false,
  emailAddress: false,
  message: false,
};

function validateContactForm(values: ContactFormValues) {
  return {
    firstName: values.firstName.trim() ? "" : "First name is required.",
    lastName: values.lastName.trim() ? "" : "Last name is required.",
    emailAddress: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailAddress.trim()) ? "" : "Enter a valid email address.",
    message: values.message.trim().length >= 10 ? "" : "Message must be at least 10 characters.",
  };
}

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
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#2EC4A0]">{eyebrow}</p>
      <h2 className={`font-heading text-3xl font-extrabold leading-tight md:text-4xl ${light ? "text-white" : "text-[#1B3A57]"}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base leading-7 md:text-lg ${light ? "text-white/65" : "text-[#6B7F94]"}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}

function ContactIcon({ type }: { type: string }) {
  const iconClass = "size-5 transition duration-300 group-hover:scale-110";

  if (type === "email") {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l8.4 5.6a1.1 1.1 0 001.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A2.5 2.5 0 015.5 3h2.1a1.5 1.5 0 011.45 1.12l.8 3.05a1.5 1.5 0 01-.4 1.43l-1.2 1.2a13 13 0 005.95 5.95l1.2-1.2a1.5 1.5 0 011.43-.4l3.05.8A1.5 1.5 0 0121 16.4v2.1a2.5 2.5 0 01-2.5 2.5A15.5 15.5 0 013 5.5z" />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 18.5L4 20l1.5-4.1A8 8 0 1112 20a8.3 8.3 0 01-3.5-.8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.5c.3 2.4 2.1 4.2 5.5 5.5l1-1.2a1 1 0 00-.2-1.4l-1.2-.8a1 1 0 00-1.2.1l-.5.5a5.4 5.4 0 01-2.6-2.6l.5-.5a1 1 0 00.1-1.2l-.8-1.2a1 1 0 00-1.4-.2L7 7.5" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.6 7-11a7 7 0 10-14 0c0 6.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState(initialContactFormValues);
  const [contactErrors, setContactErrors] = useState(validateContactForm(initialContactFormValues));
  const [contactTouched, setContactTouched] = useState(initialContactTouched);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const isContactFormValid = Object.values(contactErrors).every((error) => !error);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWebsiteSettings() {
      try {
        const response = await fetch(`${API_BASE_URL}/website-settings`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load website settings");
        }

        const result = (await response.json()) as WebsiteSettingsResponse;

        if (result.status !== "success") {
          throw new Error("Unable to load website settings");
        }

      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
      }
    }

    void loadWebsiteSettings();

    return () => controller.abort();
  }, []);

  function handleContactChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    const nextForm = {
      ...contactForm,
      [name]: value,
    };

    setContactForm(nextForm);
    setContactErrors(validateContactForm(nextForm));
    setContactTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const nextErrors = validateContactForm(contactForm);

    setContactErrors(nextErrors);
    setContactTouched({
      firstName: true,
      lastName: true,
      emailAddress: true,
      message: true,
    });

    if (Object.values(nextErrors).some((error) => error)) {
      return;
    }

    setIsContactSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: contactForm.firstName.trim(),
          lastName: contactForm.lastName.trim(),
          emailAddress: contactForm.emailAddress.trim(),
          message: contactForm.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setContactForm(initialContactFormValues);
      setContactErrors(validateContactForm(initialContactFormValues));
      setContactTouched(initialContactTouched);
      setShowContactSuccess(true);
    } catch {
      alert("Unable to submit your message right now. Please try again.");
    } finally {
      setIsContactSubmitting(false);
    }
  }

  function contactInputClass(field: keyof ContactFormValues) {
    return `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2EC4A0] ${
      contactTouched[field] && contactErrors[field] ? "border-[#FF5B5B]" : "border-[#D6DFE8]"
    }`;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#1B3A57]">
      <nav className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-[#EEF2F6] bg-white/95 px-5 backdrop-blur md:px-10 lg:px-[5%]">
        <a href="#" className="flex items-center" aria-label="ScoreCare home">
          <span className="flex h-14 w-40 origin-left items-center overflow-hidden">
            <Image
              src={scorecareLogo}
              alt="ScoreCare"
              className="h-10 w-40 origin-left scale-[2.1] object-contain object-left"
              priority
            />
          </span>
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium text-[#3D5066] transition hover:text-[#2EC4A0]">
              {label}
            </a>
          ))}
        </div>
        <a href={PLAY_STORE_URL} className="hidden rounded-full bg-[#2EC4A0] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#20A882] sm:inline-flex">
          Download App
        </a>
        <button
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          className="group flex size-10 items-center justify-center lg:hidden"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <span className="relative h-5 w-6">
            <span className={`absolute left-0 top-0 h-0.5 w-6 rounded bg-[#1B3A57] transition duration-300 ease-out ${isMobileMenuOpen ? "translate-y-[9px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[9px] h-0.5 w-6 rounded bg-[#1B3A57] transition duration-200 ease-out ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[18px] h-0.5 w-6 rounded bg-[#1B3A57] transition duration-300 ease-out ${isMobileMenuOpen ? "-translate-y-[9px] -rotate-45" : ""}`} />
          </span>
        </button>
        <div
          className={`absolute left-5 right-5 top-[72px] origin-top rounded-2xl border border-[#EEF2F6] bg-white p-4 shadow-[0_16px_48px_rgba(27,58,87,0.16)] transition duration-300 ease-out lg:hidden ${
            isMobileMenuOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-3 scale-95 opacity-0"
          }`}
        >
            <div className="grid gap-1">
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm font-bold text-[#1B3A57] transition duration-300 hover:bg-[#E6FAF5] hover:text-[#2EC4A0] ${
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
                >
                  {label}
                </a>
              ))}
              <a
                href={PLAY_STORE_URL}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mt-2 rounded-full bg-[#2EC4A0] px-5 py-3 text-center text-sm font-black text-white transition duration-300 hover:bg-[#20A882] ${
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
              >
                Download App
              </a>
            </div>
          </div>
      </nav>

      <section className="relative grid min-h-[calc(100vh-72px)] items-center gap-12 overflow-hidden bg-[linear-gradient(135deg,#1B3A57_0%,#254D6E_60%,#1B3A57_100%)] px-5 py-16 md:px-10 lg:grid-cols-[1fr_420px] lg:px-[5%] lg:py-24">
        <div className="absolute right-[-160px] top-[-160px] size-[420px] rounded-full bg-[#2EC4A0]/15 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2EC4A0]/30 bg-[#2EC4A0]/15 px-4 py-2 text-xs font-bold tracking-wide text-[#2EC4A0]">
            <span className="size-2 rounded-full bg-[#2EC4A0]" />
            India&apos;s Trusted Credit Score Platform
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Know Your Score.
            <br />
            <span className="text-[#2EC4A0]">Own Your Future.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            ScoreCare by Scoresathi Technologies gives you free access to your credit score, expert insights, and a personalised roadmap to reach 750+.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={PLAY_STORE_URL} className="inline-flex items-center justify-center rounded-full bg-[#2EC4A0] px-7 py-4 text-sm font-black text-white shadow-[0_4px_20px_rgba(46,196,160,0.4)] transition hover:-translate-y-0.5 hover:bg-[#20A882]">
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
                <div className="font-heading text-2xl font-extrabold text-[#2EC4A0] md:text-3xl">{value}</div>
                <div className="mt-1 text-xs leading-4 text-white/55">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[420px] rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/55">Your Credit Score</p>
          <div className="relative mx-auto mb-7 size-44">
            <svg className="size-full rotate-[135deg]" viewBox="0 0 160 160" aria-hidden="true">
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
              <circle className="score-meter-ring" cx="80" cy="80" r="70" fill="none" stroke="#2EC4A0" strokeWidth="12" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="font-heading text-5xl font-extrabold leading-none text-white">742</div>
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

      <section className="grid gap-4 border-b border-[#EEF2F6] bg-[#F8FAFB] px-5 py-6 text-sm font-semibold text-[#3D5066] sm:grid-cols-2 md:px-10 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-10 lg:gap-y-4 lg:px-[5%]">
        {trustItems.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#2EC4A0] text-xs text-white">✓</span>
            {item}
          </div>
        ))}
      </section>

      <section id="download" className="flex flex-col items-center justify-center gap-8 bg-[#1B3A57] px-5 py-14 text-center md:flex-row md:px-10 md:text-left lg:px-[5%]">
        <div>
          <h2 className="font-heading text-3xl font-extrabold text-white">Get ScoreCare on Your Phone</h2>
          <p className="mt-2 text-sm text-white/60">Available on Android and iOS. Free to download, forever free to use.</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a href={PLAY_STORE_URL} aria-label="Download on the App Store" className="flex h-14 w-44 items-center justify-center transition hover:-translate-y-0.5">
            <Image src={appleStoreLogo} alt="Download on the App Store" className="h-14 w-44 object-contain" />
          </a>
          <a href={PLAY_STORE_URL} aria-label="Get it on Google Play" className="flex h-14 w-44 items-center justify-center transition hover:-translate-y-0.5">
            <Image src={googlePlayLogo} alt="Get it on Google Play" className="h-14 w-44 object-contain" />
          </a>
        </div>
      </section>

      <section id="credit-score" className="px-5 py-16 md:px-10 md:py-20 lg:px-[5%]">
        <SectionHeading eyebrow="Credit Education" title="What is a Credit Score?" subtitle="A credit score is a 3-digit number from 300 to 900 that tells lenders how creditworthy you are." />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="font-heading text-2xl font-extrabold text-[#1B3A57]">Score Ranges Explained</h3>
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
            <h3 className="font-heading text-2xl font-extrabold text-[#1B3A57]">What Affects Your Score?</h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {creditFactors.map(([percent, title, copy, icon]) => (
                <div key={title} className="rounded-2xl border border-[#EEF2F6] bg-[#F8FAFB] p-5 transition hover:-translate-y-0.5 hover:border-[#2EC4A0] hover:shadow-[0_4px_24px_rgba(27,58,87,0.10)]">
                  <div className="mb-3 grid size-10 place-items-center rounded-xl bg-[#E6FAF5] text-xs font-black text-[#2EC4A0]">{icon}</div>
                  <div className="font-heading text-2xl font-extrabold text-[#2EC4A0]">{percent}</div>
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
          {benefits.map(([index, title, copy]) => (
            <div key={title} className="rounded-3xl border border-[#EEF2F6] bg-white p-7 transition hover:-translate-y-1 hover:border-[#2EC4A0] hover:shadow-[0_12px_48px_rgba(27,58,87,0.16)]">
              <div className="mb-5 grid size-14 place-items-center rounded-2xl bg-[#E6FAF5] font-heading text-sm font-extrabold text-[#2EC4A0]">{index}</div>
              <h3 className="font-heading text-lg font-extrabold text-[#1B3A57]">{title}</h3>
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
              <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-[#2EC4A0] font-heading text-xl font-extrabold text-white shadow-[0_0_0_6px_#E6FAF5]">{index + 1}</div>
              <h4 className="font-heading font-extrabold text-[#1B3A57]">{step}</h4>
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
              <a href={PLAY_STORE_URL} className="rounded-full bg-[#2EC4A0] px-7 py-4 text-center text-sm font-black text-white">Get Started Free</a>
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
              <h3 className="font-heading text-lg font-extrabold text-[#1B3A57]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7F94]">{copy}</p>
              <Link
                href={policyRoutes[title] ?? "#"}
                className="mt-4 inline-block text-sm font-bold text-[#2EC4A0]"
              >
                Read More
              </Link>
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
              ["email", "Email Us", "support@scorecareapp.com", "partnerships@scorecareapp.com", "mailto:support@scorecareapp.com"],
              ["phone", "Call Us", "+91 7799440408", "Mon-Sat, 9am - 6pm IST", "tel:+917799440408"],
              ["whatsapp", "WhatsApp Support", "Message us on WhatsApp for quick help.", ""],
              ["address", "Office Address", "Scoresathi Technologies Pvt. Ltd., Hyderabad, Telangana, India", ""],
            ].map(([type, title, lineOne, lineTwo, href]) => {
              const content = (
                <>
                  <div className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-[#E6FAF5] text-[#2EC4A0] shadow-[0_10px_24px_rgba(46,196,160,0.12)] transition duration-300 group-hover:bg-[#2EC4A0] group-hover:text-white">
                    <span className="absolute inset-0 rounded-2xl bg-[#2EC4A0]/20 opacity-0 transition group-hover:animate-ping group-hover:opacity-60" />
                    <span className="relative">
                      <ContactIcon type={type} />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-[#1B3A57]">{title}</h4>
                    <p className="mt-1 text-sm leading-6 text-[#6B7F94]">{lineOne}</p>
                    {lineTwo ? <p className="text-sm leading-6 text-[#6B7F94]">{lineTwo}</p> : null}
                  </div>
                </>
              );

              return href ? (
                <a key={title} href={href} className="group flex gap-4 rounded-2xl transition duration-300 hover:translate-x-1">
                  {content}
                </a>
              ) : (
                <div key={title} className="group flex gap-4 rounded-2xl transition duration-300 hover:translate-x-1">
                  {content}
                </div>
              );
            })}
          </div>
          <form onSubmit={handleContactSubmit} className="rounded-3xl border border-[#EEF2F6] bg-[#F8FAFB] p-6 sm:p-8">
            <h3 className="font-heading text-2xl font-extrabold text-[#1B3A57]">Send us a message</h3>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold text-[#1B3A57]">
                First Name
                <input name="firstName" value={contactForm.firstName} onChange={handleContactChange} className={contactInputClass("firstName")} type="text" placeholder="Rahul" required aria-invalid={Boolean(contactTouched.firstName && contactErrors.firstName)} />
                {contactTouched.firstName && contactErrors.firstName ? <p className="mt-1 text-xs font-semibold text-[#FF5B5B]">{contactErrors.firstName}</p> : null}
              </label>
              <label className="text-sm font-bold text-[#1B3A57]">
                Last Name
                <input name="lastName" value={contactForm.lastName} onChange={handleContactChange} className={contactInputClass("lastName")} type="text" placeholder="Sharma" required aria-invalid={Boolean(contactTouched.lastName && contactErrors.lastName)} />
                {contactTouched.lastName && contactErrors.lastName ? <p className="mt-1 text-xs font-semibold text-[#FF5B5B]">{contactErrors.lastName}</p> : null}
              </label>
            </div>
            <label className="mt-4 block text-sm font-bold text-[#1B3A57]">
              Email Address
              <input name="emailAddress" value={contactForm.emailAddress} onChange={handleContactChange} className={contactInputClass("emailAddress")} type="email" placeholder="rahul@email.com" required aria-invalid={Boolean(contactTouched.emailAddress && contactErrors.emailAddress)} />
              {contactTouched.emailAddress && contactErrors.emailAddress ? <p className="mt-1 text-xs font-semibold text-[#FF5B5B]">{contactErrors.emailAddress}</p> : null}
            </label>
            <label className="mt-4 block text-sm font-bold text-[#1B3A57]">
              Message
              <textarea name="message" value={contactForm.message} onChange={handleContactChange} className={`${contactInputClass("message")} min-h-28 resize-y`} placeholder="Tell us how we can help you..." required aria-invalid={Boolean(contactTouched.message && contactErrors.message)} />
              {contactTouched.message && contactErrors.message ? <p className="mt-1 text-xs font-semibold text-[#FF5B5B]">{contactErrors.message}</p> : null}
            </label>
            <button disabled={isContactSubmitting || !isContactFormValid} className="mt-5 w-full rounded-full bg-[#2EC4A0] px-6 py-4 text-sm font-black text-white transition hover:bg-[#20A882] disabled:cursor-not-allowed disabled:opacity-70" type="submit">
              {isContactSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {showContactSuccess ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#1B3A57]/55 px-5 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-[0_24px_80px_rgba(27,58,87,0.28)]">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#E6FAF5] text-3xl text-[#2EC4A0]">
              <IconRosetteDiscountCheck size={34} stroke={2.2} />
            </div>
            <h3 className="mt-5 font-heading text-2xl font-extrabold text-[#1B3A57]">Thank you for contacting us</h3>
            <p className="mt-3 text-sm leading-6 text-[#6B7F94]">We received your message and our team will get back to you shortly.</p>
            <button onClick={() => setShowContactSuccess(false)} className="mt-6 w-full rounded-full bg-[#2EC4A0] px-6 py-3 text-sm font-black text-white transition hover:bg-[#20A882]" type="button">
              Close
            </button>
          </div>
        </div>
      ) : null}

      <footer className="bg-[#1B3A57] px-5 py-10 text-white/65 md:px-10 lg:px-[5%]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-14 w-40 items-center overflow-hidden rounded-xl bg-white">
                <Image
                  src={scorecareLogo}
                  alt="ScoreCare"
                  className="h-10 w-40 scale-[2.05] object-contain"
                />
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">ScoreCare by Scoresathi Technologies, helping every Indian understand, monitor, and improve their credit score.</p>
          </div>
          {[
            ["Product", ["Credit Score", "Features", "Download App"]],
            ["Company", ["About Us", "Contact", "Careers"]],
            ["Legal", ["Privacy Policy", "Terms of Service", "Disclaimer", "Account Deletion"]],
          ].map(([title, links]) => (
            <div key={title as string} className="min-w-0">
              <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-white">{title}</h4>
              <ul className="space-y-3 text-sm">
                {(links as string[]).map((link) => (
                  <li key={link}>
                    {policyRoutes[link] ? (
                      <Link href={policyRoutes[link]} className="transition hover:text-[#2EC4A0]">{link}</Link>
                    ) : (
                      <a href="#" className="transition hover:text-[#2EC4A0]">{link}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-5 text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Scoresathi Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Integrated with Experian & CRIF High Mark.</p>
        </div>
      </footer>
    </main>
  );
}
