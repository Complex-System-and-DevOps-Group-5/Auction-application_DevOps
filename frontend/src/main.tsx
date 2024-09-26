import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {LoginProvider} from "./Context/LoginContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <LoginProvider>
            <App />
      </LoginProvider>
  </StrictMode>,
)
