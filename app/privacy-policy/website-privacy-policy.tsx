"use client";

import { type ReactNode, useEffect, useState } from "react";
import { API_BASE_URL } from "../api/api";

type WebsiteSettingsResponse = {
  status: string;
  data?: {
    privacyPolicy?: string;
    updatedAt?: string;
  };
};

type ParsedSection = {
  id: string;
  number: string;
  title: string;
  body: string;
};

type ParsedPolicy = {
  introduction: string;
  sections: ParsedSection[];
};

const sectionDefinitions = [
  ["information-we-collect", "1", "Information We collect"],
  ["your-consent", "2", "Your consent"],
  ["use-of-information", "3", "Use and processing of Your Information"],
  ["information-sharing", "4", "Disclosure/ sharing of Your information"],
  ["storage-retention", "5", "Storage, retention and deletion of Your Information"],
  ["tracking-technologies", "6", "Tracking Technologies"],
  ["your-rights", "7", "Your rights and choices"],
  ["your-duties", "8", "Your duties"],
  ["information-security", "9", "Information security"],
  ["no-children", "10", "No children"],
  ["policy-changes", "11", "Changes to privacy policy"],
  ["privacy-questions", "12", "Privacy questions and access"],
  ["withdrawal-of-consent", "13", "Withdrawal of consent"],
  ["dispute-redressal", "14", "Dispute redressal"],
] as const;

