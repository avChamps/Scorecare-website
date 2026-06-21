"use client";

import { useEffect, useState } from "react";

export default function PrivacyPolicyNav({
  sections,
  ariaLabel = "Privacy policy sections",
}: {
  sections: string[][];
  ariaLabel?: string;
}) {
  const [activeSection, setActiveSection] = useState(sections[0][0]);

  useEffect(() => {
    let frameId = 0;

    function updateActiveSection() {
      const readingOffset = 160;
      let currentSection = sections[0][0];

      for (const [id] of sections) {
        const section = document.getElementById(id);

        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top <= readingOffset) {
          currentSection = id;
        } else {
          break;
        }
      }

      setActiveSection(currentSection);
      frameId = 0;
    }

    function handleScroll() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateActiveSection);
      }
    }

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [sections]);

  return (
    <nav aria-label={ariaLabel}>
      <ol className="space-y-1.5">
        {sections.map(([id, title], index) => {
          const isActive = activeSection === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={`relative flex gap-3 rounded-lg px-3 py-2 text-sm leading-5 transition ${
                  isActive
                    ? "bg-[#E8F9F5] font-bold text-[#15977A]"
                    : "text-[#607487] hover:bg-[#ECF9F6] hover:text-[#15977A]"
                }`}
              >
                <span
                  className={`w-5 shrink-0 font-semibold ${
                    isActive ? "text-[#15977A]" : "text-[#9AAAB8]"
                  }`}
                >
                  {index + 1}.
                </span>
                {title}
                {isActive ? (
                  <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-[#2EC4A0]" />
                ) : null}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
