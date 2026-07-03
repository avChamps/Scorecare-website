import type { Metadata } from "next";
import LegalPageShell from "../legal-page-shell";

export const metadata: Metadata = {
  title: "Disclaimer | ScoreCare",
  description: "Important disclaimers for using ScoreCare content and services.",
  alternates: {
    canonical: "/disclaimer/",
  },
};

export default function DisclaimerPage() {
  return (
    <LegalPageShell
      documentKey="disclaimer"
      eyebrow="Important notice"
      title="Disclaimer"
      description="Review important limitations and disclosures related to ScoreCare content and services."
    />
  );
}
