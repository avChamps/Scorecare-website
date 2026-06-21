"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api/api";
import PrivacyPolicyNav from "../privacy-policy/privacy-policy-nav";

type WebsiteSettingsResponse = {
  status: string;
  data?: {
    accountDeletion?: string;
  };
};

type PolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

type AccountDeletionPolicy = {
  introduction: string[];
  sections: PolicySection[];
};

function createSectionId(title: string, index: number) {
  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return id || `section-${index + 1}`;
}

function combineLines(lines: string[]) {
  const paragraphs: string[] = [];
  let paragraph = "";

  for (const line of lines) {
    if (/^(?:[-•●▪]|\d+[.)])\s+/.test(line)) {
      if (paragraph) {
        paragraphs.push(paragraph);
        paragraph = "";
      }

      paragraphs.push(line);
      continue;
    }

    paragraph = `${paragraph} ${line}`.trim();

    if (/[.!?:)]$/.test(line)) {
      paragraphs.push(paragraph);
      paragraph = "";
    }
  }

  if (paragraph) {
    paragraphs.push(paragraph);
  }

  return paragraphs;
}

function parsePolicyPages(pages: { text: string; height: number }[][]): AccountDeletionPolicy | null {
  const lines = pages.flat().filter(({ text }) => text);

  if (!lines.length) {
    return null;
  }

  const sortedHeights = lines.map(({ height }) => height).sort((first, second) => first - second);
  const medianHeight = sortedHeights[Math.floor(sortedHeights.length / 2)] || 1;
  const contentLines = lines.filter(
    ({ text }, index) => !(index === 0 && /account\s+deletion/i.test(text)),
  );
  const headingIndexes = contentLines
    .map(({ text, height }, index) => {
      const isNumberedHeading = /^\d+(?:\.\d+)*[.)]?\s+[A-Za-z]/.test(text);
      const isProminentHeading = height >= medianHeight * 1.15 && text.length <= 100;
      const isUppercaseHeading =
        text.length <= 100 && text === text.toUpperCase() && /[A-Z]{3}/.test(text);

      return isNumberedHeading || isProminentHeading || isUppercaseHeading ? index : -1;
    })
    .filter((index) => index >= 0);

  if (!headingIndexes.length) {
    return {
      introduction: [],
      sections: [
        {
          id: "account-deletion-policy",
          title: "Account Deletion Policy",
          paragraphs: combineLines(contentLines.map(({ text }) => text)),
        },
      ],
    };
  }

  return {
    introduction: combineLines(
      contentLines.slice(0, headingIndexes[0]).map(({ text }) => text),
    ),
    sections: headingIndexes.map((headingIndex, index) => {
      const title = contentLines[headingIndex].text.replace(/^\d+(?:\.\d+)*[.)]?\s*/, "");
      const nextHeadingIndex = headingIndexes[index + 1] ?? contentLines.length;

      return {
        id: createSectionId(title, index),
        title,
        paragraphs: combineLines(
          contentLines.slice(headingIndex + 1, nextHeadingIndex).map(({ text }) => text),
        ),
      };
    }),
  };
}

export default function AccountDeletionDocument() {
  const [policy, setPolicy] = useState<AccountDeletionPolicy | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAccountDeletionPolicy() {
      try {
        const settingsResponse = await fetch(`${API_BASE_URL}/website-settings`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const settings = (await settingsResponse.json()) as WebsiteSettingsResponse;
        const pdfUrl = settings.data?.accountDeletion?.trim();

        if (!settingsResponse.ok || settings.status !== "success" || !pdfUrl) {
          throw new Error("Unable to load account deletion settings");
        }

        const pdfResponse = await fetch(pdfUrl, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!pdfResponse.ok) {
          throw new Error("Unable to load account deletion PDF");
        }

        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        const document = await pdfjs.getDocument({
          data: new Uint8Array(await pdfResponse.arrayBuffer()),
        }).promise;
        const pages: { text: string; height: number }[][] = [];

        for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
          const page = await document.getPage(pageNumber);
          const content = await page.getTextContent();
          const lines: { text: string; height: number }[] = [];
          let currentText = "";
          let currentHeight = 0;

          for (const item of content.items) {
            if (!("str" in item)) {
              continue;
            }

            currentText = `${currentText} ${item.str}`.trim();
            currentHeight = Math.max(currentHeight, item.height);

            if (item.hasEOL) {
              lines.push({ text: currentText.replace(/\s+/g, " "), height: currentHeight });
              currentText = "";
              currentHeight = 0;
            }
          }

          if (currentText) {
            lines.push({ text: currentText.replace(/\s+/g, " "), height: currentHeight });
          }

          pages.push(lines);
        }

        const parsedPolicy = parsePolicyPages(pages);

        if (!parsedPolicy) {
          throw new Error("Unable to read account deletion PDF content");
        }

        setPolicy(parsedPolicy);
      } catch (error) {
        if (!(error instanceof Error && error.name === "AbortError")) {
          setHasError(true);
        }
      }
    }

    void loadAccountDeletionPolicy();

    return () => controller.abort();
  }, []);

  if (hasError) {
    return (
      <p className="rounded-2xl border border-[#E1EAEF] bg-white p-8 text-center text-[#52677C]">
        The account deletion policy is currently unavailable. Please try again later.
      </p>
    );
  }

  if (!policy) {
    return <p className="py-16 text-center text-[#52677C]">Loading account deletion policy…</p>;
  }

  const navigationSections = policy.sections.map(({ id, title }) => [id, title]);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="hidden rounded-2xl border border-[#E1EAEF] bg-white p-5 shadow-[0_12px_35px_rgba(27,58,87,0.06)] lg:sticky lg:top-24 lg:block">
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#15977A]">
          On this page
        </p>
        <PrivacyPolicyNav
          sections={navigationSections}
          ariaLabel="Account deletion sections"
        />
      </aside>

      <article className="overflow-hidden rounded-2xl border border-[#E1EAEF] bg-white shadow-[0_18px_50px_rgba(27,58,87,0.07)]">
        {policy.introduction.length ? (
          <div className="space-y-4 border-b border-[#E8EEF2] bg-gradient-to-br from-[#F1FBF8] to-white px-6 py-9 text-[15px] leading-7 text-[#52677C] sm:px-10 sm:text-base">
            {policy.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        ) : null}

        {policy.sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 border-b border-[#E8EEF2] px-6 py-9 last:border-b-0 sm:px-10 sm:py-11"
          >
            <div className="mb-6 flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F9F5] text-sm font-extrabold text-[#15977A]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-heading pt-1 text-2xl font-extrabold leading-tight text-[#1B3A57]">
                {section.title}
              </h2>
            </div>
            <div className="space-y-5 text-[15px] leading-7 text-[#52677C] sm:text-base">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </article>
    </div>
  );
}
