import {UpperMenu} from "./Components/UpperMenu.tsx";
import {NavigationMenu} from "./Components/NavigationMenu.tsx";
import {Outlet} from "react-router-dom";

function App() {
  return (
      <>
          <header>

          </header>
          <main>
              <UpperMenu/>
              <NavigationMenu/>
              <Outlet/>
          </main>

      </>
  )
}

export default App
