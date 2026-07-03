import type { Metadata } from "next";
import LegalPageShell from "../legal-page-shell";

export const metadata: Metadata = {
  title: "Terms and Conditions | ScoreCare",
  description: "Terms and conditions for using ScoreCare services.",
  alternates: {
    canonical: "/terms-and-conditions/",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell
      documentKey="termsOfService"
      eyebrow="ScoreCare legal"
      title="Terms and Conditions"
      description="Review the terms that apply when you access or use ScoreCare services."
    />
  );
}
