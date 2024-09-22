import './App.css'
import {NavigationMenu} from "./Components/NavigationMenu.tsx";
import {SearchField} from "./Components/SearchField.tsx";
import DefaultButton from "./Components/Button.tsx";
import InputField from "./Components/InputField.tsx";
import {UpperMenu} from "./Components/UpperMenu.tsx";

function App() {
  return (
      <>
          <header>

          </header>
          <main>
              <UpperMenu/>
              <NavigationMenu/>
              <DefaultButton text={"Hello World"} onClick={() => {}}/>

              <InputField name="email" type="email" placeholder="Email"/>
          </main>

      </>
  )
}

export default App
