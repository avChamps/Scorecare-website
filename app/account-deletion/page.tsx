import type { Metadata } from "next";
import LegalPageShell from "../legal-page-shell";

export const metadata: Metadata = {
  title: "Account Deletion | ScoreCare",
  description: "Learn how to request deletion of your ScoreCare account and data.",
};

export default function AccountDeletionPage() {
  return (
    <LegalPageShell
      documentKey="accountDeletion"
      eyebrow="Your data, your choice"
      title="Account Deletion"
      description="Learn how to request deletion of your ScoreCare account and associated data."
    />
  );
}
