'use client';

import { useState } from "react";
import { Link } from "react-router-dom";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import { github, githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Keyboard from "./components/ui/keyboard";
import "./index.css";
import { Maximize2, Copy, Check } from "lucide-react";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);

function CodeBlock({
  code,
  language = "tsx",
  id,
  copiedId,
  onCopy,
  showLineNumbers = false,
  noRoundedTop = false,
}: {
  code: string;
  language?: string;
  id?: string;
  copiedId?: string | null;
  onCopy?: (text: string, id: string) => void;
  showLineNumbers?: boolean;
  noRoundedTop?: boolean;
}) {
  const isBash = language === "bash";
  const theme = isBash ? github : githubGist;
  
  return (
    <div
      className={`relative bg-neutral-50/50 border border-transparent ring ring-neutral-200  rounded-xl p-0 overflow-hidden ${noRoundedTop ? "rounded-t-none" : ""}`}
    >
      <SyntaxHighlighter
        language={language}
        style={theme}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          marginBottom: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          
        }}
      >
        {code}
      </SyntaxHighlighter>
      {id && onCopy && (
        <button
          onClick={() => onCopy(code, id)}
          className="absolute top-2 right-2 p-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-md"
          aria-label="Copy"
        >
          {copiedId === id ? (
            <Check size={14} className="text-black" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      )}
    </div>
  );
}

