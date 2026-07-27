"use client";

import { Link } from "react-router-dom";
import CustomKeyboard from "../components/ui/custom-keyboard";
import Keyboard from "../components/ui/keyboard";
import { Maximize2, Sun, Moon } from "lucide-react";
import { useSiteTheme } from "../context/ThemeContext";
import "../index.css";

export default function HomePage() {
  const { siteTheme, setSiteTheme } = useSiteTheme();
  const isDark = siteTheme === "dark";

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-between p-6 md:p-10 font-sans selection:bg-neutral-800 selection:text-white ${
        isDark ? "bg-[#0b0b0d] text-neutral-100" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      <div className="w-full max-w-4xl space-y-8 my-auto">
        {/* Header Title + Clean Minimal Theme Toggle */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-2xl tracking-tight">KeyUI Component</h1>

            {/* Theme Toggle aligned with title text line */}
            <button
              onClick={() => setSiteTheme(isDark ? "light" : "dark")}
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors shrink-0 ${
                isDark
                  ? "border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-black"
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-neutral-600" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          <p className={`text-xs md:text-sm max-w-lg leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            A collection of interactive keyboard components with optional haptic and mechanical sound effects.
          </p>
        </div>

        {/* Responsive Cards Section */}
        <div className="space-y-6">
          {/* Card 1: Apple Magic Keyboard */}
          <div
            className={`h-[280px] sm:h-[320px] md:h-[340px] w-full rounded-xl border overflow-hidden relative group flex items-center justify-center ${
              isDark ? "border-neutral-800/80 bg-[#121215]" : "border-neutral-200 bg-white"
            }`}
          >
            <div
              className={`w-full h-full relative overflow-hidden flex items-center justify-center p-6 ${
                isDark ? "bg-[#141418]" : "bg-white"
              }`}
            >
              <div className="transform scale-[0.88] sm:scale-[1.05] md:scale-[1.18] origin-center">
                <CustomKeyboard theme={isDark ? "dark" : "light"} enableSound={false} showPreview={false} />
              </div>

              <Link
                to="/docs/mac-keyboard"
                className={`absolute top-3 right-3 p-1.5 border rounded-lg transition-colors ${
                  isDark
                    ? "border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-black"
                }`}
                aria-label="Open Documentation Page"
              >
                <Maximize2 size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: Keychron K2 Mechanical Keyboard */}
          <div
            className={`h-[280px] sm:h-[320px] md:h-[340px] w-full rounded-xl border overflow-hidden relative group flex items-center justify-center ${
              isDark ? "border-neutral-800/80 bg-[#121215]" : "border-neutral-200 bg-white"
            }`}
          >
            <div
              className={`w-full h-full relative overflow-hidden flex items-center justify-center p-6 ${
                isDark ? "bg-[#141418]" : "bg-white"
              }`}
            >
              <div className="transform scale-[0.55] sm:scale-[0.68] md:scale-[0.75] origin-center">
                <Keyboard theme="classic" enableSound={false} enableHaptics={false} />
              </div>

              <Link
                to="/docs/keychron-keyboard"
                className={`absolute top-3 right-3 p-1.5 border rounded-lg transition-colors ${
                  isDark
                    ? "border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-black"
                }`}
                aria-label="Open Documentation Page"
              >
                <Maximize2 size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`pt-4 text-xs text-center ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
          made by{" "}
          <a
            href="https://x.com/sahilcodex"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-black"}`}
          >
            sahilcodex
          </a>
        </footer>
      </div>
    </div>
  );
}
