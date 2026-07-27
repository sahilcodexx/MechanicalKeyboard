import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import MacDocPage from './pages/MacDocPage'
import KeychronDocPage from './pages/KeychronDocPage'
import PreviewPage from './PreviewPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Analytics />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs/mac-keyboard" element={<MacDocPage />} />
          <Route path="/docs/keychron-keyboard" element={<KeychronDocPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
