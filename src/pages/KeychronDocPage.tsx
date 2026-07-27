"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import Keyboard, { type KeyboardThemeName } from "../components/ui/keyboard";
import {
  Copy,
  Check,
  Maximize2,
  RotateCcw,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import { useSiteTheme } from "../context/ThemeContext";
import "../index.css";

const packageManagers = ["bun", "npm", "pnpm", "yarn"] as const;
type PackageManager = (typeof packageManagers)[number];

const installCommands: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add keychron-keyboard",
  npm: "npx shadcn@latest add keychron-keyboard",
  yarn: "yarn dlx shadcn@latest add keychron-keyboard",
  bun: "bunx shadcn@latest add keychron-keyboard",
};

const themes: { name: KeyboardThemeName; label: string }[] = [
  { name: "classic", label: "Classic" },
  { name: "mint", label: "Mint" },
  { name: "royal", label: "Royal" },
  { name: "dolch", label: "Dolch" },
  { name: "sand", label: "Sand" },
  { name: "scarlet", label: "Scarlet" },
];

export default function KeychronDocPage() {
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [activePm, setActivePm] = useState<PackageManager>("pnpm");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { siteTheme, setSiteTheme } = useSiteTheme();
  const [selectedKbTheme, setSelectedKbTheme] = useState<KeyboardThemeName>("classic");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const isDark = siteTheme === "dark";

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const usageCode = `export default function Page() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center py-10">
      <Keyboard theme="${selectedKbTheme}" enableHaptics enableSound />
    </div>
  );
}`;

  const utilsCode = `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

  const keyboardSourceCode = `"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useHaptic } from "web-haptics/react";

export default function Keyboard({ theme = "classic", enableSound = true, enableHaptics = true }) {
  return (
    <div className="mx-auto w-fit p-2 bg-[#1c1c1f] rounded-[16px] shadow-2xl">
      {/* Keychron K2 Mechanical Keyboard Replica */}
    </div>
  );
}`;

  return (
    <div
      className={`min-h-screen w-full flex flex-col font-sans selection:bg-neutral-800 selection:text-white ${
        isDark ? "bg-[#0e0e11] text-neutral-100" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      {/* Main Responsive Split Layout */}
      <div className="w-full flex-1 flex flex-col lg:flex-row items-start min-h-screen">
        {/* Left Documentation Pane - SECOND ON MOBILE (order-2 lg:order-1) */}
        <div
          className={`order-2 lg:order-1 w-full lg:w-1/2 overflow-y-auto border-r p-6 md:p-10 lg:pl-16 flex justify-start ${
            isDark ? "border-neutral-800/80 bg-[#0e0e11]" : "border-neutral-200/80 bg-white"
          }`}
        >
          <div className="w-full max-w-xl space-y-8">
            {/* Back Button / Breadcrumb directly above title */}
            <div className="flex items-center gap-2 text-xs">
              <Link
                to="/"
                className={`flex items-center gap-1 font-medium transition-colors ${
                  isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </Link>
              <span className="opacity-40">&gt;</span>
              <span className={`font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                Keychron Mechanical Keyboard
              </span>
            </div>

            {/* Title section */}
            <div className="space-y-4 pt-1">
              <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
                Keychron K2 Mechanical Keyboard
              </h1>
              <p className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                A Keychron K2 inspired 75% mechanical keyboard component with 6 built-in keycap color themes, optional web haptics, and mechanical switch audio sprite playback.
              </p>
            </div>

            {/* Installation Section */}
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
                Installation
              </h2>

              {/* CLI vs Manual Switcher Pills */}
              <div
                className={`inline-flex rounded-lg p-1 text-xs font-medium ${
                  isDark ? "bg-[#18181c] border border-neutral-800" : "bg-neutral-200/60 border border-neutral-300"
                }`}
              >
                <button
                  onClick={() => setInstallTab("cli")}
                  className={`px-4 py-1.5 rounded-md transition-colors ${
                    installTab === "cli"
                      ? isDark
                        ? "bg-[#282830] text-white shadow-sm font-semibold"
                        : "bg-white text-black shadow-sm font-semibold"
                      : isDark
                      ? "text-neutral-400 hover:text-white"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  CLI
                </button>
                <button
                  onClick={() => setInstallTab("manual")}
                  className={`px-4 py-1.5 rounded-md transition-colors ${
                    installTab === "manual"
                      ? isDark
                        ? "bg-[#282830] text-white shadow-sm font-semibold"
                        : "bg-white text-black shadow-sm font-semibold"
                      : isDark
                      ? "text-neutral-400 hover:text-white"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  Manual
                </button>
              </div>

              {/* Step Contents */}
              {installTab === "cli" ? (
                <div className="space-y-8 pt-2">
                  {/* Step 1: Run Command */}
                  <div className={`space-y-3 pl-4 border-l-2 ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
                    <h3 className={`text-sm font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                      Run the following command
                    </h3>

                    <div
                      className={`rounded-xl border overflow-hidden ${
                        isDark ? "border-neutral-800 bg-[#08080a]" : "border-neutral-200 bg-neutral-100/90"
                      }`}
                    >
                      {/* Package Manager Header Tabs */}
                      <div
                        className={`flex items-center border-b px-3 py-1 text-xs ${
                          isDark ? "border-neutral-800 bg-[#0e0e11]" : "border-neutral-200 bg-neutral-200/50"
                        }`}
                      >
                        <span className="opacity-40 font-mono text-[11px] mr-2">&gt;_</span>
                        {packageManagers.map((pm) => (
                          <button
                            key={pm}
                            onClick={() => setActivePm(pm)}
                            className={`px-3 py-1.5 text-xs font-medium ${
                              activePm === pm
                                ? isDark
                                  ? "text-white border-b-2 border-white font-semibold"
                                  : "text-neutral-900 border-b-2 border-neutral-900 font-semibold"
                                : isDark
                                ? "text-neutral-400 hover:text-neutral-200"
                                : "text-neutral-500 hover:text-neutral-800"
                            }`}
                          >
                            {pm}
                          </button>
                        ))}

                        <button
                          onClick={() => copyToClipboard(installCommands[activePm], "cli-cmd")}
                          className={`ml-auto p-1 ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"}`}
                          aria-label="Copy Command"
                        >
                          {copiedId === "cli-cmd" ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Clean CLI Command output */}
                      <div className={`p-4 font-mono text-xs overflow-x-auto ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                        <span>{installCommands[activePm]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Add sound file */}
                  <div className={`space-y-3 pl-4 border-l-2 ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
                    <h3 className={`text-sm font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                      Add sound file
                    </h3>

                    <p className={`text-xs leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                      Download the sound files and place them in your{" "}
                      <code className={`px-1.5 py-0.5 rounded font-mono text-xs ${isDark ? "bg-[#1e1e24] text-amber-300" : "bg-neutral-200 text-amber-900"}`}>
                        public/sounds/
                      </code>{" "}
                      folder:
                    </p>

                    <ul className={`text-xs space-y-1.5 list-disc pl-5 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                      <li>
                        <strong className={isDark ? "text-white underline" : "text-black underline"}>sound.ogg</strong> - Audio sprite file
                      </li>
                      <li>
                        <strong className={isDark ? "text-white underline" : "text-black underline"}>config.json</strong> - Sound timing configuration
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                /* Manual Installation View */
                <div className="space-y-8 pt-2">
                  {/* Step 1: Install dependencies */}
                  <div className={`space-y-3 pl-4 border-l-2 ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
                    <h3 className={`text-sm font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                      Install dependencies
                    </h3>

                    <div
                      className={`rounded-xl border p-4 font-mono text-xs flex items-center justify-between overflow-x-auto ${
                        isDark ? "border-neutral-800 bg-[#08080a] text-neutral-200" : "border-neutral-200 bg-neutral-100/90 text-neutral-800"
                      }`}
                    >
                      <span className="font-mono">npm i motion clsx tailwind-merge web-haptics lucide-react</span>
                      <button
                        onClick={() => copyToClipboard("npm i motion clsx tailwind-merge web-haptics lucide-react", "dep-cmd")}
                        className={isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"}
                      >
                        {copiedId === "dep-cmd" ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Step 2: lib/utils.ts */}
                  <div className={`space-y-3 pl-4 border-l-2 ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
                    <h3 className={`text-sm font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>lib/utils.ts</h3>

                    <div
                      className={`rounded-xl border p-4 font-mono text-xs relative ${
                        isDark ? "border-neutral-800 bg-[#08080a] text-neutral-200" : "border-neutral-200 bg-neutral-100/90 text-neutral-800"
                      }`}
                    >
                      <button
                        onClick={() => copyToClipboard(utilsCode, "utils-code")}
                        className={`absolute top-3 right-3 flex items-center gap-1 text-[11px] border px-2 py-1 rounded-md ${
                          isDark ? "border-neutral-800 bg-[#121215] text-neutral-400 hover:text-white" : "border-neutral-300 bg-white text-neutral-600 hover:text-black"
                        }`}
                      >
                        {copiedId === "utils-code" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        <span>Copy</span>
                      </button>
                      <pre className="leading-relaxed">
                        <code>
                          <span className={isDark ? "text-purple-400" : "text-purple-600"}>import</span> &#123; ClassValue, clsx &#125; <span className={isDark ? "text-purple-400" : "text-purple-600"}>from</span> <span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;clsx&quot;</span>;{"\n"}
                          <span className={isDark ? "text-purple-400" : "text-purple-600"}>import</span> &#123; twMerge &#125; <span className={isDark ? "text-purple-400" : "text-purple-600"}>from</span> <span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;tailwind-merge&quot;</span>;{"\n\n"}
                          <span className={isDark ? "text-purple-400" : "text-purple-600"}>export function</span> <span className={isDark ? "text-blue-400" : "text-blue-600"}>cn</span>(...inputs: ClassValue[]) &#123;{"\n"}
                          {"  "}<span className={isDark ? "text-purple-400" : "text-purple-600"}>return</span> <span className={isDark ? "text-blue-400" : "text-blue-600"}>twMerge</span>(<span className={isDark ? "text-blue-400" : "text-blue-600"}>clsx</span>(inputs));{"\n"}
                          &#125;
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Step 3: Add sound file */}
                  <div className={`space-y-3 pl-4 border-l-2 ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
                    <h3 className={`text-sm font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                      Add sound file
                    </h3>

                    <p className={`text-xs leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                      Download the sound files and place them in your{" "}
                      <code className={`px-1.5 py-0.5 rounded font-mono text-xs ${isDark ? "bg-[#1e1e24] text-amber-300" : "bg-neutral-200 text-amber-900"}`}>
                        public/sounds/
                      </code>{" "}
                      folder:
                    </p>

                    <ul className={`text-xs space-y-1.5 list-disc pl-5 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                      <li>
                        <strong className={isDark ? "text-white underline" : "text-black underline"}>sound.ogg</strong> - Audio sprite file
                      </li>
                      <li>
                        <strong className={isDark ? "text-white underline" : "text-black underline"}>config.json</strong> - Sound timing configuration
                      </li>
                    </ul>
                  </div>

                  {/* Step 4: Copy source code */}
                  <div className={`space-y-3 pl-4 border-l-2 ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
                    <h3 className={`text-sm font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                      Copy the source code
                    </h3>

                    <div
                      className={`inline-block rounded-md border px-2.5 py-1 font-mono text-xs ${
                        isDark ? "border-neutral-800 bg-[#121215] text-neutral-300" : "border-neutral-300 bg-neutral-200/70 text-neutral-800"
                      }`}
                    >
                      components/ui/keyboard.tsx
                    </div>

                    <div
                      className={`rounded-xl border p-4 font-mono text-xs relative overflow-hidden ${
                        isDark ? "border-neutral-800 bg-[#08080a] text-neutral-200" : "border-neutral-200 bg-neutral-100/90 text-neutral-800"
                      }`}
                    >
                      <button
                        onClick={() => copyToClipboard(keyboardSourceCode, "src-code")}
                        className={`absolute top-3 right-3 flex items-center gap-1 text-[11px] border px-2 py-1 rounded-md z-10 ${
                          isDark ? "border-neutral-800 bg-[#121215] text-neutral-400 hover:text-white" : "border-neutral-300 bg-white text-neutral-600 hover:text-black"
                        }`}
                      >
                        {copiedId === "src-code" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        <span>Copy</span>
                      </button>

                      <div className={`overflow-hidden ${!isExpanded ? "max-h-40" : ""}`}>
                        <pre className="leading-relaxed">
                          <code>
                            <span className={isDark ? "text-purple-400" : "text-purple-600"}>&quot;use client&quot;</span>;{"\n\n"}
                            <span className={isDark ? "text-purple-400" : "text-purple-600"}>import</span> React, &#123; useState, useEffect &#125; <span className={isDark ? "text-purple-400" : "text-purple-600"}>from</span> <span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;react&quot;</span>;{"\n"}
                            <span className={isDark ? "text-purple-400" : "text-purple-600"}>import</span> &#123; cn &#125; <span className={isDark ? "text-purple-400" : "text-purple-600"}>from</span> <span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;@/lib/utils&quot;</span>;{"\n"}
                            <span className={isDark ? "text-purple-400" : "text-purple-600"}>import</span> &#123; useHaptic &#125; <span className={isDark ? "text-purple-400" : "text-purple-600"}>from</span> <span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;web-haptics/react&quot;</span>;{"\n\n"}
                            <span className={isDark ? "text-purple-400" : "text-purple-600"}>export default function</span> <span className={isDark ? "text-blue-400" : "text-blue-600"}>Keyboard</span>(&#123; theme = <span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;classic&quot;</span>, enableSound = <span className={isDark ? "text-purple-400" : "text-purple-600"}>true</span>, enableHaptics = <span className={isDark ? "text-purple-400" : "text-purple-600"}>true</span> &#125;) &#123;{"\n"}
                            {"  "}<span className={isDark ? "text-purple-400" : "text-purple-600"}>return</span> ({"\n"}
                            {"    "}&lt;<span className={isDark ? "text-pink-400" : "text-pink-600"}>div</span> <span className={isDark ? "text-orange-300" : "text-orange-600"}>className</span>=<span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;mx-auto w-fit p-2 bg-[#1c1c1f] rounded-[16px] shadow-2xl&quot;</span>&gt;{"\n"}
                            {"      "}&#123;/* Keychron K2 Mechanical Keyboard Replica */&#125;{"\n"}
                            {"    "}&lt;/<span className={isDark ? "text-pink-400" : "text-pink-600"}>div</span>&gt;{"\n"}
                            {"  "});{"\n"}
                            &#125;
                          </code>
                        </pre>
                      </div>

                      {!isExpanded && (
                        <div className={`absolute inset-x-0 bottom-0 h-20 flex items-end justify-center pb-2 bg-gradient-to-t ${isDark ? "from-[#08080a] to-transparent" : "from-neutral-100 to-transparent"}`}>
                          <button
                            onClick={() => setIsExpanded(true)}
                            className={`px-4 py-1 rounded-md text-xs font-semibold shadow-lg transition-colors ${
                              isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-neutral-900 text-white hover:bg-black"
                            }`}
                          >
                            Expand
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Usage Section */}
            <div className={`space-y-4 pt-6 border-t ${isDark ? "border-neutral-800/60" : "border-neutral-200/80"}`}>
              <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>Usage</h2>

              {/* Import Statement */}
              <div
                className={`relative rounded-xl border p-3 font-mono text-xs flex items-center justify-between ${
                  isDark ? "border-neutral-800/80 bg-[#08080a] text-neutral-300" : "border-neutral-200 bg-white text-neutral-800"
                }`}
              >
                <code>import Keyboard from &quot;@/components/ui/keyboard&quot;;</code>
                <button
                  onClick={() => copyToClipboard('import Keyboard from "@/components/ui/keyboard";', "import-cmd")}
                  className={`p-1 ${
                    isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"
                  }`}
                >
                  {copiedId === "import-cmd" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {/* Component Usage Code Block */}
              <div
                className={`rounded-xl border overflow-hidden ${
                  isDark ? "border-neutral-800/80 bg-[#08080a]" : "border-neutral-200 bg-white"
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b px-3 py-2 text-xs ${
                    isDark ? "border-neutral-800/80 bg-[#0e0e11]" : "border-neutral-200 bg-neutral-100"
                  }`}
                >
                  <span className="font-medium text-xs">Keyboard Component</span>

                  <button
                    onClick={() => copyToClipboard(usageCode, "usage-code")}
                    className={`p-1 ${
                      isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    {copiedId === "usage-code" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  <pre className={isDark ? "text-neutral-300" : "text-neutral-800"}>
                    <span className={isDark ? "text-purple-400" : "text-purple-600"}>export default function</span>{" "}
                    <span className={isDark ? "text-blue-400" : "text-blue-600"}>Page</span>() &#123;{"\n"}
                    {"  "}<span className={isDark ? "text-purple-400" : "text-purple-600"}>return</span> ({"\n"}
                    {"    "}&lt;<span className={isDark ? "text-pink-400" : "text-pink-600"}>div</span> <span className={isDark ? "text-orange-300" : "text-orange-600"}>className</span>=<span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;flex min-h-96 w-full items-center justify-center py-10&quot;</span>&gt;{"\n"}
                    {"      "}&lt;<span className={isDark ? "text-yellow-300" : "text-amber-600"}>Keyboard</span> <span className={isDark ? "text-orange-300" : "text-orange-600"}>theme</span>=<span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;{selectedKbTheme}&quot;</span> <span className={isDark ? "text-orange-300" : "text-orange-600"}>enableHaptics</span> <span className={isDark ? "text-orange-300" : "text-orange-600"}>enableSound</span> /&gt;{"\n"}
                    {"    "}&lt;/<span className={isDark ? "text-pink-400" : "text-pink-600"}>div</span>&gt;{"\n"}
                    {"  "});{"\n"}
                    &#125;
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Interactive Preview Canvas Pane - FIRST ON MOBILE (order-1 lg:order-2) */}
        <div
          className={`order-1 lg:order-2 w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-12 relative min-h-[420px] sm:min-h-[500px] overflow-hidden ${
            isDark ? "bg-[#141418]" : "bg-neutral-100"
          }`}
        >
          {/* Top Control Toolbar */}
          <div className="w-full flex items-center justify-between text-xs">
            <div
              className={`font-mono text-[11px] uppercase tracking-wider ${
                isDark ? "text-neutral-500" : "text-neutral-400"
              }`}
            >
              <span>Live Mechanical Keyboard Canvas</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled((prev) => !prev)}
                className={`p-1.5 rounded-lg border ${
                  isDark
                    ? soundEnabled
                      ? "text-emerald-400 border-emerald-500/30 bg-[#18181c]"
                      : "text-neutral-500 border-neutral-800 bg-[#18181c] hover:text-neutral-300"
                    : soundEnabled
                    ? "text-emerald-600 border-emerald-500/30 bg-white"
                    : "text-neutral-500 border-neutral-300 bg-white hover:text-neutral-800"
                }`}
                title={soundEnabled ? "Sound Effects Enabled" : "Sound Muted"}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setHapticsEnabled((prev) => !prev)}
                className={`p-1.5 rounded-lg border ${
                  isDark
                    ? hapticsEnabled
                      ? "text-purple-400 border-purple-500/30 bg-[#18181c]"
                      : "text-neutral-500 border-neutral-800 bg-[#18181c] hover:text-neutral-300"
                    : hapticsEnabled
                    ? "text-purple-600 border-purple-500/30 bg-white"
                    : "text-neutral-500 border-neutral-300 bg-white hover:text-neutral-800"
                }`}
                title={hapticsEnabled ? "Web Haptics Enabled" : "Web Haptics Disabled"}
              >
                <Smartphone className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSiteTheme(isDark ? "light" : "dark")}
                className={`p-1.5 rounded-lg border ${
                  isDark
                    ? "border-neutral-800 bg-[#18181c] hover:bg-neutral-800 text-neutral-300"
                    : "border-neutral-300 bg-white hover:bg-neutral-200 text-neutral-700"
                }`}
                title="Toggle Light / Dark Theme"
              >
                {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-neutral-600" />}
              </button>
              <button
                onClick={() => {
                  setSiteTheme("dark");
                  setSoundEnabled(true);
                  setHapticsEnabled(true);
                  setSelectedKbTheme("classic");
                }}
                className={`p-1.5 rounded-lg border ${
                  isDark
                    ? "border-neutral-800 bg-[#18181c] hover:bg-neutral-800 text-neutral-300"
                    : "border-neutral-300 bg-white hover:bg-neutral-200 text-neutral-700"
                }`}
                title="Reset Canvas"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <Link
                to="/preview?type=keychron"
                className={`p-1.5 rounded-lg border ${
                  isDark
                    ? "border-neutral-800 bg-[#18181c] hover:bg-neutral-800 text-neutral-300"
                    : "border-neutral-300 bg-white hover:bg-neutral-200 text-neutral-700"
                }`}
                title="Open Fullscreen Preview Page"
              >
                <Maximize2 className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Centered Keyboard Replica */}
          <div className="my-auto w-full flex items-center justify-center py-4 overflow-hidden max-w-full">
            <div className="transform scale-[0.36] xs:scale-[0.44] sm:scale-[0.6] md:scale-[0.72] lg:scale-[0.68] xl:scale-[0.82] 2xl:scale-[0.92] transition-transform origin-center">
              <Keyboard theme={selectedKbTheme} enableSound={soundEnabled} enableHaptics={hapticsEnabled} showPreview={true} />
            </div>
          </div>

          {/* Bottom Keychron Theme Switcher Pill & Attribution */}
          <div className="flex flex-col items-center gap-3 z-10 text-center max-w-md pb-2">
            <div
              className={`inline-flex items-center rounded-full border p-1 shadow-lg overflow-x-auto ${
                isDark ? "border-neutral-800 bg-[#18181c]" : "border-neutral-300 bg-white"
              }`}
            >
              {themes.map((t) => (
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

            <footer className={`text-[11px] leading-relaxed space-y-0.5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
              <p>This UI was created based on reference designs using Claude and custom CSS to match.</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
