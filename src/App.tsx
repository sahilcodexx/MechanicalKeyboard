import { Analytics } from '@vercel/analytics/react'
import LandingPage from "./LandingPage"

function App() {
  return (
    <>
      <LandingPage />
      <Analytics />
    </>
  )
}

export default App