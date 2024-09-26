import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {LoginProvider} from "./Context/LoginContext.tsx";
import {routes} from "./routes.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter(routes);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <LoginProvider>
          <RouterProvider router={router}/>
      </LoginProvider>
  </StrictMode>,
)
