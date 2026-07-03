import type { Metadata } from "next";
import LegalPageShell from "../legal-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | ScoreCare",
  description:
    "Learn how ScoreCare collects, uses, stores, and protects your personal information.",
  alternates: {
    canonical: "/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      documentKey="privacyPolicy"
      eyebrow="Your privacy matters"
      title="Privacy Policy"
      description="This policy explains what information ScoreCare collects and how we use, store, share, and protect it."
    />
  );
}
