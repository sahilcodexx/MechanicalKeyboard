import Keyboard from "./components/ui/keyboard"
import "./index.css"

function App() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-8">
      <Keyboard enableHaptics={true} enableSound={true} />
    </div>
  )
}

export default App