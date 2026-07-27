"use client";

import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CustomKeyboard from "./components/ui/custom-keyboard";
import Keyboard, { type KeyboardThemeName } from "./components/ui/keyboard";
import { useSiteTheme } from "./context/ThemeContext";
import "./index.css";

const keychronThemes: { name: KeyboardThemeName; label: string }[] = [
  { name: "classic", label: "Classic" },
  { name: "mint", label: "Mint" },
  { name: "royal", label: "Royal" },
  { name: "dolch", label: "Dolch" },
  { name: "sand", label: "Sand" },
  { name: "scarlet", label: "Scarlet" },
];

export default function PreviewPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type") || "mac";
  const { siteTheme, setSiteTheme } = useSiteTheme();
  const [selectedKbTheme, setSelectedKbTheme] = useState<KeyboardThemeName>("classic");
  const isDark = siteTheme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between p-6 gap-6 font-sans overflow-hidden ${
        isDark ? "bg-[#0b0b0d] text-neutral-100" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      <div className="max-w-6xl w-full flex items-center justify-between mt-2 z-10">
        <button
          onClick={() => navigate(-1)}
          className={`inline-flex items-center px-4 py-1.5 text-xs font-medium border rounded-full transition-colors cursor-pointer ${
            isDark
              ? "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
              : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-black"
          }`}
        >
          ← Back
        </button>

        <span className={`text-xs font-mono tracking-wider uppercase ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
          {type === "keychron" ? "Keychron K2 Mechanical Preview" : "Mac Keyboard Preview"}
        </span>
      </div>

      {/* Main Full Preview Area */}
      <div className="w-full flex-1 flex items-center justify-center my-auto py-4 overflow-hidden max-w-full">
        {type === "keychron" ? (
          <div className="transform scale-[0.5] sm:scale-[0.68] md:scale-[0.85] lg:scale-[1.0] xl:scale-[1.12] 2xl:scale-[1.25] transition-transform origin-center">
            <Keyboard theme={selectedKbTheme} enableSound={true} enableHaptics={true} showPreview={true} />
          </div>
        ) : (
          <div className="transform scale-[0.55] sm:scale-[0.72] md:scale-[0.88] lg:scale-[1.05] xl:scale-[1.2] 2xl:scale-[1.32] transition-transform origin-center">
            <CustomKeyboard theme={siteTheme} enableSound={true} showPreview={true} />
          </div>
        )}
      </div>

      {/* Controls, Theme Selectors & Credits */}
      <div className="flex flex-col items-center gap-3 mb-6 pb-2 z-10 text-center max-w-xl px-4">
        {type === "keychron" ? (
          <div
            className={`inline-flex items-center rounded-full border p-1 shadow-lg overflow-x-auto ${
              isDark ? "border-neutral-800 bg-[#18181c]" : "border-neutral-300 bg-white"
            }`}
          >
            {keychronThemes.map((t) => (
              <button
                key={t.name}
                onClick={() => setSelectedKbTheme(t.name)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                  selectedKbTheme === t.name
                    ? isDark
                      ? "bg-white text-black shadow-md"
                      : "bg-neutral-900 text-white shadow-md"
                    : isDark
                    ? "text-neutral-400 hover:text-white"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        ) : (
          <div
            className={`flex items-center gap-2 rounded-full border p-1 shadow-sm ${
              isDark ? "border-neutral-800 bg-[#18181c]" : "border-neutral-300 bg-white"
            }`}
          >
            <button
              onClick={() => setSiteTheme("light")}
              className={`px-4 py-1.5 text-xs font-medium rounded-full ${
                !isDark ? "bg-neutral-900 text-white shadow-sm font-semibold" : "text-neutral-400 hover:text-white"
              }`}
            >
              Silver (Light)
            </button>
            <button
              onClick={() => setSiteTheme("dark")}
              className={`px-4 py-1.5 text-xs font-medium rounded-full ${
                isDark ? "bg-white text-black shadow-sm font-semibold" : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Space Black (Dark)
            </button>
          </div>
        )}

        {/* Attribution & Credits (Only for Mechanical Keyboard) */}
        {type === "keychron" && (
          <footer className={`text-[11px] leading-relaxed space-y-0.5 mt-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            <p>
              This UI was created based on reference designs using Claude and custom CSS to match.
            </p>
            <p>
              Original concept by{" "}
              <a
                href="https://x.com/himanhacks"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold hover:underline ${isDark ? "text-white" : "text-black"}`}
              >
                @himanhacks
              </a>
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}
