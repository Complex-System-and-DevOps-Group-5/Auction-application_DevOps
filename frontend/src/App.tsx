import './App.css'
import {NavigationMenu} from "./Components/NavigationMenu.tsx";
import {SearchField} from "./Components/SearchField.tsx";
import DefaultButton from "./Components/Button.tsx";
import InputField from "./Components/InputField.tsx";
import {UpperMenu} from "./Components/UpperMenu.tsx";

import HighlightedProduct from "./Components/HighlightedProduct.tsx";
import productList from "./MockData/HighlightedProductList.json"

function App() {
  return (
      <>
          <header>

            </header>
            <main>
                {/*<UpperMenu/>*/}
                <NavigationMenu/>
                {/*<DefaultButton text={"Hello World"} onClick={() => {}}/>*/}
                <HighlightedProduct products={productList}/>

              <InputField name="email" type="email" placeholder="Email"/>
          </main>

      </>
  )
}

export default App
