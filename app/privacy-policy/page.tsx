import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ScoreCare",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="h-dvh bg-[#F8FAFB]">
      <iframe
        src="/PRIVACY-POLICY.pdf"
        title="ScoreCare Privacy Policy"
        className="block h-dvh w-full border-0"
      />
    </main>
  );
}