function Tabs({
  tabs,
  activeTab,
  onTabChange,
  code,
  id,
  copiedId,
  onCopy,
}: {
  tabs: readonly string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  code: string;
  id: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  return (
    <div className="relative bg-neutral-50 border border-neutral-200 rounded-t-xl">
      <div className="flex border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === tab
                ? "text-neutral-900 border-b-2 border-neutral-900"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => onCopy(code, id)}
          className="ml-auto mr-2 p-1.5 hover:bg-neutral-100 rounded-md"
          aria-label="Copy"
        >
          {copiedId === id ? (
            <Check size={14} className="text-black" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
    </div>
  );
}

const packageManagers = ["pnpm", "yarn", "npm", "bun"] as const;

const installCommands: Record<(typeof packageManagers)[number], string> = {
  pnpm: "pnpm dlx shadcn@latest add https://keyui.vercel.app/r/keyboard.json",
  yarn: "yarn dlx shadcn@latest add https://keyui.vercel.app/r/keyboard.json",
  npm: "npx shadcn@latest add https://keyui.vercel.app/r/keyboard.json",
  bun: "bunx shadcn@latest add https://keyui.vercel.app/r/keyboard.json",
};

export default function LandingPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] =
    useState<(typeof packageManagers)[number]>("pnpm");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen p-5 py-10 md:py-20">
      <main className="w-full max-w-xl mx-auto space-y-10 md:space-y-20">
        <div className="space-y-1">
          <h1 className="font-medium text-lg">Keyui</h1>
          <p className="text-sm text-neutral-800">
            A Keychron K2 inspired keyboard component with optional haptics and
            mechanical sound effects.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border border-neutral-200">
          <div className="p-10 md:p-20 relative bg-white overflow-hidden flex items-start justify-start">
            <div className="inline-block mx-auto">
              <Keyboard
                enableHaptics={true}
                enableSound={true}
                theme="classic"
              />
            </div>
            <Link
              to="/preview"
              className="absolute top-2 right-2 p-1 border border-neutral-300 hover:bg-neutral-100 rounded-lg text-xs font-medium"
            >
              <Maximize2 size={14} />
            </Link>
          </div>
          <CodeBlock
            code={`"use client";
import { Keyboard } from "@/components/ui/keyboard";

export default function Page() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center py-10 md:min-h-180">
      <Keyboard theme="classic" enableHaptics enableSound />
    </div>
  );
}`}
            id="basic"
            copiedId={copied}
            onCopy={copyToClipboard}
            showLineNumbers={true}
            noRoundedTop={true}
          />
        </div>

        <div className="space-y-7">
          <h2 className="text-lg font-medium">Installation</h2>
          <div className="space-y-5">
            <p className="text-sm text-neutral-800">
              1. Run the following command
            </p>
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden">
              <Tabs
                tabs={packageManagers}
                activeTab={activeTab}
                onTabChange={(tab) =>
                  setActiveTab(tab as (typeof packageManagers)[number])
                }
                code={installCommands[activeTab]}
                id="install"
                copiedId={copied}
                onCopy={copyToClipboard}
              />
              <div className="p-4 border-t border-neutral-200">
                <code className="text-sm font-mono">
                  {installCommands[activeTab]}
                </code>
              </div>
            </div>
            <p className="text-sm text-neutral-800">
              2. Download the sound.ogg and place it in your public/sounds/
              folder, or just run below commands:
            </p>
            <CodeBlock
              code={`mkdir -p public/sounds
curl -L https://keyui.vercel.app/sounds/sound.ogg -o public/sounds/sound.ogg`}
              language="bash"
              id="sound"
              copiedId={copied}
              onCopy={copyToClipboard}
            />
            <p className="text-sm text-neutral-800">
              3. The keyboard component requires the following dependencies
              which will be installed automatically by shadcn:
            </p>
            <CodeBlock
              code={`lucide-react - For keyboard icons (already included with shadcn)
web-haptics - For haptic feedback on supported devices`}
              language="bash"
              id="deps"
              copiedId={copied}
              onCopy={copyToClipboard}
            />
          </div>
        </div>

        <div className="space-y-7">
          <h2 className="text-lg font-medium">Usage</h2>
          <div className="space-y-5">
            <CodeBlock
              code={`import { Keyboard } from "@/components/ui/keyboard"`}
              id="usage1"
              copiedId={copied}
              onCopy={copyToClipboard}
            />
            <CodeBlock
              code={`<Keyboard enableHaptics={true} enableSound={true} theme="mint" />`}
              id="usage2"
              copiedId={copied}
              onCopy={copyToClipboard}
            />
          </div>
        </div>

        <div className="space-y-7">
          <h2 className="text-lg font-medium">Event Callback Usage</h2>
          <CodeBlock
            code={`"use client";
import { Keyboard, type KeyboardInteractionEvent } from "@/components/ui/keyboard";

export default function Page() {
  return (
    <Keyboard
      theme="mint"
      enableHaptics
      enableSound
      onKeyEvent={(event: KeyboardInteractionEvent) => {
        console.log(event.code, event.phase, event.source);
      }}
    />
  );
}`}
            id="event1"
            copiedId={copied}
            onCopy={copyToClipboard}
            showLineNumbers={true}
          />
        </div>

        <div className="space-y-7">
          <h2 className="text-lg font-medium">API Reference</h2>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden mb-6">
            <div className="grid grid-cols-1 gap-2 border-b border-neutral-200 bg-white p-3 text-xs font-medium text-neutral-700 md:grid-cols-[1fr_1.5fr_1fr_1.5fr]">
              <p>Prop</p>
              <p>Type</p>
              <p>Default</p>
              <p>Description</p>
            </div>
            {[
              [
                "className",
                "string",
                "undefined",
                "Adds classes to the root keyboard container.",
              ],
              [
                "theme",
                '"classic" | "mint" | "royal" | "dolch" | "sand" | "scarlet"',
                '"classic"',
                "Selects one of the built-in keyboard themes.",
              ],
              [
                "enableHaptics",
                "boolean",
                "true",
                "Turns haptic feedback on supported devices on or off.",
              ],
              [
                "enableSound",
                "boolean",
                "true",
                "Turns mechanical key sound playback on or off.",
              ],
              [
                "soundUrl",
                "string",
                '"/sounds/sound.ogg"',
                "Path to the keyboard audio sprite file.",
              ],
              [
                "onKeyEvent",
                "(event: KeyboardInteractionEvent) => void",
                "undefined",
                "Fires on every key down/up from physical or pointer input.",
              ],
            ].map(([prop, type, defaultVal, desc], i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-2 border-b border-neutral-200 p-3 text-xs text-neutral-700 last:border-b-0 md:grid-cols-[1fr_1.5fr_1fr_1.5fr]"
              >
                <code className="font-mono text-neutral-900">{prop}</code>
                <code className="font-mono text-[10px]">{type}</code>
                <code className="font-mono">{defaultVal}</code>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-md font-medium">KeyboardInteractionEvent</h3>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden">
            <div className="grid grid-cols-1 gap-2 border-b border-neutral-200 bg-white p-3 text-xs font-medium text-neutral-700 md:grid-cols-[1fr_1fr_2fr]">
              <p>Field</p>
              <p>Type</p>
              <p>Description</p>
            </div>
            {[
              [
                "code",
                "string",
                "KeyboardEvent code, for example KeyA, Enter, ArrowLeft.",
              ],
              [
                "phase",
                '"down" | "up"',
                "Whether the interaction is key press or key release.",
              ],
              [
                "source",
                '"physical" | "pointer"',
                "Physical keyboard event or key click/touch on UI.",
              ],
            ].map(([prop, type, desc], i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-2 border-b border-neutral-200 p-3 text-xs text-neutral-700 last:border-b-0 md:grid-cols-[1fr_1fr_2fr]"
              >
                <code className="font-mono text-neutral-900">{prop}</code>
                <code className="font-mono">{type}</code>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-xs text-neutral-500 pt-10">
          made by{" "}
          <a
            href="https://x.com/sahilcodex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 hover:underline"
          >
            sahilcodex
          </a>
        </footer>
      </main>
    </div>
  );
}
