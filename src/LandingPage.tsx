"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import CustomKeyboard from "./components/ui/custom-keyboard";
import {
  Copy,
  Check,
  Download,
  ChevronDown,
  Maximize2,
  RotateCcw,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./index.css";

const packageManagers = ["bun", "npm", "pnpm", "yarn"] as const;
type PackageManager = (typeof packageManagers)[number];

const installCommands: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add mac-keyboard",
  npm: "npx shadcn@latest add mac-keyboard",
  yarn: "yarn dlx shadcn@latest add mac-keyboard",
  bun: "bunx shadcn@latest add mac-keyboard",
};

export default function LandingPage() {
  const [activePm, setActivePm] = useState<PackageManager>("pnpm");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [siteTheme, setSiteTheme] = useState<"dark" | "light">("dark");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<"default" | "isolated">("default");

  const isDark = siteTheme === "dark";

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const usageCode = `export default function KeyboardDemo() {
  return (
    <div className="${
      isDark
        ? "flex w-full items-center justify-center p-10 bg-neutral-900 text-white"
        : "flex w-full items-center justify-center p-10 bg-neutral-100 text-neutral-900"
    }">
      <CustomKeyboard theme="${siteTheme}" enableSound={${soundEnabled}} />
    </div>
  );
}`;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-neutral-800 selection:text-white ${
        isDark ? "bg-[#0e0e11] text-neutral-100" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      {/* Top Header Bar */}
      <header
        className={`flex h-12 w-full items-center justify-between border-b px-4 backdrop-blur sticky top-0 z-50 ${
          isDark
            ? "border-neutral-800/80 bg-[#0e0e11]/90 text-neutral-400"
            : "border-neutral-200/80 bg-white/90 text-neutral-600"
        }`}
      >
        <div className="flex items-center gap-2 text-xs">
          <span>Docs</span>
          <span className="opacity-40">&gt;</span>
          <span className={`font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
            Mac Keyboard
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setSiteTheme(isDark ? "light" : "dark")}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium ${
              isDark
                ? "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-black"
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

          <Link
            to="/preview"
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium ${
              isDark
                ? "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-black"
            }`}
          >
            <span>Full Preview Page</span>
            <Maximize2 className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex flex-1 flex-col lg:flex-row min-h-[calc(100vh-3rem)]">
        {/* Left Documentation Pane */}
        <div
          className={`flex-1 overflow-y-auto border-r p-6 md:p-10 lg:max-w-[50%] xl:max-w-[48%] space-y-8 ${
            isDark ? "border-neutral-800/80 bg-[#0e0e11]" : "border-neutral-200/80 bg-white"
          }`}
        >
          {/* Header section */}
          <div className="space-y-4">
            <h1 className={`text-4xl font-semibold tracking-tight ${isDark ? "text-white" : "text-neutral-900"}`}>
              Mac Keyboard
            </h1>
            <p className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
              Interactive Mac keyboard replica with real-time keystroke tracking and
              authentic layout geometry. Features active states for physical key presses and
              optional sound feedback.
            </p>

            <div className="pt-2">
              <button
                onClick={() => copyToClipboard("# Mac Keyboard Component Documentation", "doc-md")}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs ${
                  isDark
                    ? "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                    : "border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-black"
                }`}
              >
                <span>Copy as Markdown</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>
          </div>

          {/* Installation Section */}
          <div className={`space-y-4 pt-4 border-t ${isDark ? "border-neutral-800/60" : "border-neutral-200/80"}`}>
            <h2 className={`text-lg font-medium ${isDark ? "text-white" : "text-neutral-900"}`}>
              Installation
            </h2>

            <div
              className={`rounded-xl border overflow-hidden ${
                isDark ? "border-neutral-800/80 bg-[#121215]" : "border-neutral-200 bg-neutral-100/60"
              }`}
            >
              {/* Package Manager Tabs */}
              <div
                className={`flex items-center border-b px-2 text-xs ${
                  isDark ? "border-neutral-800/80 bg-[#0e0e11]" : "border-neutral-200 bg-neutral-200/50"
                }`}
              >
                <span className="px-3 py-2 opacity-50 font-mono text-[11px]">&gt;_</span>
                {packageManagers.map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setActivePm(pm)}
                    className={`px-3 py-2 text-xs font-medium ${
                      activePm === pm
                        ? isDark
                          ? "text-white border-b-2 border-white"
                          : "text-neutral-900 border-b-2 border-neutral-900"
                        : isDark
                        ? "text-neutral-400 hover:text-neutral-200"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {pm}
                  </button>
                ))}

                <button
                  onClick={() => copyToClipboard(installCommands[activePm], "pm-cmd")}
                  className={`ml-auto p-1.5 ${
                    isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"
                  }`}
                  aria-label="Copy Command"
                >
                  {copiedId === "pm-cmd" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {/* Command Display */}
              <div
                className={`p-4 font-mono text-xs overflow-x-auto ${
                  isDark ? "text-neutral-200 bg-[#121215]" : "text-neutral-800 bg-white"
                }`}
              >
                <span>{installCommands[activePm]}</span>
              </div>
            </div>
          </div>

          {/* Usage Section */}
          <div className={`space-y-4 pt-4 border-t ${isDark ? "border-neutral-800/60" : "border-neutral-200/80"}`}>
            <h2 className={`text-lg font-medium ${isDark ? "text-white" : "text-neutral-900"}`}>Usage</h2>

            {/* Audio Requirement Callout Box */}
            <div
              className={`rounded-xl border p-4 space-y-3 ${
                isDark
                  ? "border-amber-500/20 bg-amber-500/5 text-amber-200"
                  : "border-amber-500/30 bg-amber-50 text-amber-900"
              }`}
            >
              <p className="text-xs leading-relaxed">
                <strong className="font-semibold text-amber-500">Audio Requirement:</strong> To enable typing sound effects, synthesized Web Audio API sound feedback is built-in by default.
              </p>
              <button
                onClick={() => alert("Audio synthesis is built-in via Web Audio API! No external files required.")}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                  isDark
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-300 hover:bg-amber-500/20"
                    : "bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200"
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download key-press.wav</span>
              </button>
            </div>

            {/* Import Statement */}
            <div
              className={`relative rounded-xl border p-3 font-mono text-xs flex items-center justify-between ${
                isDark ? "border-neutral-800/80 bg-[#121215] text-neutral-300" : "border-neutral-200 bg-white text-neutral-800"
              }`}
            >
              <code>import &#123; CustomKeyboard &#125; from &quot;@/components/ui/custom-keyboard&quot;;</code>
              <button
                onClick={() => copyToClipboard('import { CustomKeyboard } from "@/components/ui/custom-keyboard";', "import-cmd")}
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
                isDark ? "border-neutral-800/80 bg-[#121215]" : "border-neutral-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between border-b px-3 py-2 text-xs ${
                  isDark ? "border-neutral-800/80 bg-[#0e0e11]" : "border-neutral-200 bg-neutral-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("default")}
                    className={`text-xs font-medium ${
                      activeTab === "default"
                        ? isDark
                          ? "text-white"
                          : "text-neutral-900"
                        : isDark
                        ? "text-neutral-400 hover:text-neutral-200"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    Default
                  </button>
                  <span className="opacity-30">|</span>
                  <button
                    onClick={() => setActiveTab("isolated")}
                    className={`text-xs font-medium ${
                      activeTab === "isolated"
                        ? isDark
                          ? "text-white"
                          : "text-neutral-900"
                        : isDark
                        ? "text-neutral-400 hover:text-neutral-200"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    Isolated Keys
                  </button>
                </div>

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
                  <span className={isDark ? "text-blue-400" : "text-blue-600"}>KeyboardDemo</span>() &#123;{"\n"}
                  {"  "}<span className={isDark ? "text-purple-400" : "text-purple-600"}>return</span> ({"\n"}
                  {"    "}&lt;<span className={isDark ? "text-pink-400" : "text-pink-600"}>div</span> <span className={isDark ? "text-orange-300" : "text-orange-600"}>className</span>=<span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;flex w-full items-center justify-center p-10&quot;</span>&gt;{"\n"}
                  {"      "}&lt;<span className={isDark ? "text-yellow-300" : "text-amber-600"}>CustomKeyboard</span> <span className={isDark ? "text-orange-300" : "text-orange-600"}>theme</span>=<span className={isDark ? "text-emerald-300" : "text-emerald-600"}>&quot;{siteTheme}&quot;</span> <span className={isDark ? "text-orange-300" : "text-orange-600"}>enableSound</span> /&gt;{"\n"}
                  {"    "}&lt;/<span className={isDark ? "text-pink-400" : "text-pink-600"}>div</span>&gt;{"\n"}
                  {"  "});{"\n"}
                  &#125;
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Interactive Preview Canvas Pane */}
        <div
          className={`flex-1 flex flex-col items-center justify-between p-6 lg:p-12 relative min-h-[500px] ${
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
              <span>Live Component Canvas</span>
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
            </div>
          </div>

          {/* Centered Keyboard Replica */}
          <div className="my-auto w-full flex items-center justify-center py-10">
            <CustomKeyboard theme={siteTheme} enableSound={soundEnabled} showPreview={true} />
          </div>

          {/* Bottom Theme Switcher Pill */}
          <div
            className={`inline-flex items-center rounded-full border p-1 shadow-lg ${
              isDark ? "border-neutral-800 bg-[#18181c]" : "border-neutral-300 bg-white"
            }`}
          >
            <button
              onClick={() => setSiteTheme("dark")}
              className={`px-4 py-1.5 text-xs font-medium rounded-full ${
                isDark
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Space Black (Dark)
            </button>
            <button
              onClick={() => setSiteTheme("light")}
              className={`px-4 py-1.5 text-xs font-medium rounded-full ${
                !isDark
                  ? "bg-neutral-900 text-white shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Silver (Light)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
