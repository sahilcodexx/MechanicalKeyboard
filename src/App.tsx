import { useState } from "react"
import Keyboard, { type KeyboardThemeName } from "./components/ui/keyboard"
import "./index.css"

const themes: { name: KeyboardThemeName; label: string; bg: string; text: string }[] = [
  { name: "classic", label: "Classic", bg: "#F57644", text: "white" },
  { name: "mint", label: "Mint", bg: "#86C8AC", text: "white" },
  { name: "royal", label: "Royal", bg: "#E4D440", text: "#3A3B35" },
  { name: "dolch", label: "Dolch", bg: "#D73E42", text: "white" },
  { name: "sand", label: "Sand", bg: "#C94E41", text: "white" },
  { name: "scarlet", label: "Scarlet", bg: "#E1E1E1", text: "#8F4246" },
]

function App() {
  const [theme, setTheme] = useState<KeyboardThemeName>("classic")

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 gap-6">
      <Keyboard enableHaptics={true} enableSound={true} theme={theme} />
      
      <nav className="flex items-center gap-1 p-1 bg-white rounded-full border border-neutral-300">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              theme === t.name ? "text-white" : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
            }`}
            style={theme === t.name ? { backgroundColor: t.bg, color: t.text } : {}}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <footer className="absolute bottom-6 text-sm text-neutral-500">
        made by <a href="https://x.com/sahilcodex" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:underline">sahilcodex</a>
      </footer>
    </div>
  )
}

export default App