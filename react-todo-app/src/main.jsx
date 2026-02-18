import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import "../src/shared/assets/styles/base/index.scss";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
