import './App.css'
import {UpperMenu} from "./Components/UpperMenu.tsx";
import AuthPage from "./Pages/AuthPage.tsx";
import {NavigationMenu} from "./Components/NavigationMenu.tsx";

function App() {
  return (
      <>
          <header>

          </header>
          <main>
              <UpperMenu/>
              <NavigationMenu/>
              <AuthPage/>
          </main>

      </>
  )
}

export default App
