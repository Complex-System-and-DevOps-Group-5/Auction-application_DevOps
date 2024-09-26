import './App.css'
import {NavigationMenu} from "./Components/NavigationMenu.tsx";
import {SearchField} from "./Components/SearchField.tsx";
import DefaultButton from "./Components/DefaultButton.tsx";
import InputField from "./Components/InputField.tsx";
import {UpperMenu} from "./Components/UpperMenu.tsx";
import {CreatePost} from "./Pages/CreatePost.tsx";

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
              <CreatePost/>
          </main>

      </>
  )
}

export default App
