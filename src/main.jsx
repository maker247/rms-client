import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeApp } from './ThemeApp'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeApp />
  </StrictMode>,
)