const introductionStarts = [
  "Welcome to ScoreCare",
  "We respect the privacy",
  "Your privacy is at the core",
  "We prioritize the establishment",
  "This privacy policy",
  "Our Privacy Policy may change",
  "It is clarified that",
  "By using the Company",
  "By choosing to provide",
  "This Privacy Policy seeks",
  "By accessing Our Platform",
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parsePolicyText(value: string): ParsedPolicy | null {
  const text = value.replace(/\s+/g, " ").trim();
  const matches = sectionDefinitions.map(([, number, title]) => {
    const pattern = new RegExp(
      `(?:^|\\s)${number}\\.\\s*${escapeRegExp(title).replaceAll(" ", "\\s+")}`,
      "i",
    );
    const match = pattern.exec(text);

    return match
      ? { start: match.index, contentStart: match.index + match[0].length }
      : null;
  });

  if (matches.some((match) => !match)) {
    return null;
  }

  const resolvedMatches = matches as { start: number; contentStart: number }[];

  return {
    introduction: text.slice(0, resolvedMatches[0].start).trim(),
    sections: sectionDefinitions.map(([id, number, title], index) => ({
      id,
      number,
      title,
      body: text
        .slice(
          resolvedMatches[index].contentStart,
          resolvedMatches[index + 1]?.start ?? text.length,
        )
        .trim(),
    })),
  };
}

function splitIntroduction(text: string) {
  const starts = introductionStarts
    .map((start) => ({ start, index: text.toLowerCase().indexOf(start.toLowerCase()) }))
    .filter(({ index }) => index >= 0)
    .sort((first, second) => first.index - second.index);

  return starts.map(({ start, index }, itemIndex) => ({
    text: text.slice(index, starts[itemIndex + 1]?.index ?? text.length).trim(),
    highlighted: start === "Your privacy is at the core",
  }));
}

function splitParagraphs(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+(?:["')\]]+)?|[^.!?]+$/g) ?? [text];
  const paragraphs: string[] = [];

  for (let index = 0; index < sentences.length; index += 3) {
    paragraphs.push(sentences.slice(index, index + 3).join(" ").trim());
  }

  return paragraphs.filter(Boolean);
}

function PolicyBody({ section }: { section: ParsedSection }) {
  const subsectionPattern = new RegExp(
    `(?=\\b${escapeRegExp(section.number)}\\.\\d+\\s)`,
    "g",
  );
  const blocks = section.body.split(subsectionPattern).filter(Boolean);

  return blocks.map((block, index) => {
    const subsection = block.match(/^(\d+\.\d+)\s*([\s\S]*)$/);
    const content = subsection?.[2] ?? block;
    const letterItems = content.split(/\s*(?=\([a-z]\)\s*)/i).filter(Boolean);

    return (
      <div key={`${section.id}-${index}`} className="space-y-3">
        {subsection ? (
          <p className="font-heading text-base font-bold text-[#274D6D]">
            <span className="mr-2 text-[#15977A]">{subsection[1]}</span>
          </p>
        ) : null}
        {letterItems.length > 1 ? (
          <div className="space-y-3">
            {letterItems.map((item, itemIndex) => {
              const letter = item.match(/^\(([a-z])\)\s*([\s\S]*)$/i);

              if (!letter) {
                return <p key={itemIndex}>{item}</p>;
              }

              return (
                <div key={itemIndex} className="flex gap-3">
                  <span className="font-semibold text-[#15977A]">({letter[1]})</span>
                  <span>{letter[2]}</span>
                </div>
              );
            })}
          </div>
        ) : (
          splitParagraphs(content).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
        )}
      </div>
    );
  });
}

export default function WebsitePrivacyPolicy({ children }: { children: ReactNode }) {
  const [policy, setPolicy] = useState<ParsedPolicy | null>(null);
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadWebsiteSettings() {
      try {
        const settingsResponse = await fetch(`${API_BASE_URL}/website-settings`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const settings = (await settingsResponse.json()) as WebsiteSettingsResponse;
        const pdfUrl = settings.data?.privacyPolicy?.trim();

        if (!settingsResponse.ok || settings.status !== "success" || !pdfUrl) {
          throw new Error("Unable to load privacy policy settings");
        }

        const pdfResponse = await fetch(pdfUrl, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!pdfResponse.ok) {
          throw new Error("Unable to load privacy policy PDF");
        }

        const pdfData = await pdfResponse.arrayBuffer();
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        const document = await pdfjs.getDocument({ data: new Uint8Array(pdfData) }).promise;
        const pages: string[] = [];

        for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
          const page = await document.getPage(pageNumber);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((item) =>
              "str" in item ? `${item.str}${item.hasEOL ? "\n" : " "}` : "",
            )
            .join("");

          pages.push(pageText);
        }

        const parsedPolicy = parsePolicyText(pages.join("\n"));

        if (!parsedPolicy) {
          throw new Error("Unable to read privacy policy PDF content");
        }

        setPolicy(parsedPolicy);
        setUpdatedAt(settings.data?.updatedAt || "");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
      }
    }

    void loadWebsiteSettings();

    return () => controller.abort();
  }, []);

  if (!policy) {
    return children;
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-[#E1EAEF] bg-white shadow-[0_18px_50px_rgba(27,58,87,0.07)]">
      <div className="border-b border-[#E8EEF2] bg-gradient-to-br from-[#F1FBF8] to-white px-6 py-9 sm:px-10">
        <div className="space-y-4 text-[15px] leading-7 text-[#52677C] sm:text-base">
          {splitIntroduction(policy.introduction).map((paragraph) =>
            paragraph.highlighted ? (
              <div key={paragraph.text} className="rounded-xl border border-[#CDEDE5] bg-white p-5">
                <p className="font-heading text-lg font-bold leading-7 text-[#1B3A57]">
                  {paragraph.text}
                </p>
              </div>
            ) : (
              <p key={paragraph.text}>{paragraph.text}</p>
            ),
          )}
        </div>
      </div>

      {policy.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-28 border-b border-[#E8EEF2] px-6 py-9 last:border-b-0 sm:px-10 sm:py-11"
        >
          <div className="mb-6 flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F9F5] text-sm font-extrabold text-[#15977A]">
              {section.number.padStart(2, "0")}
            </span>
            <h2 className="font-heading pt-1 text-2xl font-extrabold leading-tight text-[#1B3A57]">
              {section.title}
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-[#52677C] sm:text-base">
            <PolicyBody section={section} />
          </div>
        </section>
      ))}

      {updatedAt ? (
        <p className="border-t border-[#E8EEF2] px-6 py-5 text-xs font-medium text-[#718396] sm:px-10">
          Last updated:{" "}
          {new Date(updatedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      ) : null}
    </article>
  );
}
